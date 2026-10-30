# EFS React Migration

Dedicated React migration and frontend enhancement workspace for EFS Optimise.

**Safety boundary:** this repository is for migration/testing. It does not replace production in `CayelaemJ/NewChanges`.

## Stack
- React 19 + Vite 7 + TypeScript
- Tailwind CSS 4 as the primary utility/layout layer
- Recharts for data visualisation
- Material UI used selectively, not as the visual system
- Existing dashboard, Executive Insight, gauge, comparisons and administration flows as the migration baseline
- BrandEngine-compatible tenant branding and chart palette hooks

## Design direction
Preserve the established EFS visual language while making the portal cleaner and more deliberate:
- no purple/indigo AI gradients or ambient glow effects
- no decorative sparkle/generic icon clutter
- restrained neutral surfaces and high-contrast typography
- serif display headings with tighter leading
- relaxed body typography
- strong alignment, dividers and structured sections
- BrandEngine remains authoritative for tenant colours and chart palettes
- Tailwind is the normal React styling layer; MUI is selective

## Local development
```bash
npm install
npm run dev
```

Vite proxies `/api` and `/static` to the existing Node/Fastify backend at `localhost:3000`.

## Quality gates
```bash
npm run check
npm run build
```

## Railway test deployment
This repository is intended to have its own Railway test service. Production remains on the existing application until React reaches functional and visual parity.

Build: `npm install && npm run build`  
Start: `npm start`  
Port: Railway's `PORT` variable.

The current React app expects the existing Fastify API for authenticated data. A complete production-style deployment therefore needs the frontend and backend served together or an explicitly configured same-origin API gateway.

## Migration completion gate
React is not ready to replace `/dashboard` until:
1. Dashboard visual parity is verified.
2. Executive Insight and the gauge work with real data.
3. Charts/comparisons work across desktop/mobile.
4. Employer, portfolio and admin flows work by role.
5. BrandEngine preserves tenant branding and readability.
6. Dark mode works consistently.
7. Tailwind styling is consolidated rather than duplicated.
8. Accessibility, typecheck, build and regression checks pass.
9. Railway test deployment is healthy.
10. A rollback path is retained before production cutover.

## Repository relationship
- Production/source of truth: `CayelaemJ/NewChanges`
- React migration/test: `CayelaemJ/EFS-React-Migration`

No production merge is implied by work in this repository.
