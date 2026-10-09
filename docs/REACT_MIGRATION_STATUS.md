# React migration status — 9 October 2026

The migration is **not ready for acceptance**. Dashboard and administration controllers still need conversion, hosted GitHub CI must pass on this checkpoint, and real authenticated workflows require migration-test credentials.

## Source

The supplied ZIP was based on NewChanges commit `115a28a12ddc7ea1b5effbdb0baa354824ce7841`. The current source target is `19f32c1905371ea8868eef82a6078c4439c93300`, verified on 9 October. The initial reconciliation imported 53 changed files through `ed5a71a7cf9ee5ea5d3b337924be1db94a8a76f8`; the subsequent source update changes custom partner portals to partner-only branding. Existing native React components are retained rather than replaced with upstream controllers.

Brand Engine 1.4, supplied The Fixer normal/reversed SVG assets, updated styles, source-status UI, post-login greeting, dashboard/admin changes, backend source synchronisation, daily refresh, import, snapshot, report, partner and job services have been reconciled. The source frontend starter is not the production entry point: production uses the twelve React page entries and shared components. No Prisma schema changes were introduced by the source delta. SQL/deployment script changes are included but have not been executed against Railway.

## React conversion

| Surface | Implementation | Remaining work |
| --- | --- | --- |
| Sign-in, password setup, contact | React controlled forms, validation and API/error state | Real authenticated integration verification |
| Home and legal/support pages | Declarative React JSX and shared lifecycle behaviour | Broader content/visual review |
| Navigation/account controls | React menus, mobile links, light/dark state, logout and deactivation | Remove the temporary data bridge when dashboard/admin controllers are replaced |
| User management | React creation, role/access/employer/partner fields, editors, search/status filters, activation and past users | Authenticated database writes and all role permutations |
| Security centre | React sessions, alerts, sign-in/device/access history, database status, audit export, profile drawer and session revocation | Live security telemetry and server integration verification |
| Source-status badge | React polling, event refresh, visibility refresh and cleanup | Live source-job verification |
| Dashboard dialogs | React Quick Actions and scheduled reports | Authenticated delivery and SMTP verification |
| Employer and portfolio dashboards | React JSX with retained imperative calculation/render controllers | Full conversion to React state/components; broader data permutations |
| Administration reports/imports | React report selection, templates, file/drop upload progress, validation, background jobs, commit and live import history | Authenticated database import/revert verification |
| Remaining administration | React JSX with retained integration/settings/security/compliance/partner/preview controllers | Full conversion to React state/components |

The users entry no longer starts the legacy users or user-security scripts. Source HTML remains a reference fixture. Default Admin/Superadmin shells use The Fixer; custom partner dashboards show the partner identity alone, matching the latest source product decision.

## Verification

The prior checkpoint passed all 35 local browser checks and hosted GitHub CI. This checkpoint passes all 40 local browser checks, including five added report/import/sync workflow tests. The production build, upstream regression suite, typecheck, completed-job response contract and Fastify route/access checks also pass. Hosted CI is rerun on this checkpoint before acceptance. Browser coverage includes twelve mounts, dashboard/admin/users full-page comparisons at 1440px and 390px, navigation/account actions, portfolio and filters, schedules, controlled user creation/editing with failure recovery, security filtering/profile/alerts and partner light/dark shell rules. API responses are mocked. These tests do not prove real database writes, external source sync, SMTP delivery or all role/data combinations.

The screenshot gate remains a maximum differing-pixel ratio of 0.5%, with per-pixel threshold 0.15. It is not a claim of exact pixel identity. Fonts are isolated from external network dependencies. The intermittent dashboard difference was traced to number fitting increasing labels smaller than its minimum and running inconsistently after live renders. Fitting now cannot enlarge the CSS font size, runs after data renders, and ignores height-only resize events. Repeated local mobile comparisons pass; hosted CI remains the acceptance gate.

## Railway and publication

The migration-test app is healthy at `https://efs-react-migration-migration-test.up.railway.app`. The inspected deployment is `d73e4d9b-fc5a-4dad-b7af-0b54bb86036e` (SUCCESS). It still follows `migration/newchanges-react-parity`, has `/health` configured, and uses a service-level `prisma db push` predeploy override. No Railway configuration, variables or database data were changed by this checkpoint.

This checkpoint uses `migration/newchanges-upstream-react` to avoid automatically deploying unfinished work from the service's tracked branch. Main is not merged. Railway OAuth exposes variable names with values redacted; no migration database URL or admin password is available for authenticated testing. Health and anonymous authentication responses were checked, but authenticated database/Railway workflows remain unverified.

## Administration report checkpoint

Report selection, template downloads, drag/drop and file uploads, request progress, validation previews/errors, asynchronous commit jobs and import history are now rendered from React state. The generated production controller no longer contains the old report picker, upload, commit, revert or history renderer. Remaining administration panels use a temporary manifest/history-refresh boundary; their existing source contracts are preserved. SSE provides immediate progress while polling verifies final job state and handles unavailable streams. Component cleanup stops progress streams, polling timers and requests. Validation cells render text through React. Report and upload errors have separate state so an upload error cannot erase the report selector.

Completed upload, commit and sync job responses now keep lifecycle status `DONE` separate from the nested import/sync outcome. Previously spreading a result containing `COMMITTED`, `ERROR`, `OK` or `PARTIAL` over `DONE` prevented polling clients from observing completion. The response retains flattened counts/identifiers for compatibility, and existing source pollers already consume `result` when present. A pure response-contract test covers successful, validated, failed and partial outcomes. Browser tests use this real response serializer for automatic commits, error summaries and partial sync completion. No live database mutations were used for these tests.
