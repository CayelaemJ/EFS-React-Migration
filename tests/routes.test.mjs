import assert from "node:assert/strict";
import app from "../dist/server.js";
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
await app.close();
console.log(
  "PASS: production React routes, auth redirects, static access restrictions, logo and health endpoint",
);
