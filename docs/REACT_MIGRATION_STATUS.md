# React migration status — 8 October 2026

## Source and scope

Initial reference: the supplied `NewChanges-main (6)(2).zip`. The updated parity target is now NewChanges main commit `ed5a71a7cf9ee5ea5d3b337924be1db94a8a76f8` (PR #87), inspected on 8 October 2026. Reconciliation is pending; the existing React build does not yet contain all of these upstream updates. See `UPSTREAM_SOURCE.json`. Target repository: `CayelaemJ/EFS-React-Migration`. This branch starts from main commit `4df9d0016249d7287c2e3a13d1cff77cf533ce88` and imports the source application alongside the React migration. It does not merge the separately deployed `migration/fullstack-test` branch.

The goal is a fully declarative React frontend covering both employer and portfolio dashboards and all supporting pages. **That goal is not complete.** React rendering alone does not satisfy it while imperative controllers remain.

| Surface | Current implementation | Remaining work |
| --- | --- | --- |
| Sign-in, set password, contact | React components, controlled forms and request/error state | Broader authenticated backend integration verification |
| Home, privacy, terms, cookies, thank you, 404 | React JSX with shared React lifecycle behaviour | Content remains source-identical |
| Protected-page navigation and account controls | Shared React state, portals, theme persistence, mobile links, sign-out and deactivation dialog | Remove temporary controller-to-component data boundary when page controllers are replaced |
| Employer and portfolio dashboards | React JSX layout and dynamic React rendering with retained imperative controller logic | Replace controller-owned DOM/state with React components/hooks; verify all employer/portfolio permutations |
| Dashboard Quick Actions and report schedules | React components, controlled inputs, request/error state, keyboard focus lifecycle | Authenticated SMTP delivery verification |
| Administration | React JSX layout and dynamic React rendering with retained imperative controller logic | Convert reports, imports, integration, job progress and other panels to React state/components |
| User management and security centre | React JSX layout and dynamic React rendering with retained imperative controller logic | Convert editors, role/access state, security tables and telemetry to React components |
| Backend and access rules | Existing Fastify/Prisma services retained; canonical routes serve built React pages | Live database and environment integration testing before release |

## Changes needed for faithful behaviour

- Brand Engine is imported explicitly as ESM. The initial nested UMD conversion failed to populate the browser engine and used fallback colours; the fix restores original palettes and is covered by browser checks.
- Original class names, markup structure, logos and CSS are retained. Raw style formatting is preserved where existing attribute selectors require it.
- Dynamic inline actions are compiled to closures and attached through React; no runtime `eval` or HTML script execution is used.
- A malformed dashboard CSS brace, two missing login stylesheet references and ignored late font imports were repaired. The admin avatar selector now uses an explicit data attribute.
- Schedule-dialog backdrop clicks no longer close the dialog when editing an input; Quick Actions closes on Escape.
- Navigation/account menus and deactivation use React state, lifecycle cleanup, keyboard handling and error recovery.
- A queued demo number-fitting pass now checks whether live API data has replaced the demo before adjusting font sizes. This removes a timing-dependent layout difference exposed by CI Chromium.
- Static HTML access cannot bypass protected canonical routes. Legacy `/react/` links redirect to canonical routes.

## Verification and limits

The production build, frontend typecheck, source regression suite, score engine and Brand Engine checks pass. Fastify injection checks cover public React responses, anonymous protected-route redirects, static HTML restrictions, aliases, logo and health responses.

Browser verification covers all twelve page mounts; full-page screenshot comparisons at 1440px and 390px for dashboard, administration and users; navigation, theme persistence, mobile account destinations, gauge/Brand Engine, filters, portfolio, Quick Actions, schedule dialog, user editor, privileged role visibility, report selection, integration tabs and sign-in recovery. Navigation tests exercise logout and deactivation failure recovery. Schedule tests cover frequency fields, payload filters, save/retry, pause, delete, delivery errors and employer recipient restrictions. The expanded local suite has 30 tests. Screenshot checks use a 0.5% maximum differing-pixel ratio with a per-pixel threshold of 0.15; they do not establish exact pixel identity.

The browser API is mocked with local fixtures. These checks do **not** prove real database writes, SMTP delivery, external database synchronisation, live report delivery or all role/data combinations. Fonts are isolated from external network dependencies. Original HTML remains a test/reference input, not a production page entry.

The dependency audit currently reports one low and four moderate findings, with no high/critical findings at the configured gate. Dependency remediation remains separate from claims of UI parity.

## Deployment status

No Railway deployment, source-branch switch, variable change or database mutation was performed. The inspected Railway migration-test service still pointed at `migration/fullstack-test`. Repository healthcheck `/health` differs from that service's `/react/` override; reconcile it before any authorized rollout. Keep this work in draft until the remaining controllers are replaced and authenticated integration validation is complete.

## CI follow-up

The first GitHub run passed build, security, route and interaction checks, but failed the two dashboard screenshot comparisons in Chromium 145. The saved screenshots exposed the queued demo number-fitting race described above. The follow-up guards that callback; CI must pass on the updated commit before accepting this checkpoint.

## Updated upstream reference

The source must continue to track NewChanges rather than treating the original ZIP as frozen. The latest inspected main adds The Fixer branding and approved light/dark assets, Brand Engine 1.4, partner co-branding, dark-mode repairs, client dashboard preview behaviour and a greeting after login. Reconcile each change into the React-owned navigation, forms and dialogs as well as the remaining transitional pages. Do not overwrite native React work with source controllers.

Before acceptance, compare backend/API/security and source-sync services against the same pinned source commit; port relevant changes, then test against that source. Expand visual coverage to default and partner branding in light/dark mode on desktop/mobile. A change is not marked incorporated merely because it appears in this inventory.

The latest migration CI rerun still failed. The queued demo-layout guard and local passing tests are not sufficient evidence that hosted CI parity is resolved; inspect the failed run before acceptance.
