import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import fs from "node:fs";
import { mockApi, me, users, dashboard } from "./fixtures.mjs";
const url = "http://127.0.0.1:4100";
async function ready(page, path, overrides = {}) {
  await mockApi(page, overrides);
  await page.addInitScript(() =>
    localStorage.setItem("cookieNoticeDismissed", "1"),
  );
  await page.goto(url + path);
  await expect(page.locator("html")).toHaveAttribute("data-frontend", "react");
  if (path.startsWith("/dashboard"))
    await expect(page.locator("#data-fresh-label")).toContainText(
      "Source updated",
    );
  if (path.startsWith("/admin"))
    await expect(page.locator("#rep-list .rep")).toHaveCount(10);
  if (path.startsWith("/users"))
    await expect(page.locator("#user-rows")).toContainText("Example User");
}
for (const name of [
  "dashboard",
  "admin",
  "users",
  "login",
  "home",
  "contact",
  "privacy",
  "terms",
  "cookies",
  "set-password",
  "thank-you",
  "404",
]) {
  test(`${name}: mounts without browser errors`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await ready(page, name === "home" ? "/" : "/" + name);
    await page.waitForTimeout(400);
    expect(errors).toEqual([]);
    const broken = await page.locator("img").evaluateAll((imgs) =>
      imgs
        // NewChanges keeps an unset, hidden partner-logo slot until branding
        // supplies an image. Only an assigned image URL can fail to load.
        .filter(
          (i) => i.getAttribute("src") && i.complete && i.naturalWidth === 0,
        )
        .map((i) => i.src),
    );
    expect(broken).toEqual([]);
  });
}
for (const width of [1440, 390])
  for (const name of ["dashboard", "admin", "users"]) {
    test(`${name}: source visual parity at ${width}px`, async ({
      browser,
    }, testInfo) => {
      const pages = [];
      for (const port of [4101, 4100]) {
        const page = await browser.newPage({
          viewport: { width, height: 1000 },
          timezoneId: "Africa/Johannesburg",
        });
        pages.push(page);
        await mockApi(page);
        await page.addInitScript(() =>
          localStorage.setItem("cookieNoticeDismissed", "1"),
        );
        await page.goto(`http://127.0.0.1:${port}/${name}`);
        await page.waitForTimeout(1800);
        await page.addStyleTag({
          content:
            "*,*::before,*::after {transition:none!important;animation:none!important;caret-color:transparent!important;} #ent-progress,#welcome-splash{display:none!important;}",
        });
      }
      const a = PNG.sync.read(await pages[0].screenshot({ fullPage: true }));
      const b = PNG.sync.read(await pages[1].screenshot({ fullPage: true }));
      fs.writeFileSync(testInfo.outputPath("source.png"), PNG.sync.write(a));
      await testInfo.attach("source", {
        path: testInfo.outputPath("source.png"),
        contentType: "image/png",
      });
      fs.writeFileSync(testInfo.outputPath("react.png"), PNG.sync.write(b));
      await testInfo.attach("react", {
        path: testInfo.outputPath("react.png"),
        contentType: "image/png",
      });
      expect(b.width).toBe(a.width);
      expect(b.height).toBe(a.height);
      const diff = new PNG({ width: a.width, height: a.height });
      const changed = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
        threshold: 0.15,
      });
      fs.writeFileSync(
        testInfo.outputPath("difference.png"),
        PNG.sync.write(diff),
      );
      await testInfo.attach("difference", {
        path: testInfo.outputPath("difference.png"),
        contentType: "image/png",
      });
      if (changed / (a.width * a.height) >= 0.005) {
        for (let i = 0; i < pages.length; i++)
          console.log(
            "Region layout",
            i,
            JSON.stringify(
              await pages[i]
                .locator("#region-bars .hbar-row")
                .evaluateAll((rows) =>
                  rows.map((row) => ({
                    height: row.getBoundingClientRect().height,
                    children: [...row.children].map((child) => ({
                      className: child.className,
                      style: child.getAttribute("style"),
                      height: child.getBoundingClientRect().height,
                      font: getComputedStyle(child).fontSize,
                      lineHeight: getComputedStyle(child).lineHeight,
                    })),
                  })),
                ),
            ),
          );
      }
      expect(changed / (a.width * a.height)).toBeLessThan(0.005);
      for (const page of pages) await page.close();
    });
  }
