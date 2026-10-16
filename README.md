# EFS React migration

Migration initially based on **NewChanges-main (6)(2).zip**, now tracking **NewChanges main** (pinned in `docs/UPSTREAM_SOURCE.json`) into a React frontend while retaining its Fastify/Prisma backend, assets, layouts, branding and canonical routes.

**React frontend port complete; authenticated acceptance pending.** All twelve pages, both dashboards, administration and user management use declarative React. Legacy page controllers no longer run in production. The Fastify/Prisma backend incorporates NewChanges through `1ce1da97` (16 October). See [migration status](docs/REACT_MIGRATION_STATUS.md).

## Local development

Use Node 22 or newer and a PostgreSQL database. Copy `.env.example` to `.env` and supply local credentials. Never use a production database for development.

```sh
npm ci
npm run build
npm run db:deploy
npm run dev
```

`npm run build` generates Prisma, compiles the backend and installs/builds the React frontend from its lockfile. Open the backend URL printed at startup. The application serves `/dashboard`, `/admin`, `/users` and the public routes; existing backend access checks run before serving protected React pages. Compiled frontend assets are in `public/react/` and are not committed.

## Verification

```sh
npm run check:all
npm run check:react
npm run test:routes
npx playwright install chromium
npm run test:browser
```

Browser tests use local fixture servers and mocked API responses, including screenshots against the retained source HTML. They do not write to Railway or a live database. Route tests exercise Fastify directly without starting database workers. See the status document for coverage and limitations.

## Railway

The repository configuration builds with `npm run build`, starts with `npm start`, and checks `/health`. `npm run db:deploy` is the configured predeploy database step; review it against the target environment before deployment. Existing Railway service overrides can take precedence and must be reconciled during a separately authorized rollout.

Railway `migration-test` currently auto-deploys this branch under its existing configuration, including its schema-push predeploy override. The new schema additions are recorded as an additive migration. No production/source database cutover, data replacement or Railway variable/configuration change is performed here.

## Migration code

- `frontend/src/native/`: React page logic, forms, dashboards, administration, user/security management, branding and shared lifecycle effects.
- `frontend/src/parity/`: source structure converted to declarative JSX; dashboard/admin startup functions are empty.
- `frontend/src/lib/brand-engine.js`: original colour calculations exported as an ES module.
- `public/`: source/reference HTML, original static assets and generated build destination.
- `scripts/migration/port-pages.mjs`: repeatable source-to-JSX conversion. `npm run migration:generate` regenerates parity files and page entries; edit native components directly.
- `src/`, `prisma/`: retained application backend and data model.
