import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

// Temporary boundary for administration panels that still read the report
// contract. Rendering, selection, uploads and import history belong to React.
let manifestState = { manifest: null, error: "", loading: false },
  manifestCallback = null;
const listeners = new Set(),
  historyRefreshers = new Set();
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
function publish(value) {
  manifestState = { ...manifestState, ...value };
  listeners.forEach((listener) => listener());
}
async function request(path, options = {}) {
  const response = await fetch(path, { cache: "no-store", ...options });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    location.href = "/login";
    throw new Error("Session expired");
  }
  if (!response.ok)
    throw new Error(data?.error || `server error ${response.status}`);
  return { data, status: response.status };
}
export async function initializeReports(onManifest = manifestCallback) {
  manifestCallback = onManifest;
  publish({ loading: true, error: "" });
  try {
    const { data } = await request("/api/admin/reports");
    if (
      !Array.isArray(data.loadOrder) ||
      !Array.isArray(data.reports) ||
      data.loadOrder.some(
        (key) => !data.reports.some((report) => report.key === key),
      )
    )
      throw new Error("Reports API returned an invalid report manifest");
    onManifest?.(data);
    publish({ manifest: data, loading: false });
    return data;
  } catch (error) {
    publish({ error: error.message, loading: false });
    throw error;
  }
}
export function refreshImportHistory() {
  return Promise.allSettled([...historyRefreshers].map((refresh) => refresh()));
}
const Context = createContext(null);
function number(value) {
  return Number(value || 0).toLocaleString("en-ZA");
}
function sleep(delay, signal) {
  return new Promise((resolve, reject) => {
    const aborted = () => {
      clearTimeout(timer);
      reject(new DOMException("Cancelled", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", aborted);
      resolve();
    }, delay);
    signal.addEventListener("abort", aborted, { once: true });
    if (signal.aborted) aborted();
  });
}
async function monitorJob(path, label, onProgress, signal) {
  const read = async () => {
    const { data } = await request(path, { signal });
    if (data.status === "FAILED")
      throw new Error(data.error || `${label} failed`);
    if (data.status === "DONE") return data.result || data;
    onProgress(data);
    return null;
  };
  const started = Date.now();
  let completed = await read();
  if (completed) return completed;
  // SSE provides immediate row/progress updates; polling also verifies final
  // state and remains available when a proxy cannot keep the stream open.
  let source = null;
  if (window.EventSource) {
    const jobId = path.split("/").pop();
    source = new EventSource(
      "/api/admin/events?jobId=" + encodeURIComponent(jobId),
    );
    source.addEventListener("job.progress", (event) => {
      if (signal.aborted) return;
      try {
        onProgress(JSON.parse(event.data));
      } catch {}
    });
    source.onerror = () => {
      source?.close();
      source = null;
    };
  }
  const close = () => {
    source?.close();
    source = null;
  };
  signal.addEventListener("abort", close, { once: true });
  try {
    while (Date.now() - started < 30 * 60 * 1000) {
      await sleep(1500, signal);
      completed = await read();
      if (completed) return completed;
    }
    throw new Error(
      `${label} is still running after 30 minutes. Import history continues to update automatically.`,
    );
  } finally {
    close();
    signal.removeEventListener("abort", close);
  }
}
function uploadFile(report, file, onProgress, signal) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(),
      form = new FormData();
    form.append("file", file);
    xhr.open(
      "POST",
      "/api/admin/reports/" + encodeURIComponent(report.key) + "/upload",
      true,
    );
    xhr.withCredentials = true;
    xhr.timeout = 5 * 60 * 1000;
    const abort = () => xhr.abort();
    signal.addEventListener("abort", abort, { once: true });
    const finish = (handler, value) => {
      signal.removeEventListener("abort", abort);
      handler(value);
    };
    xhr.upload.addEventListener("progress", (event) =>
      onProgress({
        progress: event.lengthComputable
          ? Math.round((event.loaded / event.total) * 100)
          : 0,
        phase: event.lengthComputable
          ? `Uploading ${Math.round((event.loaded / 1024 / 1024) * 10) / 10} MB of ${Math.round((event.total / 1024 / 1024) * 10) / 10} MB`
          : "Uploading…",
        message: "Uploading " + file.name,
        upload: true,
      }),
    );
    xhr.onload = () => {
      let data = {};
      try {
        data = JSON.parse(xhr.responseText || "{}");
      } catch {}
      if (xhr.status >= 200 && xhr.status < 300)
        finish(resolve, { data, status: xhr.status });
      else
        finish(reject, new Error(data?.error || `server error ${xhr.status}`));
    };
    xhr.onerror = () =>
      finish(reject, new Error("network error while uploading the file"));
    xhr.ontimeout = () => finish(reject, new Error("upload timed out"));
    xhr.onabort = () =>
      finish(reject, new DOMException("upload cancelled", "AbortError"));
    xhr.send(form);
    if (signal.aborted) abort();
  });
}
export function AdminReportsProvider({ children }) {
  const contract = useSyncExternalStore(subscribe, () => manifestState);
  const [selected, setSelected] = useState(""),
    [result, setResult] = useState(null),
    [progress, setProgress] = useState(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const task = useRef(null);
  useEffect(() => () => task.current?.abort(), []);
  const current = contract.manifest?.reports.find(
    (report) => report.key === selected,
  );
  function select(key) {
    if (task.current) return;
    setSelected(key);
    setResult(null);
    setProgress(null);
    setError("");
  }
  async function run(operation) {
    if (task.current) return;
    const abort = new AbortController();
    task.current = abort;
    setBusy(true);
    setError("");
    setResult(null);
    try {
      await operation(abort.signal);
    } catch (e) {
      if (!abort.signal.aborted) {
        setProgress(null);
        setError(e.message);
      }
    } finally {
      if (task.current === abort) {
        task.current = null;
        if (!abort.signal.aborted) setBusy(false);
      }
    }
  }
  function upload(file) {
    if (!file || !current) return;
    const report = current;
    return run(async (signal) => {
      setProgress({
        message: "Uploading " + file.name,
        phase: "Preparing upload…",
        progress: 0,
        upload: true,
      });
      const response = await uploadFile(report, file, setProgress, signal);
      let value = response.data;
      if (response.status === 202 && value.jobId)
        value = await monitorJob(
          "/api/admin/upload-jobs/" + encodeURIComponent(value.jobId),
          "Importing",
          setProgress,
          signal,
        );
      if (signal.aborted) return;
      setProgress(null);
      setResult({ kind: "upload", value });
      await refreshImportHistory();
    }).catch(() => {});
  }
  function commit(batchId) {
    return run(async (signal) => {
      setProgress({
        message: "Committing & recomputing scores…",
        phase: "PROCESSING",
        progress: 0,
      });
      try {
        const response = await request(
          "/api/admin/batches/" + encodeURIComponent(batchId) + "/commit",
          { method: "POST", signal },
        );
        let value = response.data;
        if (response.status === 202 && value.jobId)
          value = await monitorJob(
            "/api/admin/commit-jobs/" + encodeURIComponent(value.jobId),
            "Committing",
            setProgress,
            signal,
          );
        if (signal.aborted) return;
        setProgress(null);
        setResult({ kind: "commit", value });
        await refreshImportHistory();
      } catch (e) {
        throw new Error(
          `Commit failed: ${e.message}. Check Import history before retrying so you do not duplicate the import.`,
        );
      }
    });
  }
  return (
    <Context.Provider
      value={{
        ...contract,
        manifestError: contract.error,
        current,
        selected,
        select,
        upload,
        commit,
        result,
        progress,
        error,
        busy,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function ReportPicker() {
  const {
    manifest,
    manifestError: error,
    loading,
    selected,
    select,
    busy,
  } = useContext(Context);
  return (
    <div className="card-bd" id="rep-list">
      {error ? (
        <p className="muted" role="alert">
          Could not load the report list: {error}.{" "}
          <button
            className="btn btn-sm"
            disabled={loading}
            onClick={() => initializeReports().catch(() => {})}
          >
            Retry
          </button>
        </p>
      ) : (
        manifest?.loadOrder.map((key, i) => {
          const report = manifest.reports.find((r) => r.key === key);
          return (
            <div
              key={key}
              className={"rep" + (selected === key ? " on" : "")}
              data-key={key}
              role="button"
              tabIndex={busy ? -1 : 0}
              aria-disabled={busy}
              onClick={() => select(key)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  select(key);
                }
              }}
            >
              <span className="step">STEP {i + 1}</span>
              <span className="t">{report.title}</span>
            </div>
          );
        })
      )}
    </div>
  );
}
function Preview({ rows }) {
  if (!rows?.length) return null;
  const columns = Object.keys(rows[0]);
  return (
    <div className="err-list" style={{ marginTop: 12 }}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((column) => (
                <td key={column}>{String(row[column] ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function JobProgress({ value }) {
  const detail = value.detail || {},
    pieces = [],
    pct = Math.max(0, Math.min(100, Number(value.progress) || 0));
  if (detail.reportKey)
    pieces.push(
      `Feed ${detail.reportKey}${detail.feedIndex && detail.feedCount ? ` · ${detail.feedIndex}/${detail.feedCount}` : ""}`,
    );
  if (detail.sourceTotalRows != null)
    pieces.push(`Source view: ${number(detail.sourceTotalRows)} rows`);
  if (detail.pulledRows != null)
    pieces.push(`Pulled: ${number(detail.pulledRows)}`);
  if (detail.validatedRows != null)
    pieces.push(`Validated: ${number(detail.validatedRows)}`);
  if (detail.committedRows != null)
    pieces.push(`Processed live: ${number(detail.committedRows)}`);
  if (
    detail.inserted != null ||
    detail.updated != null ||
    detail.deleted != null
  )
    pieces.push(
      `+${number(detail.inserted)} new · ~${number(detail.updated)} updated · -${number(detail.deleted)} deleted` +
        (Number(detail.historyRows) > 0
          ? ` · ${number(detail.historyRows)} dated history observation(s)`
          : Number(detail.skipped) > 0
            ? ` · ${number(detail.skipped)} stale skipped`
            : ""),
    );
  return (
    <div className="job-progress" role="status">
      <strong>{value.message || "Importing"}</strong>
      <div className="job-progress-track">
        <div
          id={value.upload ? "upload-progress-fill" : undefined}
          className="job-progress-fill"
          style={{ width: pct + "%" }}
        />
      </div>
      <div className="job-progress-meta">
        <span id={value.upload ? "upload-progress-label" : undefined}>
          {value.phase || "PROCESSING"}
        </span>
        <strong id={value.upload ? "upload-progress-value" : undefined}>
          {pct}%
        </strong>
      </div>
      {pieces.length > 0 && (
        <div className="job-progress-detail">{pieces.join(" · ")}</div>
      )}
    </div>
  );
}
function ImportResult() {
  const { result, progress, error, commit, busy } = useContext(Context);
  if (progress) return <JobProgress value={progress} />;
  if (error)
    return (
      <div className="banner err" role="alert">
        ✕{" "}
        {error.startsWith("Commit failed:")
          ? error
          : "Upload could not complete: " + error}
      </div>
    );
  if (!result) return null;
  const res = result.value;
  if (res?.status === "ERROR")
    return (
      <div className="banner err" role="alert">
        ✕{" "}
        {res.errorSummary ||
          "Import failed. Check Import history before retrying."}
      </div>
    );
  if (result.kind === "commit")
    return (
      <div className="banner ok" role="status">
        ✓ Committed. Recomputed {res.touchedEmployers?.length || 0} employer
        dashboard(s) for period <strong>{res.period || ""}</strong>.
      </div>
    );
  if (res.status === "COMMITTED")
    return (
      <>
        <div className="banner ok" role="status">
          ✓ Imported <strong>{res.rowCount}</strong> rows successfully.
          Dashboards are now up to date for <strong>{res.period || ""}</strong>.
        </div>
        <Preview rows={res.preview} />
        <div className="row section-gap">
          <span className="muted">
            Inserted {res.inserted || 0} · Updated {res.updated || 0} · Deleted{" "}
            {res.deleted || 0} · Skipped {res.skipped || 0}
          </span>
        </div>
      </>
    );
  if (res.status === "VALIDATED")
    return (
      <>
        <div className="banner ok" role="status">
          ✓ Validated <strong>{res.rowCount}</strong> rows. The import is ready
          to commit.
        </div>
        <Preview rows={res.preview} />
        <div className="row section-gap">
          <button
            className="btn btn-green"
            disabled={busy}
            onClick={() => commit(res.batchId)}
          >
            Commit &amp; recompute scores
          </button>
        </div>
      </>
    );
  return (
    <>
      <div className="banner err" role="alert">
        ✕ {res.errorCount || 0} problem(s) found across {res.rowCount || 0}{" "}
        rows. Nothing was loaded. Fix the file and re-upload.
      </div>
      {res.missingColumns?.length > 0 && (
        <div className="muted" style={{ marginTop: 8 }}>
          Missing required columns: <code>{res.missingColumns.join(", ")}</code>
        </div>
      )}
      <div className="err-list">
        <table>
          <thead>
            <tr>
              <th>Row</th>
              <th>Column</th>
              <th>Value</th>
              <th>Problem</th>
            </tr>
          </thead>
          <tbody>
            {res.errors?.map((e, i) => (
              <tr key={i}>
                <td>row {e.row}</td>
                <td>{e.column}</td>
                <td>
                  <code>{String(e.value ?? "")}</code>
                </td>
                <td>{e.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export function ReportWorkspace() {
  const { current, upload, busy } = useContext(Context);
  const input = useRef(null);
  const [over, setOver] = useState(false);
  return (
    <div className="card">
      <div className="card-hd">
        <h2 id="rep-title">{current?.title || "Select a report"}</h2>
        <div className="note" id="rep-note">
          {current?.description || "Choose a report on the left to begin."}
        </div>
      </div>
      <div className="card-bd" id="work">
        {!current ? (
          <p className="muted">
            Pick a report to see its format, download a template, and upload a
            file.
          </p>
        ) : (
          <>
            <div className="row">
              <button
                className="btn"
                onClick={() => {
                  location.href =
                    "/api/admin/reports/" +
                    encodeURIComponent(current.key) +
                    "/template?fmt=csv";
                }}
              >
                ↓ CSV template
              </button>
              <button
                className="btn"
                onClick={() => {
                  location.href =
                    "/api/admin/reports/" +
                    encodeURIComponent(current.key) +
                    "/template?fmt=xlsx";
                }}
              >
                ↓ Excel template
              </button>
              <span className="muted">
                Natural key: <code>{current.naturalKey.join(" + ")}</code>
              </span>
            </div>
            <div
              className={"drop" + (over ? " over" : "")}
              id="drop"
              role="button"
              tabIndex={busy ? -1 : 0}
              aria-disabled={busy}
              onClick={() => {
                if (!busy) input.current?.click();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (!busy) input.current?.click();
                }
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                setOver(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setOver(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setOver(false);
                if (!busy) upload(e.dataTransfer.files[0]);
              }}
            >
              <div className="big">Drop a file here or click to browse</div>
              <div className="sm">
                CSV, Excel (.xlsx or .xls) or JSON · up to 50 MB
              </div>
              <input
                ref={input}
                id="file"
                type="file"
                className="hidden"
                disabled={busy}
                accept=".csv,.xlsx,.xls,.json"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  upload(e.target.files[0]);
                  e.target.value = "";
                }}
              />
            </div>
            <div id="result">
              <ImportResult />
            </div>
            <details className="section-gap">
              <summary
                className="muted"
                style={{ cursor: "pointer", fontWeight: 700 }}
              >
                View format ({current.fields.length} columns)
              </summary>
              <table style={{ marginTop: 10 }}>
                <thead>
                  <tr>
                    <th>Column</th>
                    <th>Type</th>
                    <th>Req</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {current.fields.map((f) => (
                    <tr key={f.name}>
                      <td>
                        <strong>{f.name}</strong>
                        {f.unit && (
                          <>
                            {" "}
                            <code>{f.unit}</code>
                          </>
                        )}
                      </td>
                      <td>{f.type}</td>
                      <td>
                        <span className={"tag " + (f.required ? "req" : "opt")}>
                          {f.required ? "required" : "optional"}
                        </span>
                      </td>
                      <td className="field-desc">
                        {f.description}
                        {f.allowed && (
                          <>
                            <br />
                            <code>{f.allowed.join(" · ")}</code>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </>
        )}
      </div>
    </div>
  );
}
function historyDetail(batch) {
  const total = Number(batch.rowCount || 0),
    inserted = Number(batch.insertedCount || 0),
    updated = Number(batch.updatedCount || 0),
    deleted = Number(batch.deletedCount || 0),
    applied = inserted + updated + deleted;
  const committing = batch.status === "VALIDATED" && applied > 0,
    authoritative = String(batch.uploadedBy || "").includes("(full-refresh)"),
    historical = ["employees", "debt_accounts", "policies"].includes(
      batch.reportKey,
    ),
    remainder = batch.status === "COMMITTED" ? Math.max(0, total - applied) : 0;
  let detail = "rows";
  if (batch.status === "VALIDATED" && applied === 0)
    detail = "validated · 0 current-projection changes applied yet";
  else if (committing)
    detail = `${number(applied)} current-projection change(s) applied so far`;
  else if (batch.status === "COMMITTED")
    detail = historical
      ? `processed from source · +${number(inserted)} current new · ~${number(updated)} current rewritten · -${number(deleted)} deleted · ${number(remainder)} dated observation(s) retained in history${authoritative ? " · authoritative rebuild" : ""}`
      : `processed from source · +${number(inserted)} new · ~${number(updated)} rewritten · -${number(deleted)} deleted${remainder > 0 && !authoritative ? ` · ${number(remainder)} stale skipped` : ""}${authoritative ? " · authoritative rebuild" : ""}`;
  return {
    detail,
    committing,
    status: committing ? "COMMITTING" : batch.status,
    label: committing
      ? "COMMITTING"
      : batch.status === "VALIDATED"
        ? "VALIDATED · NOT LIVE"
        : batch.status,
  };
}
export function ImportHistoryRows() {
  const { manifest } = useContext(Context);
  const [batches, setBatches] = useState([]),
    [error, setError] = useState(""),
    [busy, setBusy] = useState("");
  const pending = useRef(false);
  const historyAbort = useRef(null);
  const refresh = useCallback(async () => {
    if (pending.current) return;
    pending.current = true;
    try {
      const { data } = await request("/api/admin/batches", {
        signal: historyAbort.current?.signal,
      });
      setBatches(Array.isArray(data) ? data : []);
      setError("");
    } catch (e) {
      if (e.name !== "AbortError") setError(e.message);
    } finally {
      pending.current = false;
    }
  }, []);
  useEffect(() => {
    if (!manifest) return;
    historyAbort.current = new AbortController();
    historyRefreshers.add(refresh);
    refresh();
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") refresh();
    }, 1500);
    return () => {
      clearInterval(timer);
      historyRefreshers.delete(refresh);
      historyAbort.current?.abort();
    };
  }, [manifest, refresh]);
  async function revert(id) {
    if (
      !confirm(
        "Revert this import? Only rows that can be safely rolled back will be removed.",
      )
    )
      return;
    setBusy(id);
    try {
      await request(
        "/api/admin/batches/" + encodeURIComponent(id) + "/revert",
        { method: "POST" },
      );
      await refresh();
      alert("Import reverted successfully.");
    } catch (e) {
      alert(`Could not revert this import: ${e.message}`);
    } finally {
      setBusy("");
    }
  }
  return (
    <tbody id="hist-body">
      {error ? (
        <tr>
          <td
            colSpan={7}
            className="muted"
            style={{ padding: "16px 10px", color: "#b5391f" }}
            role="alert"
          >
            Could not load import history: {error}
          </td>
        </tr>
      ) : !batches.length ? (
        <tr>
          <td colSpan={7} className="muted" style={{ padding: "16px 10px" }}>
            No imports yet.
          </td>
        </tr>
      ) : (
        batches.map((batch) => {
          const info = historyDetail(batch);
          return (
            <tr key={batch.id}>
              <td>
                {manifest?.reports.find(
                  (report) => report.key === batch.reportKey,
                )?.title || batch.reportKey}
              </td>
              <td className="muted">{batch.filename}</td>
              <td>
                <strong>{number(batch.rowCount)}</strong>
                <span
                  className={
                    "history-row-detail" + (info.committing ? " live" : "")
                  }
                >
                  {info.detail}
                </span>
              </td>
              <td>
                <span className={"st " + info.status}>{info.label}</span>
              </td>
              <td className="muted">
                {batch.committedAt || batch.uploadedAt
                  ? new Date(
                      batch.committedAt || batch.uploadedAt,
                    ).toLocaleString("en-ZA", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"}
              </td>
              <td>
                <a
                  className="btn btn-ghost"
                  style={{
                    padding: "5px 11px",
                    fontSize: 12,
                    display: "inline-block",
                  }}
                  href={
                    "/api/admin/batches/" +
                    encodeURIComponent(batch.id) +
                    "/download"
                  }
                  download
                >
                  Download CSV
                </a>
              </td>
              <td>
                {batch.status === "COMMITTED" && batch.revertable ? (
                  <button
                    className="btn btn-ghost"
                    style={{ padding: "5px 11px", fontSize: 12 }}
                    disabled={busy === batch.id}
                    onClick={() => revert(batch.id)}
                  >
                    Revert
                  </button>
                ) : batch.status === "COMMITTED" ? (
                  <span
                    className="muted"
                    style={{ fontSize: 11 }}
                    title={
                      batch.revertReason ||
                      "This batch cannot be safely reverted."
                    }
                  >
                    Not reversible
                  </span>
                ) : null}
              </td>
            </tr>
          );
        })
      )}
    </tbody>
  );
}