test("navigation, dark mode and mobile account destinations", async ({
  page,
}) => {
  await ready(page, "/admin");
  await page.locator(".portal-theme-quick").click();
  await expect(page.locator("body")).toHaveClass(/portal-dark/);
  await page.locator('#portal-nav a[href="/users"]').click();
  await expect(page.locator("#user-rows")).toContainText("Example User");
  await expect(page.locator("body")).toHaveClass(/portal-dark/);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".portal-account-trigger").click();
  await expect(page.locator(".portal-account-menu")).toHaveClass(/is-open/);
  await expect(
    page.locator('.portal-mobile-link[href="/dashboard"]'),
  ).toBeVisible();
  await page.locator('.portal-mobile-link[href="/dashboard"]').click();
  await expect(page.locator("#executive-insight")).toContainText("70/100");
});
test("dashboard gauge, filters, portfolio, quick actions and schedule dialog", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  await ready(page, "/dashboard");
  await expect(page.locator("#executive-insight")).toContainText("70/100");
  expect(await page.evaluate(() => window.BrandEngine?.VERSION)).toBe("1.4.0");
  await page.locator("#month-select").selectOption("30d");
  await expect
    .poll(() =>
      requests.some(
        (x) => x.includes("/dashboard?") && x.includes("range=30d"),
      ),
    )
    .toBeTruthy();
  await page.locator("#btn-command").click();
  await expect(page.locator(".command-backdrop")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.locator("#btn-schedule").click();
  await expect(page.locator(".schedule-modal")).toBeVisible();
  await expect(page.locator("#schedule-frequency")).toHaveValue("MONTHLY");
  await page.locator("#schedule-name").fill("My report");
  await expect(page.locator(".schedule-modal")).toBeVisible();
  await page
    .locator(".schedule-modal")
    .getByRole("button", { name: /close|cancel/i })
    .first()
    .click();
  await page.locator('[data-a="portfolio"]').click();
  await expect(page.locator("#portfolio-view")).toBeVisible();
  await expect(page.locator("#pf-heatmap")).not.toBeEmpty();
});
test("users dynamic editor and access controls", async ({ page }) => {
  await ready(page, "/users");
  await page.locator("#user-list-card .compact-toggle").click();
  await page
    .locator("#user-rows")
    .getByRole("button", { name: "Edit", exact: true })
    .click();
  await expect(page.locator("#editor-user-1")).toBeVisible();
  await page
    .locator("#editor-user-1")
    .getByRole("button", { name: "Cancel", exact: true })
    .click();
  await expect(page.locator("#editor-user-1")).toHaveCount(0);
  await expect(page.locator("#n-access-superadmin")).toHaveCount(1);
  await page.locator("#n-access-admin").check();
  await expect(page.locator("#n-role")).toHaveValue("ADMIN");
});
test("regular administrators cannot grant privileged roles", async ({
  page,
}) => {
  await ready(page, "/users", { "/api/auth/me": { ...me, role: "ADMIN" } });
  await expect(page.locator("#n-access-superadmin")).toHaveCount(0);
  await expect(page.locator("#n-access-admin")).toHaveCount(0);
});
test("React user creation retains inputs on failure and supplies an unsent setup link", async ({
  page,
}) => {
  await ready(page, "/users");
  let attempt = 0,
    body;
  await page.route("**/api/users", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({ json: users });
      return;
    }
    body = route.request().postDataJSON();
    attempt++;
    await route.fulfill(
      attempt === 1
        ? { status: 400, json: { error: "Email already exists" } }
        : {
            json: {
              setupPath: "/set-password?token=test",
              emailSent: false,
              emailError: "Mail unavailable",
            },
          },
    );
  });
  await page.locator("#n-name").fill("New Person");
  await page.locator("#n-email").fill("new@example.invalid");
  await page.locator('input[name="access"][value="link"]').check();
  await page.locator("#emp-pick input").check();
  await page.getByRole("button", { name: "Create user", exact: true }).click();
  await expect(page.locator("#add-msg")).toContainText("Email already exists");
  await expect(page.locator("#n-email")).toHaveValue("new@example.invalid");
  await page.getByRole("button", { name: "Create user", exact: true }).click();
  await expect(page.locator("#link-box")).toContainText(
    "/set-password?token=test",
  );
  expect(body).toMatchObject({
    name: "New Person",
    email: "new@example.invalid",
    role: "EMPLOYER_MANAGER",
    employerIds: ["employer-1"],
    sendSetupLink: true,
  });
  await expect(page.locator("#n-name")).toHaveValue("");
});
test("React user editor clears employer links for admin roles and retains errors", async ({
  page,
}) => {
  await ready(page, "/users");
  let body,
    attempt = 0;
  await page.route("**/api/users/user-1", async (route) => {
    body = route.request().postDataJSON();
    attempt++;
    await route.fulfill(
      attempt === 1
        ? { status: 400, json: { error: "Role update unavailable" } }
        : { json: { ok: true } },
    );
  });
  await page.locator("#user-list-card .compact-toggle").click();
  await page
    .locator("#user-rows")
    .getByRole("button", { name: "Edit", exact: true })
    .click();
  await page.locator("#e-role-user-1").selectOption("ADMIN");
  await page.locator("#e-name-user-1").fill("Updated User");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.locator("#e-msg-user-1")).toContainText(
    "Role update unavailable",
  );
  await expect(page.locator("#e-name-user-1")).toHaveValue("Updated User");
  expect(body).toEqual({
    name: "Updated User",
    role: "ADMIN",
    partnerId: null,
    employerIds: [],
  });
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.locator("#editor-user-1")).toHaveCount(0);
});
test("React security centre filters sessions, resolves alerts, and closes the profile on Escape", async ({
  page,
}) => {
  const session = {
    id: "session-1",
    user: { id: "user-1", name: "Example User", email: "user@example.invalid" },
    active: true,
    location: "Cape Town",
    ipAddress: "127.0.0.1",
    deviceType: "Desktop",
    browser: "Chrome",
    operatingSystem: "Linux",
    durationSeconds: 120,
    createdAt: "2026-10-01",
    lastSeenAt: "2026-10-01",
  };
  await ready(page, "/users", {
    "/api/admin/security/sessions": [session],
    "/api/admin/security/alerts": [
      {
        id: "alert-1",
        severity: "HIGH",
        title: "New device",
        summary: "Device changed",
        createdAt: "2026-10-01",
      },
    ],
  });
  await expect(page.locator("#sec-session-rows")).toContainText("Cape Town");
  await page.locator("#sec-search").fill("missing");
  await expect(page.locator("#sec-session-rows")).toContainText(
    "No matching sessions",
  );
  await page.locator("#sec-search").fill("");
  let resolved = false;
  await page.route(
    "**/api/admin/security/alerts/alert-1/resolve",
    async (route) => {
      resolved = true;
      await route.fulfill({ json: { ok: true } });
    },
  );
  await page
    .locator("#sec-alert-rows")
    .getByRole("button", { name: "Resolve" })
    .click();
  await expect.poll(() => resolved).toBe(true);
  await page.locator("#user-list-card .compact-toggle").click();
  await page
    .locator("#user-rows")
    .getByRole("button", { name: "Security", exact: true })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Example User" }),
  ).toContainText("Cape Town");
  await page.keyboard.press("Escape");
  await expect(page.locator(".security-drawer")).toHaveCount(0);
});
for (const role of ["EMPLOYER_MANAGER", "SUPERADMIN"])
  test(`latest partner branding follows ${role} shell rules in light and dark mode`, async ({
    page,
  }) => {
    const logo =
      "data:image/svg+xml," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="40"><rect width="150" height="40" fill="#204080"/><text x="10" y="26" fill="white">Partner</text></svg>',
      );
    const theme = {
      name: "Partner",
      branded: true,
      logoDataUrl: logo,
      accentColor: "A84628",
      primaryColor: "204080",
      navyColor: "204080",
    };
    await ready(page, "/dashboard", {
      "/api/auth/me": { ...me, role, theme },
      "/api/employers/employer-1/dashboard": { ...dashboard, theme },
    });
    for (const dark of [false, true]) {
      if (dark) await page.locator(".portal-theme-quick").click();
      await expect(page.locator("#portal-brand-default")).toBeVisible({
        visible: role === "SUPERADMIN",
      });
      await expect(page.locator("#portal-brand-partner")).toBeVisible({
        visible: role === "EMPLOYER_MANAGER",
      });
      if (role === "EMPLOYER_MANAGER")
        await expect(page.locator("#portal-partner-logo")).toHaveAttribute(
          "src",
          logo,
        );
      await expect(
        page.locator(".portal-powered-by,.portal-fixer-secondary"),
      ).toHaveCount(0);
    }
  });
