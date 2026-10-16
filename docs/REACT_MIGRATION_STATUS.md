# React migration status — 16 October 2026

The migration is **not ready for acceptance**. Dashboard and administration controllers still need conversion, and real authenticated workflows require migration-test credentials.

## Source

The supplied ZIP was based on NewChanges commit `115a28a12ddc7ea1b5effbdb0baa354824ce7841`. This checkpoint incorporates source through `528be408e07042b449f5258f23bd00702df09a20`. The newer `499a9d9598d0eced1ce8ebebb06bcaff983215c5` head observed on 15 October is 43 commits ahead of this source target and still requires reconciliation. The initial import covered 53 changed files through `ed5a71a7cf9ee5ea5d3b337924be1db94a8a76f8`; subsequent updates include partner-only custom portals and the security, permissions and branding fixes described below. Existing native React components are retained rather than replaced with upstream controllers.

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
| Portfolio dashboard | React employer selection, KPI totals, heatmap, rankings and metric explanations | Shared dashboard authentication, data-fetching, audience switch and export controllers remain; broader role/data verification |
| Employer wellness | Native React gauge, status colours, driver rows and incomplete-data handling | Shared dashboard data/theme controller still supplies snapshots |
| Remaining employer dashboard | React JSX with retained imperative calculation/render controllers | Full conversion to React state/components; broader data permutations |
| Administration reports/imports | React report selection, templates, file/drop upload progress, validation, background jobs, commit and live import history | Authenticated database import/revert verification |
| Dashboard section permissions | React visibility, role checkboxes, user grants/revocations, loading/error recovery | Authenticated permission-write verification |
| Email and automations | React controlled provider/SMTP/Resend forms, run-now actions, schedules and delivery history | Real SMTP/Resend delivery and automation verification |
| Admin audit and engagement | React critical-event ranking, date-window selection, statistics and histories | Authenticated telemetry verification |
| Admin security, compliance and MLOps | React summaries, independent register requests, alert details, polling and retry | Live telemetry and role verification |
| Enterprise operations | React summary, source/read-model placement, routes, replica status, quality detail and refresh/collapse actions | Authenticated source verification |
| Reset and rebuild | React confirmation, pending state, error recovery and dependent-panel refresh | Authenticated migration-environment verification |
| Live data integration | React controlled API/SQL/replica fields, save/test/sync/full-refresh actions, progress and history | Newer source-switch/incremental-refresh contract reconciliation and authenticated source verification |
| Partners and client preview | Native React creation/presets, branding edits, logo detection, assignments, deletion and synthetic preview | Authenticated branding and assignment verification |
| Administration shell | Retained theme, welcome, role-posture and report-manifest bootstrap | Convert remaining shell lifecycle and privileged-card visibility to React |

The users entry no longer starts the legacy users or user-security scripts. Source HTML remains a reference fixture. Default Admin/Superadmin shells use The Fixer; custom partner dashboards show the partner identity alone, matching the latest source product decision.

## Verification

The prior checkpoint passed all 35 local browser checks and hosted GitHub CI. The report checkpoint passed all 40 local browser checks; the fitting follow-up passes 41, including five report/import/sync workflow tests and live fitting after filter changes. The production build, upstream regression suite, typecheck, completed-job response contract and Fastify route/access checks also pass. Hosted CI on `9c83adec7b1e657c6cff3497e718f18cdbc1a0a3` passed all 41 browser checks, including visible cards after settling reveal animations. The section-permissions checkpoint adds populated-panel visual coverage and two permission/recovery workflows; hosted CI is rerun before acceptance. Browser coverage includes twelve mounts, dashboard/admin/users full-page comparisons at 1440px and 390px, navigation/account actions, portfolio and filters, schedules, controlled user creation/editing with failure recovery, security filtering/profile/alerts and partner light/dark shell rules. API responses are mocked. These tests do not prove real database writes, external source sync, SMTP delivery or all role/data combinations.

