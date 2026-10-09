import { execFileSync } from "node:child_process";
execFileSync(process.execPath, ["--import", "tsx", "tests/score-engine.test.ts"], { stdio: "inherit" });
