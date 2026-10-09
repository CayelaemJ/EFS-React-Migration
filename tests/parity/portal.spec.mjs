import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import fs from "node:fs";
import {
  mockApi,
  me,
  users,
  sections,
  dashboard,
  fixture,
} from "./fixtures.mjs";
import { completedJobResponse } from "../../dist/services/jobResponses.js";
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
        if (name === "dashboard") {
          await expect(page.locator("#data-fresh-label")).toContainText(
            "Source updated",
          );
          await expect(
            page.locator("#region-bars .hbar-val").first(),
          ).toHaveCSS("white-space", "nowrap");
        }
        await page.waitForTimeout(1800);
        await page.addStyleTag({
          content:
            "*,*::before,*::after {transition:none!important;animation:none!important;caret-color:transparent!important;} .reveal{opacity:1!important;transform:none!important;} #ent-progress,#welcome-splash{display:none!important;}",
        });
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
          );
        });
        const layout = await page
          .locator(
            "[id],.kpi-value,.stat-value,.metric-value,.stat-cell .v,.rating-big,.stress-v",
          )
          .evaluateAll((nodes) =>
            nodes.map((node) => {
              const rect = node.getBoundingClientRect();
              const style = getComputedStyle(node);
              return {
                id: node.id,
                className: node.getAttribute("class"),
                text: node.textContent?.slice(0, 80),
                y: rect.y,
                height: rect.height,
                width: rect.width,
                font: style.fontSize,
                lineHeight: style.lineHeight,
              };
            }),
          );
        fs.writeFileSync(
          testInfo.outputPath(`layout-${port}.json`),
          JSON.stringify(layout, null, 2),
        );
      }
      const a = PNG.sync.read(await pages[0].screenshot({ fullPage: true }));
      const b = PNG.sync.read(await pages[1].screenshot({ fullPage: true }));
      for (let i = 0; i < pages.length; i++) {
        const layout = await pages[i]
          .locator("[id],.dash-section,.card,.stat-strip")
          .evaluateAll((nodes) =>
            nodes.map((node) => {
              const rect = node.getBoundingClientRect();
              return {
                id: node.id,
                className: node.getAttribute("class"),
                text: node.textContent?.slice(0, 80),
                y: rect.y,
                height: rect.height,
                width: rect.width,
              };
            }),
          );
        fs.writeFileSync(
          testInfo.outputPath(`after-layout-${i}.json`),
          JSON.stringify(layout, null, 2),
        );
      }
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
test("live dashboard values fit after initial load and filter refresh", async ({
  browser,
}) => {
  for (const port of [4101, 4100]) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    await mockApi(page);
    await page.goto(`http://127.0.0.1:${port}/dashboard`);
    const value = page.locator("#region-bars .hbar-val").first();
    await expect(value).toHaveCSS("white-space", "nowrap");
    const refresh = page.waitForResponse(
      (response) =>
        response.url().includes("/dashboard?") &&
        response.url().includes("range=30d"),
    );
    await page.locator("#month-select").selectOption("30d");
    await refresh;
    await expect(value).toHaveCSS("white-space", "nowrap");
    await expect(value).toHaveCSS("font-size", "12.5px");
    await page.close();
  }
});
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
test("React report imports show background progress, validated state, commit and live history", async ({
  page,
}) => {
  await ready(page, "/admin");
  let uploadReads = 0,
    commitReads = 0,
    committed = false,
    uploaded = false;
  await page.route("**/api/admin/batches", (route) =>
    route.fulfill({
      json: [
        {
          id: "batch-1",
          reportKey: "employers",
          filename: "employers.csv",
          rowCount: 2,
          status: committed ? "COMMITTED" : "VALIDATED",
          insertedCount: committed ? 2 : 0,
          uploadedAt: "2026-10-09T08:00:00Z",
          revertable: true,
        },
      ],
    }),
  );
  await page.route("**/api/admin/reports/employers/upload", async (route) => {
    uploaded =
      route.request().method() === "POST" &&
      route.request().postDataBuffer().toString().includes("employers.csv");
    await route.fulfill({ status: 202, json: { jobId: "upload-1" } });
  });
  await page.route("**/api/admin/upload-jobs/upload-1", (route) =>
    route.fulfill({
      json:
        ++uploadReads === 1
          ? {
              status: "RUNNING",
              progress: 42,
              phase: "VALIDATING",
              message: "Validating employers",
              detail: { validatedRows: 2 },
            }
          : {
              status: "DONE",
              result: {
                status: "VALIDATED",
                batchId: "batch-1",
                rowCount: 2,
                preview: [{ employer_ref: "example", name: "Example Ltd" }],
              },
            },
    }),
  );
  await page.route("**/api/admin/batches/batch-1/commit", (route) =>
    route.fulfill({ status: 202, json: { jobId: "commit-1" } }),
  );
  await page.route("**/api/admin/commit-jobs/commit-1", (route) => {
    const running = ++commitReads === 1;
    if (!running) committed = true;
    return route.fulfill({
      json: running
        ? {
            status: "RUNNING",
            progress: 60,
            phase: "COMMITTING",
            message: "Writing live rows",
            detail: { committedRows: 2 },
          }
        : {
            status: "DONE",
            result: { period: "2026-10", touchedEmployers: ["employer-1"] },
          },
    });
  });
  await page.locator("#rep-list .rep").first().click();
  await page.locator("#file").setInputFiles({
    name: "employers.csv",
    mimeType: "text/csv",
    buffer: Buffer.from("employer_ref,name\nexample,Example Ltd"),
  });
  await expect(page.locator("#result")).toContainText("42%");
  await expect(page.locator("#result")).toContainText("Validated 2 rows");
  expect(uploaded).toBe(true);
  await expect(page.locator("#hist-body")).toContainText(
    "VALIDATED · NOT LIVE",
  );
  await page.getByRole("button", { name: "Commit & recompute scores" }).click();
  await expect(page.locator("#result")).toContainText("Processed live: 2");
  await expect(page.locator("#result")).toContainText(
    "Recomputed 1 employer dashboard(s)",
  );
  await expect(page.locator("#hist-body .st")).toHaveText("COMMITTED");
  await expect(page.locator("#hist-body")).toContainText("+2 new");
});
test("React report upload retries the same file and renders validation errors as text", async ({
  page,
}) => {
  await ready(page, "/admin");
  let attempts = 0;
  const dangerous = '<img src=x onerror="window.bad=1">';
  await page.route("**/api/admin/reports/employers/upload", (route) =>
    route.fulfill(
      ++attempts === 1
        ? { status: 400, json: { error: "The file could not be read" } }
        : {
            json: {
              status: "INVALID",
              errorCount: 1,
              rowCount: 3,
              missingColumns: ["employer_ref"],
              errors: [
                {
                  row: 2,
                  column: "name",
                  value: dangerous,
                  reason: "Invalid name",
                },
              ],
            },
          },
    ),
  );
  await page.locator("#rep-list .rep").first().click();
  const file = {
    name: "employers.csv",
    mimeType: "text/csv",
    buffer: Buffer.from("name\nExample Ltd"),
  };
  await page.locator("#file").setInputFiles(file);
  await expect(page.locator("#result")).toContainText(
    "The file could not be read",
  );
  await page.locator("#file").setInputFiles(file);
  await expect(page.locator("#result")).toContainText("Nothing was loaded");
  await expect(page.locator("#result")).toContainText(
    "Missing required columns: employer_ref",
  );
  await expect(page.locator("#result")).toContainText(dangerous);
  await expect(page.locator("#result img")).toHaveCount(0);
  expect(attempts).toBe(2);
});
test("React report manifest recovers from API failure without reloading the page", async ({
  page,
}) => {
  await mockApi(page);
  let attempts = 0;
  await page.route("**/api/admin/reports", (route) =>
    route.fulfill(
      ++attempts === 1
        ? { status: 503, json: { error: "Report contract unavailable" } }
        : { json: fixture("http://localhost/api/admin/reports") },
    ),
  );
  await page.goto(url + "/admin");
  await expect(page.locator("#rep-list")).toContainText(
    "Report contract unavailable",
  );
  await page
    .locator("#rep-list")
    .getByRole("button", { name: "Retry" })
    .click();
  await expect(page.locator("#rep-list .rep")).toHaveCount(10);
  await page.locator("#rep-list .rep").first().press("Enter");
  await expect(page.locator("#file")).toHaveAttribute(
    "accept",
    ".csv,.xlsx,.xls,.json",
  );
});
test("React report jobs finish on the real backend envelope for automatic commits and errors", async ({
  page,
}) => {
  await ready(page, "/admin");
  let uploads = 0;
  await page.route("**/api/admin/reports/employers/upload", (route) => {
    uploads++;
    return route.fulfill({ status: 202, json: { jobId: "job-" + uploads } });
  });
  await page.route("**/api/admin/upload-jobs/job-*", (route) =>
    route.fulfill({
      json: completedJobResponse(
        uploads === 1
          ? {
              status: "COMMITTED",
              batchId: "batch-1",
              rowCount: 2,
              period: "2026-10",
              inserted: 2,
              preview: [],
            }
          : {
              status: "ERROR",
              errorSummary: "Upload failed: database write unavailable",
              rowCount: 0,
              errors: [],
              missingColumns: [],
            },
      ),
    }),
  );
  await page.locator("#rep-list .rep").first().click();
  const file = {
    name: "employers.csv",
    mimeType: "text/csv",
    buffer: Buffer.from("employer_ref,name\nexample,Example Ltd"),
  };
  await page.locator("#file").setInputFiles(file);
  await expect(page.locator("#result")).toContainText(
    "Imported 2 rows successfully",
  );
  await expect(page.locator("#result")).toContainText("Inserted 2");
  await expect(
    page.getByRole("button", { name: "Commit & recompute scores" }),
  ).toHaveCount(0);
  await page.locator("#file").setInputFiles(file);
  await expect(page.locator("#result")).toContainText(
    "Upload failed: database write unavailable",
  );
  await expect(page.locator("#file")).toBeEnabled();
  await expect(page.locator("#rep-list .rep")).toHaveCount(10);
});
test("Sync now completes with a partial outcome instead of polling indefinitely", async ({
  page,
}) => {
  await ready(page, "/admin");
  await page.locator("#integ-url").fill("https://source.example.invalid");
  await page.route("**/api/admin/integration/sync", (route) =>
    route.fulfill({ status: 202, json: { jobId: "sync-1" } }),
  );
  await page.route("**/api/admin/sync-jobs/sync-1", (route) =>
    route.fulfill({
      json: completedJobResponse({
        status: "PARTIAL",
        note: "One feed needs review",
        summary: {
          employees: { error: "Required employer reference missing" },
        },
      }),
    }),
  );
  await page.getByRole("button", { name: "Sync now", exact: true }).click();
  await expect(page.locator("#integ-result")).toContainText(
    "PARTIAL: One feed needs review",
  );
  await expect(page.locator("#integ-result")).toContainText(
    "Required employer reference missing",
  );
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

test("React section permissions save visibility, roles and individual grants with recovery", async ({
  page,
}) => {
  let current = structuredClone(sections),
    rejectNext = true;
  const writes = [];
  await mockApi(page);
  await page.addInitScript(() =>
    localStorage.setItem("cookieNoticeDismissed", "1"),
  );
  await page.route("**/api/admin/sections**", async (route) => {
    const request = route.request();
    if (request.method() === "GET") return route.fulfill({ json: current });
    const body = request.postDataJSON(),
      path = new URL(request.url()).pathname;
    writes.push({ body, path, method: request.method() });
    if (rejectNext) {
      rejectNext = false;
      return route.fulfill({
        status: 503,
        json: { error: "Permissions unavailable" },
      });
    }
    if (path.endsWith("/revoke")) current[0].overrides = [];
    else if (path.endsWith("/grant"))
      current[0].overrides = [
        { userId: body.userId, name: users[0].name, email: users[0].email },
      ];
    else Object.assign(current[0], body);
    return route.fulfill({ json: { ok: true } });
  });
  await page.goto(url + "/admin");
  const card = page.locator('[data-section-key="voiceOfEmployee"]');
  const visible = card.getByRole("checkbox", {
    name: "Voice of the employee",
    exact: true,
  });
  await expect(visible).toBeChecked();
  await visible.click();
  await expect(page.locator('#sec-list [role="alert"]')).toContainText(
    "Permissions unavailable",
  );
  await expect(visible).toBeChecked();
  await visible.click();
  await expect(visible).not.toBeChecked();
  await expect(card).toContainText("Hidden from everyone");
  await card.getByRole("checkbox", { name: "Viewer", exact: true }).click();
  await expect(
    card.getByRole("checkbox", { name: "Viewer", exact: true }),
  ).not.toBeChecked();
  expect(current[0].allowedRoles).toContain("SUPERADMIN");
  await card
    .getByRole("link", { name: "Revoke access for Example User" })
    .click();
  await expect(
    card.getByRole("link", { name: "Revoke access for Example User" }),
  ).toHaveCount(0);
  await card.getByRole("combobox").selectOption("user-1");
  await card.getByRole("button", { name: "Grant", exact: true }).click();
  await expect(
    card.getByRole("link", { name: "Revoke access for Example User" }),
  ).toBeVisible();
  await expect(card.getByRole("combobox")).toHaveValue("");
  expect(writes.map((row) => row.method)).toEqual([
    "PATCH",
    "PATCH",
    "PATCH",
    "POST",
    "POST",
  ]);
  expect(writes.at(-1).body).toEqual({ userId: "user-1" });
});

test("React section permission list retries load failures and stays hidden for operational admins", async ({
  page,
}) => {
  let attempts = 0;
  await mockApi(page);
  await page.addInitScript(() =>
    localStorage.setItem("cookieNoticeDismissed", "1"),
  );
  await page.route("**/api/admin/sections", (route) =>
    ++attempts === 1
      ? route.fulfill({
          status: 503,
          json: { error: "Section service unavailable" },
        })
      : route.fulfill({ json: sections }),
  );
  await page.goto(url + "/admin");
  await expect(page.locator('#sec-list [role="alert"]')).toContainText(
    "Section service unavailable",
  );
  await page
    .locator("#sec-list")
    .getByRole("button", { name: "Retry", exact: true })
    .click();
  await expect(
    page.locator('[data-section-key="voiceOfEmployee"]'),
  ).toBeVisible();
  await page.route("**/api/auth/me", (route) =>
    route.fulfill({ json: { ...me, role: "ADMIN" } }),
  );
  const previous = attempts;
  await page.reload();
  await expect(page.locator("#rep-list .rep")).toHaveCount(10);
  await expect(
    page.locator(".card").filter({
      has: page.getByRole("heading", {
        name: "Dashboard Sections",
        exact: true,
      }),
    }),
  ).toBeHidden();
  await expect(
    page.locator('[data-section-key="voiceOfEmployee"]'),
  ).toHaveCount(0);
  expect(attempts).toBe(previous);
});

test("React email settings retain failed drafts, clear saved secrets and send current test values", async ({
  page,
}) => {
  const config = {
    emailProvider: "smtp",
    smtpHost: "smtp.example.invalid",
    smtpPort: 587,
    configured: true,
    hasPassword: true,
    fromEmail: "reports@example.invalid",
  };
  const posts = [];
  let rejectSave = true;
  await mockApi(page, { "/api/admin/email-settings": config });
  await page.addInitScript(() =>
    localStorage.setItem("cookieNoticeDismissed", "1"),
  );
  await page.route("**/api/admin/email-settings", async (route) => {
    if (route.request().method() === "GET")
      return route.fulfill({ json: config });
    const body = route.request().postDataJSON();
    posts.push(body);
    if (rejectSave) {
      rejectSave = false;
      return route.fulfill({
        status: 503,
        json: { error: "Email provider unavailable" },
      });
    }
    Object.assign(config, body);
    return route.fulfill({ json: { ok: true } });
  });
  await page.route("**/api/admin/email-settings/test", (route) => {
    posts.push(route.request().postDataJSON());
    return route.fulfill({ json: { recipient: "tester@example.invalid" } });
  });
  await page.goto(url + "/admin");
  await expect(page.locator("#mail-host")).toHaveValue(config.smtpHost);
  await page.locator("#mail-host").fill("smtp.new.example.invalid");
  await page.locator("#mail-password").fill("isolated-test-password");
  await page.locator("#mail-resend-key").fill("isolated-test-key");
  await page
    .getByRole("button", { name: "Save email settings", exact: true })
    .click();
  await expect(page.locator("#mail-result")).toContainText(
    "Email provider unavailable",
  );
  await expect(page.locator("#mail-host")).toHaveValue(
    "smtp.new.example.invalid",
  );
  await expect(page.locator("#mail-password")).toHaveValue(
    "isolated-test-password",
  );
  await page
    .getByRole("button", { name: "Save email settings", exact: true })
    .click();
  await expect(page.locator("#mail-result")).toContainText(
    "Email settings saved",
  );
  await expect(page.locator("#mail-password")).toHaveValue("");
  await expect(page.locator("#mail-resend-key")).toHaveValue("");
  await page.locator("#mail-provider").selectOption("resend");
  await page.locator("#mail-test-recipient").fill("tester@example.invalid");
  await page
    .getByRole("button", { name: "Send test email", exact: true })
    .click();
  await expect(page.locator("#mail-result")).toContainText(
    "Test email sent to tester@example.invalid",
  );
  await expect(page.locator("#mail-provider")).toHaveValue("resend");
  expect(posts[1].smtpPassword).toBe("isolated-test-password");
  expect(posts[1].resendApiKey).toBe("isolated-test-key");
  expect(posts[2]).toMatchObject({
    emailProvider: "resend",
    recipient: "tester@example.invalid",
  });
  expect(posts[2]).not.toHaveProperty("smtpPassword");
  expect(posts[2]).not.toHaveProperty("resendApiKey");
});

test("React automation saves and run-now actions preserve unrelated drafts", async ({
  page,
}) => {
  const config = {
    emailProvider: "smtp",
    smtpHost: "smtp.example.invalid",
    configured: true,
  };
  const posts = [];
  await mockApi(page, { "/api/admin/email-settings": config });
  await page.addInitScript(() =>
    localStorage.setItem("cookieNoticeDismissed", "1"),
  );
  await page.route("**/api/admin/email-settings", (route) => {
    if (route.request().method() === "GET")
      return route.fulfill({ json: config });
    const body = route.request().postDataJSON();
    posts.push(body);
    Object.assign(config, body);
    return route.fulfill({ json: { ok: true } });
  });
  await page.route("**/api/admin/automations/run", (route) => {
    posts.push(route.request().postDataJSON());
    return route.fulfill({
      json: { message: "Completed isolated automation" },
    });
  });
  await page.goto(url + "/admin");
  await expect(page.locator("#mail-host")).toHaveValue(config.smtpHost);
  await page.locator("#mail-host").fill("unsaved.example.invalid");
  await page.locator("#auto-alert-emails").fill("admin@example.invalid");
  await page.locator("#auto-stale-days").fill("180");
  await page.locator("#auto-digest-enabled").check();
  await page.locator("#synthetic-data-mode").check();
  await page
    .getByRole("button", { name: "Save automation settings", exact: true })
    .click();
  await expect(page.locator("#auto-result")).toContainText(
    "Automation settings saved",
  );
  await expect(page.locator("#mail-host")).toHaveValue(
    "unsaved.example.invalid",
  );
  expect(posts[0]).toMatchObject({
    alertEmails: "admin@example.invalid",
    staleDeactivateDays: 180,
    digestEnabled: true,
    syntheticDataMode: true,
  });
  expect(posts[0]).not.toHaveProperty("smtpHost");
  await page
    .locator("#auto-alert-emails")
    .fill("unsaved-admin@example.invalid");
  for (const name of [
    "Run stale-account check now",
    "Send digest now",
    "Send test alert",
  ]) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.locator("#auto-result")).toContainText(
      "Completed isolated automation",
    );
    await expect(page.getByRole("button", { name, exact: true })).toBeEnabled();
  }
  await expect(page.locator("#auto-alert-emails")).toHaveValue(
    "unsaved-admin@example.invalid",
  );
  expect(posts.slice(1)).toEqual([
    { kind: "stale" },
    { kind: "digest" },
    { kind: "test" },
  ]);
});