The screenshot gate remains a maximum differing-pixel ratio of 0.5%, with per-pixel threshold 0.15. It is not a claim of exact pixel identity. Fonts are isolated from external network dependencies. The intermittent dashboard difference was traced to number fitting increasing labels smaller than its minimum and running inconsistently after live renders. Fitting now cannot enlarge the CSS font size, runs after data renders, and ignores height-only resize events. The live-data branch now explicitly schedules fitting before returning. Screenshot checks wait for live data, font readiness and two layout frames, and retain layout diagnostics; hosted CI remains the acceptance gate.

## Railway and publication

At the earlier Railway inspection, the migration-test app was healthy at `https://efs-react-migration-migration-test.up.railway.app`. The inspected deployment is `d73e4d9b-fc5a-4dad-b7af-0b54bb86036e` (SUCCESS). At that inspection it followed `migration/newchanges-react-parity`, has `/health` configured, and uses a service-level `prisma db push` predeploy override. No Railway configuration, variables or database data were changed by this checkpoint.

This checkpoint uses `migration/newchanges-upstream-react` to avoid automatically deploying unfinished work from the service's tracked branch. Main is not merged. Railway OAuth exposes variable names with values redacted; no migration database URL or admin password is available for authenticated testing. Health and anonymous authentication responses were checked, but authenticated database/Railway workflows remain unverified.

## Administration report checkpoint

Report selection, template downloads, drag/drop and file uploads, request progress, validation previews/errors, asynchronous commit jobs and import history are now rendered from React state. The generated production controller no longer contains the old report picker, upload, commit, revert or history renderer. Remaining administration panels use a temporary manifest/history-refresh boundary; their existing source contracts are preserved. SSE provides immediate progress while polling verifies final job state and handles unavailable streams. Component cleanup stops progress streams, polling timers and requests. Validation cells render text through React. Report and upload errors have separate state so an upload error cannot erase the report selector.

Completed upload, commit and sync job responses now keep lifecycle status `DONE` separate from the nested import/sync outcome. Previously spreading a result containing `COMMITTED`, `ERROR`, `OK` or `PARTIAL` over `DONE` prevented polling clients from observing completion. The response retains flattened counts/identifiers for compatibility, and existing source pollers already consume `result` when present. A pure response-contract test covers successful, validated, failed and partial outcomes. Browser tests use this real response serializer for automatic commits, error summaries and partial sync completion. No live database mutations were used for these tests.

## Section-permissions checkpoint

The Dashboard Sections panel now renders visibility, allowed roles and individual access overrides from React state. Its source controller, template-event bindings and optional legacy loader have been removed from the production entry. Server responses remain the source of truth: failed writes retain the previous settings and show an error; grants retain their selection until success. Requests are aborted on unmount and saves are serialized to prevent competing role/visibility writes. Existing role entries that have no UI checkbox are preserved. Operational admins do not fetch or display this panel. The section API now enforces the privileged-control boundary on all four endpoints, matching its existing UI visibility. Ordinary admins and non-admin roles receive a generic access-denied response; unauthenticated requests receive 401. Fastify route tests exercise the real session resolver with isolated records, prove rejected requests do not read section data, and verify privileged reads succeed. Populated source/React panel comparisons cover desktop and mobile. Live permission writes remain unverified.

## Email and automation checkpoint

System Email, scheduled-report listings, delivery history and automation settings/actions now use React state and preserve the original NewChanges layout. The legacy email draft, settings loader/save/test, automation and history controllers are removed from production. The generator produces a declarative layout with controlled inputs and option values; static styles no longer require imperative attribute updates in these panels. Responsive and dark-mode overrides use stable classes rather than depending on HTML style-string formatting. Failed operations retain drafts; successful settings saves clear submitted credential fields. Automation actions and delivery tests refresh status/history without overwriting unrelated edits. Empty credential fields are omitted to retain server-side secrets. Requests are aborted on unmount and competing writes are prevented. Schedule/delivery values are rendered as text. Browser coverage adds save-failure recovery, credential clearing, provider switching, all three run-now kinds, load retry, escaped delivery content, and source dark-mode geometry/colour checks at desktop/mobile sizes. SMTP/Resend delivery, Slack, account deactivation, database writes and scheduled jobs have not been exercised against a live environment.

