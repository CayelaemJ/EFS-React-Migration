import { prisma, snapshotEmployer } from "./snapshotBuilder.js";

const EMPLOYER_ID = "synthetic-employer-001";
const PARTNER_ID = "synthetic-partner-001";

function monthDate(monthOffset: number, day = 15) {
  const d = new Date(Date.UTC(2026, 2 + monthOffset, day, 12));
  return d;
}

export async function seedSyntheticData() {
  if (process.env.SYNTHETIC_DATA !== "true") return;

  // This dataset is deliberately isolated to one stable employer key. Re-running
  // the seed replaces only this synthetic employer and never touches other data.
  await prisma.employer.deleteMany({ where: { id: EMPLOYER_ID } });

  const partner = await prisma.partner.upsert({
    where: { id: PARTNER_ID },
    update: {
      name: "Synthetic Brand Test",
      displayName: "Synthetic Brand Test",
      slug: "synthetic-brand-test",
      primaryColor: "214B45",
      accentColor: "8A6F3D",
      navyColor: "173A36",
      tagline: "Synthetic data — migration visual test",
      brandEngineVersion: "1.0",
      brandDetectionStatus: "MANUAL",
      brandDetectionConfidence: 1,
    },
    create: {
      id: PARTNER_ID,
      name: "Synthetic Brand Test",
      displayName: "Synthetic Brand Test",
      slug: "synthetic-brand-test",
      primaryColor: "214B45",
      accentColor: "8A6F3D",
      navyColor: "173A36",
      tagline: "Synthetic data — migration visual test",
      brandEngineVersion: "1.0",
      brandDetectionStatus: "MANUAL",
      brandDetectionConfidence: 1,
    },
  });

  await prisma.user.updateMany({
    where: { email: process.env.ADMIN_EMAIL?.toLowerCase() },
    data: { partnerId: partner.id },
  });

  const employer = await prisma.employer.create({
    data: {
      id: EMPLOYER_ID,
      name: "Synthetic Manufacturing Group",
      eligibleCount: 64,
      eligibleCountAsAt: monthDate(7, 28),
      partnerId: partner.id,
    },
  });

  const sites = await Promise.all(
    ["Johannesburg", "Cape Town", "Durban", "Pretoria"].map((name) =>
      prisma.site.create({ data: { employerId: employer.id, name } }),
    ),
  );

  const bands = ["UNDER_5K", "BAND_5_10K", "BAND_10_20K", "BAND_20_40K", "OVER_40K"] as const;
  const employees: any[] = [];

  for (let i = 0; i < 64; i++) {
    const site = sites[i % sites.length];
    const employee = await prisma.employee.create({
      data: {
        employerId: employer.id,
        siteId: site.id,
        payrollRef: "SYN-" + String(i + 1).padStart(4, "0"),
        incomeBand: bands[i % bands.length],
        active: i < 61,
        observedAt: monthDate(7, 28),
        eligibleFrom: new Date(Date.UTC(2025, 0, 1)),
      },
    });
    employees.push(employee);
  }

  const users = employees.slice(0, 54).map((employee, i) => ({
    id: "synthetic-platform-" + String(i + 1).padStart(3, "0"),
    employeeId: employee.id,
    enrolledAt: monthDate(i % 8, 5),
    activatedAt: i % 9 === 0 ? null : monthDate((i + 1) % 8, 12),
    hasCreditProfile: i % 4 !== 0,
  }));
  await prisma.platformUser.createMany({ data: users });

  const userIds = users.map((u) => u.id);

  const employeeVersions: any[] = [];
  for (let m = 0; m < 8; m++) {
    for (let i = 0; i < employees.length; i++) {
      const e = employees[i];
      employeeVersions.push({
        employeeId: e.id,
        observedAt: monthDate(m, 28),
        siteName: sites[i % sites.length].name,
        incomeBand: bands[i % bands.length],
        active: i < 61 || m < 6,
        eligibleFrom: new Date(Date.UTC(2025, 0, 1)),
        sourceUpdatedAt: monthDate(m, 28),
      });
    }
  }
  await prisma.employeeVersion.createMany({ data: employeeVersions });

  await prisma.employerHeadcountSnapshot.createMany({
    data: Array.from({ length: 8 }, (_, m) => ({
      employerId: employer.id,
      asOfDate: monthDate(m, 28),
      eligibleCount: 57 + m,
      sourceUpdatedAt: monthDate(m, 28),
    })),
  });

  const journeys: any[] = [];
  const journeyTypes = ["CREDIT_LIFE", "FUNERAL", "SHORT_TERM", "ARREARS", "PRESCRIBED", "EMERGENCY"] as const;
  const journeyStatuses = ["COMPLETED", "COMPLETED", "COMPLETED", "IN_PROGRESS", "GUIDANCE_ONLY"] as const;
  for (let i = 0; i < 118; i++) {
    const month = i % 8;
    const type = journeyTypes[i % journeyTypes.length];
    const status = journeyStatuses[i % journeyStatuses.length];
    const startedAt = monthDate(month, 3 + (i % 20));
    journeys.push({
      id: "synthetic-journey-" + String(i + 1).padStart(4, "0"),
      platformUserId: userIds[i % userIds.length],
      type,
      status,
      startedAt,
      completedAt: status === "COMPLETED" ? new Date(startedAt.getTime() + 6 * 864e5) : null,
      monthlySavingCents: status === "COMPLETED" ? 18000 + (i % 9) * 7500 : null,
      balanceImpactCents: status === "COMPLETED" ? 450000 + (i % 7) * 125000 : null,
    });
  }
  await prisma.journey.createMany({ data: journeys });

  const debts: any[] = [];
  const debtVersions: any[] = [];
  const creditTypes = ["BANK_LOAN", "RETAIL_STORE", "MICROLOAN", "OTHER_UNSECURED"] as const;
  const states = ["NONE", "ACTIVE_INTERVENTION", "CHALLENGED", "GUIDED"] as const;
  for (let i = 0; i < 48; i++) {
    const id = "synthetic-debt-" + String(i + 1).padStart(3, "0");
    const platformUserId = userIds[i % userIds.length];
    const type = creditTypes[i % creditTypes.length];
    const state = states[i % states.length];
    const balance = 350000 + (i % 12) * 87500;
    debts.push({
      id,
      platformUserId,
      creditorName: ["Capitec", "Retail Finance", "Personal Credit", "Micro Lending"][i % 4],
      creditType: type,
      balanceCents: balance,
      inArrears: state !== "NONE",
      state,
      challengeStatus: state === "CHALLENGED" ? "LETTER_SENT" : null,
      observedAt: monthDate(7, 20),
    });
    for (let m = 0; m < 8; m++) {
      debtVersions.push({
        accountId: id,
        observedAt: monthDate(m, 20),
        creditorName: ["Capitec", "Retail Finance", "Personal Credit", "Micro Lending"][i % 4],
        creditType: type,
        balanceCents: balance + (7 - m) * 15000,
        inArrears: state !== "NONE",
        state,
        challengeStatus: state === "CHALLENGED" ? "LETTER_SENT" : null,
        sourceUpdatedAt: monthDate(m, 20),
      });
    }
  }
  await prisma.debtAccount.createMany({ data: debts });
  await prisma.debtAccountVersion.createMany({ data: debtVersions });

  const policies: any[] = [];
  const policyVersions: any[] = [];
  const policyTypes = ["CREDIT_LIFE", "FUNERAL", "SHORT_TERM"] as const;
  for (let i = 0; i < 42; i++) {
    const id = "synthetic-policy-" + String(i + 1).padStart(3, "0");
    const platformUserId = userIds[i % userIds.length];
    const type = policyTypes[i % policyTypes.length];
    const wasteful = i % 3 === 0;
    policies.push({
      id,
      platformUserId,
      type,
      premiumCents: 6500 + (i % 8) * 2200,
      isWasteful: wasteful,
      isResolved: !wasteful,
      observedAt: monthDate(7, 18),
      effectiveFrom: new Date(Date.UTC(2025, 0, 1)),
    });
    for (let m = 0; m < 8; m++) {
      policyVersions.push({
        policyId: id,
        observedAt: monthDate(m, 18),
        type,
        premiumCents: 6500 + (i % 8) * 2200,
        isWasteful: wasteful,
        isResolved: !wasteful,
        effectiveFrom: new Date(Date.UTC(2025, 0, 1)),
        sourceUpdatedAt: monthDate(m, 18),
      });
    }
  }
  await prisma.insurancePolicy.createMany({ data: policies });
  await prisma.insurancePolicyVersion.createMany({ data: policyVersions });

  await prisma.rating.createMany({
    data: Array.from({ length: 86 }, (_, i) => ({
      id: "synthetic-rating-" + String(i + 1).padStart(3, "0"),
      platformUserId: userIds[i % userIds.length],
      journeyType: journeyTypes[i % journeyTypes.length],
      stars: 3 + (i % 3),
      createdAt: monthDate(i % 8, 8 + (i % 15)),
    })),
  });

  await prisma.referral.createMany({
    data: Array.from({ length: 38 }, (_, i) => ({
      id: "synthetic-referral-" + String(i + 1).padStart(3, "0"),
      platformUserId: userIds[i % userIds.length],
      channel: ["WhatsApp", "Email", "Colleague"][i % 3],
      sharedAt: monthDate(i % 8, 10 + (i % 10)),
      converted: i % 4 === 0,
      convertedAt: i % 4 === 0 ? monthDate(i % 8, 18 + (i % 6)) : null,
    })),
  });

  await prisma.salaryAdvance.createMany({
    data: Array.from({ length: 96 }, (_, i) => ({
      id: "synthetic-advance-" + String(i + 1).padStart(3, "0"),
      advanceRef: "SYN-EWA-" + String(i + 1).padStart(4, "0"),
      employerId: employer.id,
      employeeId: employees[i % employees.length].id,
      clientId: "synthetic-client-" + String(i % 34).padStart(3, "0"),
      amountCents: 90000 + (i % 9) * 45000,
      status: "FINALISED",
      bankVerified: true,
      blacklisted: false,
      advancedAt: monthDate(i % 8, 7 + (i % 16)),
    })),
  });

  await prisma.chatSession.createMany({
    data: Array.from({ length: 64 }, (_, i) => ({
      id: "synthetic-chat-" + String(i + 1).padStart(3, "0"),
      employerId: employer.id,
      employeeId: employees[i % employees.length].id,
      journeyType: journeyTypes[i % journeyTypes.length],
      resolvedInChat: i % 3 !== 0,
      firstReplySeconds: 15 + (i % 7) * 11,
      satisfaction: 3 + (i % 3),
      sentiment: 0.45 + (i % 5) * 0.1,
      theme: ["Cashflow", "Debt", "Insurance", "Savings"][i % 4],
      primaryQuestion: "Synthetic employee financial wellbeing question",
      startedAt: monthDate(i % 8, 6 + (i % 18)),
    })),
  });

  // Build the same governed score snapshots used by the real dashboard. This
  // exercises the production calculation path rather than hard-coding demo KPIs.
  await snapshotEmployer(employer.id, "2026-10");

  return { employerId: employer.id, partnerId: partner.id, employeeCount: employees.length };
}