test("React settings retry failed loads and render schedule and delivery values as text", async ({
  page,
}) => {
  let attempts = 0;
  await mockApi(page, {
    "/api/admin/report-schedules": [
      {
        id: "mail-schedule",
        name: "Payroll report",
        frequency: "WEEKLY",
        dayOfWeek: 1,
        sendTime: "08:00",
        active: false,
        user: { name: "Example User", email: "user@example.invalid" },
      },
    ],
    "/api/admin/report-deliveries": [
      {
        id: "mail-delivery",
        subject: "<img src=x onerror=alert(1)>",
        status: "FAILED",
        recipients: ["user@example.invalid"],
        error: "Delivery rejected",
      },
    ],
  });
  await page.addInitScript(() =>
    localStorage.setItem("cookieNoticeDismissed", "1"),
  );
  await page.route("**/api/admin/email-settings", (route) =>
    ++attempts === 1
      ? route.fulfill({ status: 503, json: { error: "Settings unavailable" } })
      : route.fulfill({ json: { configured: true, emailProvider: "resend" } }),
  );
  await page.goto(url + "/admin");
  await expect(page.locator("#mail-result")).toContainText(
    "Settings unavailable",
  );
  await page
    .locator("#mail-result")
    .getByRole("button", { name: "Retry", exact: true })
    .click();
  await expect(page.locator("#mail-status")).toContainText(
    "Resend API is configured",
  );
  await expect(page.locator("#mail-schedules")).toContainText(
    "Weekly · Mon 08:00",
  );
  await expect(page.locator("#mail-schedules")).toContainText("Paused");
  await expect(page.locator("#mail-deliveries")).toContainText(
    "<img src=x onerror=alert(1)>",
  );
  await expect(page.locator("#mail-deliveries img")).toHaveCount(0);
  await expect(page.locator("#mail-deliveries")).toContainText(
    "Delivery rejected",
  );
  await expect(
    page.getByRole("button", { name: "Save email settings", exact: true }),
  ).toBeEnabled();
});