## Portfolio and admin insights checkpoint

NewChanges remains at `19f32c1905371ea8868eef82a6078c4439c93300`, rechecked on 12 October. Portfolio employer filters, selection, KPI aggregation, heatmap cells, league sorting and metric definitions now render directly from React state. The original calculations and missing-data rules are retained: unavailable measures are excluded from averages/rankings, risk measures rank highest risk first, and one-employer heatmap columns remain neutral. A late portfolio response updates an already-open view; explicit demo mode is required before seeded employers can be displayed. The shared dashboard still supplies the data snapshot and owns authentication, fetching, audience switching and export. Employer rendering remains transitional.

Admin audit, engagement, security summaries, compliance registers and MLOps alerts are native React. Critical audit changes still take priority over recency with five displayed entries and full CSV export. Requests check status, abort on cleanup, and expose retry; changing engagement windows cancels the old request. Compliance register failures remain independent and no longer overwrite the security summary. Security/compliance summaries refresh every 30 seconds while visible. MLOps uses the latest gate per dataset and prioritises quarantine over advisory review, with escaped findings. The remaining reset controller notifies React to refresh these panels after reset.

New browser coverage exercises portfolio selection/missing measures/risk ordering, delayed responses, critical audit ranking, engagement recovery/window changes, independent register recovery and MLOps priority/escaped content. Portfolio screenshots compare desktop/mobile layouts in light and dark themes at the existing 0.5% gate. Mobile captures select the portfolio at desktop width before resizing because the source hides its audience switch on small screens; this is not proof of mobile audience navigation. GitHub CI is rerun on the published checkpoint. No live database, delivery or Railway changes are part of this checkpoint.

## October 13 source reconciliation and wellness/enterprise conversion

The source target for this checkpoint is `528be408e07042b449f5258f23bd00702df09a20`. Its 25 commits after `19f32c1` are reconciled: preserved section permission defaults, session invalidation before access changes, malformed-password-hash handling, per-request API destination validation, TLS-termination-aware origin checks, privacy notice additions, source history, gauge status colours and fixed default Admin/Superadmin branding across partner filters/theme changes. Migration-specific React routes, section API guards and completed-job responses are retained. Source section UI fixes are covered by the existing native React save/error flow rather than restarting legacy code.

The request-origin contract test exposed an upstream cookie-hook ordering issue: this onRequest check may run before request cookies are populated. It now falls back to the cookie plugin's header parser. Isolated Fastify tests verify matching external HTTPS origins, reject foreign origins and reject missing-origin cookie requests. Runtime tests exercise invalid password hashes, repeated section initialisation without overwriting saved roles, and session invalidation before a failed access-change write. No live records are changed.

Wellness now renders its gauge, driver rows, RAG state and unavailable values with React, retaining the source colour tokens in light/dark themes. Enterprise operations now owns its four reads, refresh/collapse controls, quality detail, route rows and replica status in React. Its failures remain visible and recover through Refresh.

On 14 October, NewChanges advanced again to `348cf2e1bdf8084d5d19115c571563d9f08efd12` (24 further commits). That newer Neon/shared-database, refresh and semantic-layer delta is **not incorporated in this checkpoint** and requires a separate reconciliation. This checkpoint must not be described as current with that source head or as ready for deployment.

## October 14 reset conversion