test("report selection and integration mode buttons", async ({ page }) => {
  await ready(page, "/admin");
  await page.locator("#rep-list .rep").first().click();
  await expect(page.locator("#work")).toContainText("CSV template");
  await expect(page.locator("#file")).toHaveAttribute(
    "accept",
    ".csv,.xlsx,.xls,.json",
  );
  await page.locator("#source-tab-sql").click();
  await expect(page.locator("#integ-sql-host")).toBeVisible();
});
test("sign-in validation and forgotten password request", async ({ page }) => {
  await ready(page, "/login");
  await page.locator("#btn").click();
  await expect(page.locator("#err")).toHaveText("Enter your email address.");
  await page.locator("#email").fill("person@example.invalid");
  await page.locator("#forgot-link").click();
  await expect(page.locator("#forgot-email")).toHaveValue(
    "person@example.invalid",
  );
  await page.locator("#forgot-btn").click();
  await expect(page.locator("#forgot-msg")).toContainText(
    "If an account exists",
  );
});

test("account menu dismisses and deactivation keeps input on API failure", async ({
  page,
}) => {
  await ready(page, "/users");
  const trigger = page.locator(".portal-account-trigger");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await page.locator("[data-portal-deactivate]").click();
  const reason = page.locator("#portal-deactivate-reason");
  await expect(reason).toBeFocused();
  await reason.fill("Account no longer needed");
  const requests = [];
  await page.route("**/api/users/me/deactivate", async (route) => {
    requests.push(route.request().postDataJSON());
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Please retry shortly" }),
    });
  });
  await page.locator(".portal-modal-confirm").click();
  await expect(page.locator(".portal-modal-error")).toHaveText(
    "Please retry shortly",
  );
  await expect(reason).toHaveValue("Account no longer needed");
  await expect(page.locator(".portal-modal-confirm")).toBeEnabled();
  expect(requests).toEqual([{ reason: "Account no longer needed" }]);
  await page.keyboard.press("Escape");
  await expect(page.locator(".portal-modal-overlay")).toHaveCount(0);
});

