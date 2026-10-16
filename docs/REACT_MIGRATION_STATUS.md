# React migration status

All 12 canonical page layouts now use declarative React. The employer dashboard, portfolio dashboard, administration and user-management interfaces no longer run their legacy page controllers. The production routes serve the built React entries; source HTML remains a reference fixture for generation and visual comparisons.

The migration is ready for acceptance testing. Production readiness still requires real authenticated tests of the intended migration database, source connection and email delivery. Mocked browser tests and an anonymous health response cannot establish those outcomes.

## Source reconciliation

Source target: `CayelaemJ/NewChanges@1ce1da97dce1b38deb601a1a48d2c200647c5c47`, checked on 16 October 2026. The 47-commit application delta after `528be408e07042b449f5258f23bd00702df09a20` is reconciled with the migration's React routes, permission guards, password handling, session revocation and completed-job response contracts retained.

Included backend changes cover candidate source preflight/staging, encrypted connection vaults, source generations and continuity proofs, semantic queue/planning/storage/publication controls, replacement preflight and dependency/integrity reviews, refresh/snapshot/report changes, database readiness and status endpoints, and stricter cookie-origin checks. Normal refresh is incremental. Authoritative reset remains a separate confirmed operation. Source cutover, shadow workers, external semantic publication and replacement operations retain their upstream opt-in gates; copying code does not enable them.

The source's starter `frontend/src/App.tsx`, hosting-specific infrastructure and separate quality-tooling pipeline are not substituted for the migration's production React entries or established deployment/browser pipeline. Applicable source security, contract and regression checks are integrated with migration CI. No source database cutover or data replacement is performed by this migration.

## Implemented frontend

| Surface | React ownership |
| --- | --- |
| Public pages and forms | All layouts, controlled authentication/contact/password forms, validation and error state |
| Navigation and shared shell | Role-based links, account/mobile menus, theme, logout, welcome/cookie lifecycle and analytics |
| Employer dashboard | Session, parallel abortable data reads, URL filters, permissions, retry, version polling, freshness/activity/quality notices and explicit demo isolation |
| Employer visuals | Wellness, executive summary, KPIs, funnel, all charts, EWA, debt/creditors, stress, ratings, risks/opportunities, chat and accessible drilldowns |
| Portfolio | Employer selection, KPI aggregation, heatmap, rankings, missing-data rules and metric explanations |
| Branding and export | Native logo/name rendering, Brand Engine tokens with cleaned-up observation, static metric tooltips, width fitting and React report metadata; export disabled during data changes |
| User/security management | CRUD/access/roles/activation, sessions/alerts/profile/history, audit export, revocation and database telemetry |
| Admin reports | Report selection, templates, uploads/progress, validation, jobs/SSE/poll fallback, commit/import history and revert |
| Admin configuration | Sections/permissions, email/providers, automation/schedules/history and explicit reset/rebuild |
| Admin governance | Audit/engagement, security/compliance/MLOps and enterprise operations |
| Integration | Controlled API/SQL/replica forms, heartbeat presets/validation, save/test/sync, safe incremental refresh, candidate preview/staging and replacement impact preview |
| Partners | Branding CRUD, logo extraction/upload/retry, assignments, deletion and client preview |
| Connected status | Collapsible source status and independent read-only PostgreSQL health with minute polling and cleanup |

The dashboard page has an empty `start()` function. `dashboard-model.js` retains source metric/demo calculations and publishes data to React consumers; it contains no DOM controller, HTML rendering or event listeners. Architectural checks prevent legacy dashboard/admin controllers from returning. Backend services remain TypeScript server code.

## Verification

Bounded mapped staging, fencing/recovery and request-scoped auth/query-cache safeguards are also included. Import history now offers manual refresh, polls every 30 seconds only while visible, and keeps immediate active-job updates.

Build, frontend type checks, architecture checks, backend route/auth and completed-job contracts are required. Thirty-five source contract tests cover semantic planning/storage/provenance, vault integrity, continuity/reconciliation and dataset replacement safeguards. The browser suite contains 105 checks, including desktop/mobile source comparisons with the unchanged 0.5% pixel-difference gate, role/theme rules, missing/zero values, cancellation/recovery, import/admin workflows and the newly ported controls. Browser API responses are isolated fixtures.

The source-to-migration schema diff is recorded in `prisma/migrations/20261016120000_source_generations_semantic_storage/migration.sql`. It adds eight tables, indexes and foreign keys; it contains no destructive data statements or modifications to existing application tables.

## Deployment and acceptance

Draft PR: https://github.com/CayelaemJ/EFS-React-Migration/pull/3

Railway `migration-test` service `efs-react-migration` tracks branch `migration/newchanges-upstream-react`. Existing automatic deployment runs its configured Prisma schema push before startup; branch pushes therefore deploy to this test environment. No Railway configuration, production environment, source connection or credentials are changed manually.

Final acceptance requires an authorized working migration-test login and confirmation of the intended database/source, followed by actual role/access edits, uploads/commit/revert, source test/sync/reset where appropriate, branding persistence and scheduled email delivery. Connector credentials are redacted; authenticated outcomes must not be inferred from mocked tests or bypassed by extracting hidden credentials.