The reset-and-rebuild panel now owns its confirmation input, visibility, pending state and response messages in React. Both typed RESET and the confirmation dialog remain required. While the request is running, the submit, reopen and cancel actions are disabled to prevent duplicate submissions. Failed requests preserve the confirmation for retry, and API error text is escaped. Success clears the native report result and refreshes import history, governance and the remaining integration panel through a temporary data-refresh bridge. Optional refresh failures cannot overwrite the published-success result. No reset has been executed against a real database.

The preceding `e5636077b3cd79bf3cb946225ba0402dbc8353b7` checkpoint passed hosted CI run `38535141081`, including all 60 browser checks. This follow-up adds a mocked reset workflow covering invalid confirmation, dialog cancellation, pending controls, failure/retry and success.

## October 15 native integration checkpoint

The API/SQL integration form, source-mode tabs, collapse control, environment notices, save/test actions, sync jobs, refresh action and sync history now render from React state. The production controller no longer contains integrationDraft, saveInteg, testInteg, syncNow, refreshNow, loadIntegLogs or the legacy pollJob renderer. Import and integration jobs share the native progress display and abortable monitor. Reset and ingestion-method shortcuts use small refresh/mode bridges without mutating native fields.

Failed writes retain draft values and credentials; successful writes clear both secret inputs. Blank credentials are omitted from subsequent payloads. A failed settings save prevents a sync request, and zero replica lag remains zero. Background reads update status without overwriting a user's draft. Loading failures expose retry, and all write actions are locked while another operation is pending.

The source head `499a9d9` adds candidate-source preview/staging and changes normal refresh into an incremental operation. Those controls are not enabled here because their required backend reconciliation is pending. This checkpoint intentionally preserves the migration backend's existing **confirmed full-refresh** contract. It must not be presented as matching the newer source behaviour. New source database/refresh/semantic-layer and CI changes still require reconciliation as a complete contract.

Hosted CI run `38535911551` passed for reset checkpoint `2c328d8d3ab58e040c17cdc6f59673474614b63e`. Integration verification adds failure/retry and credential handling, save-before-sync gating, confirmation/already-running handling, sync progress/terminal failure and desktop/mobile dark-form comparisons. API responses are mocked; no live integration, reset or database writes were performed.

## October 16 partner and preview conversion

Partner creation, presets, controlled branding fields, logo uploads, user/employer assignments, deletion and collapse now belong to React. All mutations check HTTP status and display escaped server errors. Failed edits keep their draft. A failed logo/preset second step resumes the existing partner rather than creating a duplicate. Existing-partner logo failures expose a retry action using the same selected file. Assignment failures retain unfinished choices, and read failures preserve existing cards/drafts with retry. Logo extraction and learning use the existing Brand Engine and payload contract.

The synthetic client dashboard preview is generated as JSX from the source template, including its driver/funnel rows. It no longer renders through HTML strings. React owns its partner/theme state, modal visibility, body-scroll restoration, Escape/backdrop dismissal and focus containment/restoration. Preview-only action buttons explain that reports/exports require the live dashboard; they do not create real schedules or exports from synthetic data.

The previous integration checkpoint `36010a83aedc24b47972189072a296d52dcd2464` passed hosted CI run `38748452663`. New partner coverage exercises mutations/failure recovery, duplicate prevention, assignment choices, large-file rejection and modal keyboard behaviour, plus populated panel/preview visual comparisons at desktop/mobile sizes in light/dark themes. The same 0.5% visual gate is retained. APIs are mocked; live partner writes, logo storage and assignments remain unverified.

NewChanges main was rechecked on 16 October and remains `499a9d9598d0eced1ce8ebebb06bcaff983215c5`. The pending 43-commit backend/schema/source-activation delta remains outside this checkpoint. No database schema changes or Railway actions were executed.

Local verification for this checkpoint: all 76 browser checks passed before the final logo retry refinement; the affected creation/edit checks and added same-file logo retry then passed with the rebuilt frontend. Hosted CI runs the complete 77-test suite for the published commit.