for (const width of [1440, 390])
  test(`React settings preserve source dark-mode layout and colours at ${width}px`, async ({
    browser,
  }) => {
    const measurements = [];
    for (const port of [4101, 4100]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        timezoneId: "Africa/Johannesburg",
      });
      await mockApi(page, {
        "/api/admin/email-settings": {
          emailProvider: "smtp",
          configured: true,
        },
        "/api/admin/report-deliveries": [
          {
            id: "delivery",
            subject: "Test report",
            status: "FAILED",
            error: "Delivery rejected",
            recipients: ["test@example.invalid"],
          },
        ],
      });
      await page.addInitScript(() => {
        localStorage.setItem("cookieNoticeDismissed", "1");
        localStorage.setItem("empower-fin-theme", "dark");
      });
      await page.goto(`http://127.0.0.1:${port}/admin`);
      await expect(page.locator("html")).toHaveClass(/portal-dark/);
      await expect(page.locator("#mail-status")).toContainText(
        "SMTP is configured",
      );
      await expect(page.locator("#mail-deliveries")).toContainText(
        "Delivery rejected",
      );
      const selectors = [
        "#mail-provider",
        "#mail-host",
        "#mail-portal-url",
        "#auto-alert-emails",
        "label:has(#mail-from-email)",
        "label:has(#mail-secure)",
        "label:has(#synthetic-data-mode)",
        "#mail-deliveries td:nth-child(3)",
        "#mail-deliveries td:nth-child(4) div",
      ];
      const values = [];
      for (const selector of selectors)
        values.push(
          await page.locator(selector).evaluate((node) => {
            const style = getComputedStyle(node),
              rect = node.getBoundingClientRect();
            return {
              color: style.color,
              background: style.backgroundColor,
              border: style.borderColor,
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            };
          }),
        );
      measurements.push(values);
      await page.close();
    }
    expect(measurements[1]).toEqual(measurements[0]);
  });