test("sign out posts to the session endpoint and returns to login", async ({
  page,
}) => {
  await ready(page, "/admin");
  const logout = page.waitForRequest(
    (request) =>
      request.url().endsWith("/api/auth/logout") && request.method() === "POST",
  );
  await page.locator(".portal-account-trigger").click();
  await page.locator("[data-portal-signout]").click();
  await logout;
  await expect(page).toHaveURL(/\/login$/);
});

test("React quick actions searches sections and restores focus on Escape", async ({
  page,
}) => {
  await ready(page, "/dashboard");
  await page.locator("#btn-command").click();
  await expect(page.locator(".command-search")).toBeFocused();
  await page.locator(".command-search").fill("wellness");
  await expect(page.locator(".command-item")).toHaveCount(1);
  await expect(page.locator(".command-item")).toContainText("Wellness score");
  await page.locator(".command-search").fill("no matching section");
  await expect(page.locator(".command-empty")).toHaveText(
    "No matching section",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator("#quick-actions")).toHaveCount(0);
  await expect(page.locator("#btn-command")).toBeFocused();
  await page.keyboard.press("Control+k");
  await expect(page.locator("#quick-actions")).toBeVisible();
  await page.locator('.command-item[data-target="#wellness"]').click();
  await expect(page.locator("#quick-actions")).toHaveCount(0);
});

