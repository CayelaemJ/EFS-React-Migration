/** Job lifecycle status and import outcome are separate contracts. A completed
 * upload may be COMMITTED, VALIDATED or ERROR; none may override lifecycle DONE.
 * Keep flattened fields for clients that consume counts directly, and expose
 * the complete outcome under result for the existing polling/SSE clients.
 */
export function completedJobResponse(
  result: Record<string, unknown> | undefined,
) {
  return { ...result, status: "DONE" as const, result: result ?? {} };
}
