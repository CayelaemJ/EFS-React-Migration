import assert from "node:assert/strict";
import app from "../dist/server.js";
import { prisma } from "../dist/services/authService.js";
for (const route of [
  "/login",
  "/contact",
  "/set-password",
  "/privacy",
  "/terms",
  "/cookies",
  "/thank-you",
]) {
  const result = await app.inject({ method: "GET", url: route });
  assert.equal(result.statusCode, 200, route);
  assert.match(
    result.body,
    /<script[^>]+type="module"/,
    route + " must serve React",
  );
  assert.doesNotMatch(
    result.body,
    /\{\{PORTAL_CONFIG\}\}/,
    route + " must resolve configuration",
  );
}
for (const route of ["/dashboard", "/admin", "/users"]) {
  const result = await app.inject({ method: "GET", url: route });
  assert.equal(result.statusCode, 302, route);
  assert.equal(result.headers.location, "/login");
}
for (const route of ["/react/dashboard", "/react/admin", "/react/users"]) {
  const result = await app.inject({
    method: "GET",
    url: route + "?period=2026-09",
  });
  assert.equal(result.statusCode, 302, route);
  assert.equal(result.headers.location, route.slice(6) + "?period=2026-09");
}
for (const route of [
  "/static/dashboard.html",
  "/static/admin.html",
  "/react/pages/users.html",
]) {
  assert.equal(
    (await app.inject({ method: "GET", url: route })).statusCode,
    404,
    route + " must not bypass page authorization",
  );
}
assert.equal(
  (await app.inject({ method: "GET", url: "/api/auth/me" })).statusCode,
  401,
);
assert.equal(
  (await app.inject({ method: "GET", url: "/health" })).statusCode,
  200,
);
assert.equal(
  (await app.inject({ method: "GET", url: "/missing-page" })).statusCode,
  404,
);
const logo = await app.inject({ method: "GET", url: "/static/logo.png" });
assert.equal(logo.statusCode, 200);
assert.match(logo.headers["content-type"], /image\/png/);
// Exercise the real session resolver and route guards with isolated data.
// No live database credentials or account changes are required.
const originalSession = prisma.session.findUnique;
const originalSections = prisma.dashboardSection.findMany;
let role = "ADMIN",
  reads = 0;
prisma.session.findUnique = async () => ({
  id: "permission-test-session",
  expiresAt: new Date(Date.now() + 60_000),
  lastSeenAt: new Date(),
  user: {
    id: "permission-test-user",
    email: "permissions@example.invalid",
    active: true,
    role,
    links: [],
  },
});
prisma.dashboardSection.findMany = async () => {
  reads++;
  return [];
};
try {
  const routes = [
    { method: "GET", url: "/api/admin/sections" },
    {
      method: "PATCH",
      url: "/api/admin/sections/voiceOfEmployee",
      payload: { enabled: false },
    },
    {
      method: "POST",
      url: "/api/admin/sections/voiceOfEmployee/grant",
      payload: { userId: "user-1" },
    },
    {
      method: "POST",
      url: "/api/admin/sections/voiceOfEmployee/revoke",
      payload: { userId: "user-1" },
    },
  ];
  for (const value of [
    "ADMIN",
    "VIEWER",
    "EMPLOYER_MANAGER",
    "PORTFOLIO_MANAGER",
  ]) {
    role = value;
    for (const route of routes) {
      const response = await app.inject({
        ...route,
        headers: { authorization: "Bearer isolated-permission-test" },
      });
      assert.equal(
        response.statusCode,
        403,
        `${value}: ${route.method} ${route.url}`,
      );
      assert.deepEqual(response.json(), { error: "access denied" });
    }
  }
  for (const route of routes) {
    const response = await app.inject(route);
    assert.equal(response.statusCode, 401, `anonymous: ${route.url}`);
  }
  assert.equal(
    reads,
    0,
    "Rejected section requests must not read section data",
  );
  role = "SUPERADMIN";
  const response = await app.inject({
    method: "GET",
    url: "/api/admin/sections",
    headers: { authorization: "Bearer isolated-permission-test" },
  });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), []);
  assert.equal(reads, 1);
} finally {
  prisma.session.findUnique = originalSession;
  prisma.dashboardSection.findMany = originalSections;
  await app.close();
}
console.log(
  "PASS: production React routes, auth redirects, static access restrictions, logo and health endpoint",
);
