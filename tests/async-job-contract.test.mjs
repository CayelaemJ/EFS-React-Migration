import assert from "node:assert/strict";
import { completedJobResponse } from "../dist/services/jobResponses.js";

// The poller can finish only on lifecycle DONE. All real import outcomes must
// survive inside result, including failed validation and automatic commits.
for (const status of [
  "COMMITTED",
  "VALIDATED",
  "ERROR",
  "INVALID",
  "OK",
  "PARTIAL",
  "FAILED",
]) {
  const outcome = {
    status,
    batchId: "batch-1",
    rowCount: 17,
    errorSummary: status === "ERROR" ? "Commit failed" : "",
  };
  const response = JSON.parse(JSON.stringify(completedJobResponse(outcome)));
  assert.equal(response.status, "DONE", `${status} must terminate job polling`);
  assert.deepEqual(
    response.result,
    outcome,
    "The import outcome must remain intact",
  );
  assert.equal(
    response.batchId,
    "batch-1",
    "Flattened identifiers remain compatible",
  );
}
assert.deepEqual(completedJobResponse(undefined), {
  status: "DONE",
  result: {},
});
console.log(
  "PASS: completed import/commit jobs retain lifecycle DONE and nested outcomes",
);
