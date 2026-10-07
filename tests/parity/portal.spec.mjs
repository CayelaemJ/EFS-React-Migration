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
    const broken = await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs
          .filter((i) => i.complete && i.naturalWidth === 0)
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
  expect(await page.evaluate(() => window.BrandEngine?.VERSION)).toBe("1.1.0");
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