test("React schedule form preserves fields on failure and sends selected timing and filters", async ({
  page,
}) => {
  await ready(page, "/dashboard", {
    "/api/report-schedules/config": {
      configured: true,
      defaultTimezone: "Africa/Johannesburg",
    },
  });
  let fail = true;
  const payloads = [];
  await page.route("**/api/report-schedules", async (route) => {
    if (route.request().method() === "GET") return route.fulfill({ json: [] });
    payloads.push(route.request().postDataJSON());
    await route.fulfill({
      status: fail ? 503 : 200,
      json: fail
        ? { error: "Mail configuration temporarily unavailable" }
        : { nextRunAt: "2026-10-12T06:00:00Z" },
    });
  });
  await page.locator("#btn-schedule").click();
  await page.locator("#schedule-name").fill("Weekly wellbeing");
  await page.locator("#schedule-window").selectOption("quarter");
  await page.locator("#schedule-frequency").selectOption("WEEKLY");
  await expect(page.locator("#schedule-weekly-wrap")).toBeVisible();
  await expect(page.locator("#schedule-monthly-wrap")).toBeHidden();
  await page.locator("#schedule-weekday").selectOption("3");
  await page.locator("#schedule-time").fill("09:15");
  await page
    .locator("#schedule-recipients")
    .fill("one@example.invalid, two@example.invalid");
  await page
    .getByRole("button", { name: "Save schedule", exact: true })
    .click();
  await expect(page.locator("#schedule-result")).toContainText(
    "Mail configuration temporarily unavailable",
  );
  await expect(page.locator("#schedule-name")).toHaveValue("Weekly wellbeing");
  fail = false;
  await page
    .getByRole("button", { name: "Save schedule", exact: true })
    .click();
  await expect(page.locator("#schedule-result")).toContainText(
    "Report scheduled.",
  );
  expect(payloads).toHaveLength(2);
  expect(payloads[1]).toMatchObject({
    name: "Weekly wellbeing",
    employerId: "employer-1",
    filters: { range: "quarter" },
    frequency: "WEEKLY",
    dayOfWeek: 3,
    dayOfMonth: null,
    onceDate: null,
    sendTime: "09:15",
    timezone: "Africa/Johannesburg",
    recipients: ["one@example.invalid", "two@example.invalid"],
  });
  await page.locator("#schedule-frequency").selectOption("ONCE");
  await expect(page.locator("#schedule-once-wrap")).toBeVisible();
  await expect(page.locator("#schedule-weekly-wrap")).toBeHidden();
  await page.keyboard.press("Escape");
  await expect(page.locator("#schedule-backdrop")).toHaveCount(0);
  await expect(page.locator("#btn-schedule")).toBeFocused();
});

test("React schedule actions update the list and display server errors", async ({
  page,
}) => {
  const schedule = {
    id: "schedule-1",
    name: "Existing report",
    employer: { name: "Example" },
    active: true,
    frequency: "MONTHLY",
    dayOfMonth: 1,
    sendTime: "08:00",
    nextRunAt: "2026-11-01T06:00:00Z",
  };
  await ready(page, "/dashboard", {
    "/api/report-schedules/config": { configured: true },
  });
  let rows = [schedule];
  const calls = [];
  await page.route("**/api/report-schedules", (route) =>
    route.fulfill({ json: rows }),
  );
  await page.route("**/api/report-schedules/schedule-1**", async (route) => {
    const req = route.request();
    calls.push({ method: req.method(), path: new URL(req.url()).pathname });
    if (req.url().endsWith("send-now"))
      return route.fulfill({
        status: 503,
        json: { error: "Delivery service unavailable" },
      });
    if (req.method() === "PATCH")
      rows = [{ ...schedule, active: req.postDataJSON().active }];
    if (req.method() === "DELETE") rows = [];
    await route.fulfill({ json: { ok: true } });
  });
  await page.locator("#btn-schedule").click();
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Resume", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Send now", exact: true }).click();
  await expect(page.locator("#schedule-result")).toContainText(
    "Delivery service unavailable",
  );
  await expect(
    page.getByRole("button", { name: "Send now", exact: true }),
  ).toBeEnabled();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Delete", exact: true }).click();
  await expect(page.locator("#schedule-list-body")).toContainText(
    "No scheduled reports yet.",
  );
  expect(calls.map((call) => call.method)).toEqual(["PATCH", "POST", "DELETE"]);
});

test("employer schedule recipients stay read-only and unavailable mail disables saving", async ({
  page,
}) => {
  await ready(page, "/dashboard", {
    "/api/auth/me": { ...me, role: "EMPLOYER_MANAGER" },
    "/api/report-schedules/config": { configured: false },
  });
  await page.locator("#btn-schedule").click();
  await expect(page.locator("#schedule-recipients")).toHaveAttribute(
    "readonly",
    "",
  );
  await expect(
    page.getByRole("button", { name: "Save schedule", exact: true }),
  ).toBeDisabled();
  await expect(page.locator(".schedule-note.err")).toContainText(
    "System email is not configured",
  );
});
