import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { PortfolioLayout } from "../parity/portfolio-layout.jsx";

let snapshot = null;
const listeners = new Set();
export function updatePortfolio(data, definitions) {
  snapshot = {
    ...data,
    employers: data.live || data.explicitDemo ? [...data.employers] : [],
    definitions,
  };
  listeners.forEach((fn) => fn());
}
const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const finite = (v) =>
  v !== null && v !== undefined && v !== "" && Number.isFinite(Number(v))
    ? Number(v)
    : null;
const employerKey = (e, i) => String(e.id || e.name || `employer-${i}`);
const money = (v) => "R " + Math.round(v).toLocaleString("en-ZA");
function format(metric, value) {
  const n = finite(value);
  if (n === null) return "Not available";
  if (metric.unit === "R") return money(n);
  if (metric.unit === "%") return Math.round(n) + "%";
  if (metric.unit === "/5") return n.toFixed(1);
  if (metric.unit === "n") return Math.round(n).toLocaleString("en-ZA");
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
function colour(metric, value, values) {
  const n = finite(value),
    clean = values.map(finite).filter((v) => v !== null);
  if (n === null || clean.length < 2)
    return { background: "var(--brand-soft)", color: "#5d6570" };
  const min = Math.min(...clean),
    max = Math.max(...clean);
  let t = max === min ? 0.5 : (n - min) / (max - min);
  if (!metric.goodHigh) t = 1 - t;
  const stops = [
      [224, 73, 47],
      [232, 145, 12],
      [31, 164, 99],
    ],
    a = t < 0.5 ? 0 : 1,
    k = t < 0.5 ? t / 0.5 : (t - 0.5) / 0.5;
  const rgb = stops[a].map((v, i) => Math.round(v + (stops[a + 1][i] - v) * k));
  return {
    background: `rgba(${rgb.join(",")},0.16)`,
    color: t < 0.4 ? "#b5371f" : t > 0.7 ? "#137a47" : "#9a6206",
  };
}
export function Info({ name, definitions }) {
  const [anchor, setAnchor] = useState(null),
    [position, setPosition] = useState({ left: 14, top: 14 });
  const tip = useRef(null);
  const d = definitions?.[name] || {
    title: "Measure",
    text: "This measure uses the same calculation as the employer dashboard.",
  };
  useLayoutEffect(() => {
    if (!anchor || !tip.current) return;
    const r = anchor.getBoundingClientRect(),
      tr = tip.current.getBoundingClientRect();
    setPosition({
      left: Math.min(
        window.innerWidth - tr.width - 14,
        Math.max(14, r.left + r.width / 2 - tr.width / 2),
      ),
      top:
        r.bottom + 9 + tr.height > window.innerHeight - 10
          ? Math.max(10, r.top - tr.height - 9)
          : r.bottom + 9,
    });
  }, [anchor]);
  return (
    <>
      <span
        role="button"
        tabIndex={0}
        className="metric-info"
        data-tip-wired="1"
        aria-label={`What is ${d.title}?`}
        onMouseEnter={(e) => setAnchor(e.currentTarget)}
        onMouseLeave={() => setAnchor(null)}
        onFocus={(e) => setAnchor(e.currentTarget)}
        onBlur={() => setAnchor(null)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setAnchor(e.currentTarget);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setAnchor(null);
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            setAnchor(e.currentTarget);
          }
        }}
      >
        i
      </span>
      {anchor &&
        createPortal(
          <div
            ref={tip}
            className="metric-tooltip open"
            role="tooltip"
            style={position}
          >
            <b>{d.title}</b>
            {d.text}
            {d.formula && <span className="metric-formula">{d.formula}</span>}
          </div>,
          document.body,
        )}
    </>
  );
}
function Icon({ kind }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      {kind === "takeUp" ? (
        <>
          <circle
            cx="12"
            cy="8"
            r="3.5"
            stroke="var(--chart-cashflow)"
            strokeWidth="1.8"
            fill="none"
          />
          <path
            d="M5 19c0-3 3.1-5 7-5s7 2 7 5"
            stroke="var(--chart-cashflow)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        </>
      ) : (
        <path
          d={
            kind === "saving"
              ? "M12 4v16m4-13H10a2.5 2.5 0 000 5h4a2.5 2.5 0 010 5H8"
              : kind === "rating"
                ? "M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z"
                : "M13 3L5 13h6l-1 8 8-10h-6l1-8z"
          }
          stroke={
            kind === "rating" ? "var(--chart-mid)" : "var(--chart-cashflow)"
          }
          strokeWidth={kind === "rating" ? 1.6 : kind === "saving" ? 1.8 : 1.7}
          fill="none"
          strokeLinecap={kind === "saving" ? "round" : undefined}
          strokeLinejoin={kind !== "saving" ? "round" : undefined}
        />
      )}
    </svg>
  );
}
export function Portfolio() {
  const data = useSyncExternalStore(subscribe, () => snapshot),
    [selected, setSelected] = useState(null),
    [sort, setSort] = useState("oppValue"),
    [search, setSearch] = useState(""),
    [open, setOpen] = useState(false);
  const host = useRef(null),
    league = useRef(null),
    button = useRef(null);
  useEffect(() => {
    const click = (e) => {
      if (!host.current?.contains(e.target)) setOpen(false);
    };
    const key = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("click", click);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  const employers = data?.employers || [],
    metrics = data?.metrics || [],
    definitions = data?.definitions || {};
  const keys = employers.map(employerKey),
    E = employers.filter((e, i) => selected === null || selected.has(keys[i])),
    heads = E.reduce((s, e) => s + (finite(e.heads) || 0), 0),
    count = E.length;
  const info = (name) => <Info name={name} definitions={definitions} />;
  const sum = (key) => {
    const values = E.map((e) => finite(e[key])).filter((v) => v !== null);
    return { count: values.length, total: values.reduce((s, v) => s + v, 0) };
  };
  const savings = sum("saving"),
    opportunity = sum("oppValue"),
    scores = E.map((e) => finite(e.wellness)).filter((v) => v !== null);
  const cards = [
    [
      "employerClients",
      "Employer clients",
      "takeUp",
      count,
      heads.toLocaleString("en-ZA") + " employees covered",
      "var(--brand-soft)",
    ],
    [
      "saving",
      "Cashflow restored / mo",
      "saving",
      savings.count ? money(savings.total) : "Not available",
      savings.count === count
        ? "across selected employers"
        : `${savings.count} of ${count} employers have cashflow data`,
      "#e7f7ef",
    ],
    [
      "oppValue",
      "Open opportunity / mo",
      "activated",
      opportunity.count ? money(opportunity.total) : "Not available",
      opportunity.count === count
        ? "identified across selected employers"
        : `${opportunity.count} of ${count} employers have opportunity data`,
      "var(--brand-soft)",
    ],
    [
      "wellness",
      "Avg Financial Wellness Score",
      "rating",
      scores.length
        ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length)
        : "Not available",
      scores.length === count
        ? "selected-employer average"
        : `${scores.length} of ${count} employers have a complete score`,
      "#fdf3e2",
    ],
  ];
  const metric = metrics.find((m) => m.key === sort) || metrics[0],
    available = metric ? E.filter((e) => finite(e[metric.key]) !== null) : [],
    missing = count - available.length,
    ranked = [...available].sort(
      (a, b) => finite(b[metric.key]) - finite(a[metric.key]),
    ),
    values = available.map((e) => finite(e[metric.key])),
    max = Math.max(...values),
    min = Math.min(...values);
  const pick = (key, scroll = false) => {
    setSort(key);
    if (scroll)
      league.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const matching = employers
    .map((e, i) => ({ e, key: keys[i] }))
    .filter(({ e }) =>
      String(e.name || "")
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
    );
  const state = {
    open,
    search,
    host,
    league,
    button,
    label:
      count === employers.length && count
        ? `All employers (${count})`
        : count
          ? `${count} of ${employers.length} employers`
          : "No employers selected",
    scope: count ? (
      <>
        <strong>{count}</strong> employer{count === 1 ? "" : "s"} selected ·{" "}
        {heads.toLocaleString("en-ZA")} employees covered
      </>
    ) : (
      <>
        <strong>No employers selected.</strong> Choose at least one employer to
        populate the portfolio.
      </>
    ),
    window:
      "Reporting window: " +
      (data?.filterContext?.label || "Programme to date"),
    count: `${count} selected`,
    guide: info("measureGuide"),
    options: matching.length ? (
      matching.map(({ e, key }) => (
        <label className="pf-filter-option" key={key}>
          <input
            type="checkbox"
            checked={selected === null || selected.has(key)}
            data-employer-key={key}
            onChange={(event) =>
              setSelected((current) => {
                const next = new Set(current === null ? keys : current);
                if (event.target.checked) next.add(key);
                else next.delete(key);
                return next;
              })
            }
          />
          <span>{e.name}</span>
        </label>
      ))
    ) : (
      <div className="muted" style={{ padding: 12 }}>
        No matching employers.
      </div>
    ),
    kpis: count ? (
      cards.map(([key, label, icon, raw, sub, bg], i) => (
        <div
          key={key}
          className="card kpi reveal"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div className="kpi-label">
            <span className="kpi-ico" style={{ background: bg }}>
              <Icon kind={icon} />
            </span>
            <span>{label}</span>
            {info(key)}
          </div>
          <div className="kpi-value">{raw}</div>
          <div className="kpi-sub">{sub}</div>
        </div>
      ))
    ) : (
      <div className="card" style={{ padding: 28, gridColumn: "1/-1" }}>
        <b>No employers selected.</b>
        <div className="muted" style={{ marginTop: 8 }}>
          Use the Employers filter above or choose Select all.
        </div>
      </div>
    ),
    heatmap: !!count && (
      <table className="pf-heat">
        <thead>
          <tr>
            <th className="pf-emp-h">Employer</th>
            {metrics.map((m) => (
              <th
                key={m.key}
                className={"pf-mh" + (m.key === metric?.key ? " sort" : "")}
                data-k={m.key}
                tabIndex={0}
                onClick={() => pick(m.key, true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    pick(m.key, true);
                  }
                }}
              >
                <span>{m.label}</span>
                {info(m.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {E.map((e, i) => (
            <tr key={employerKey(e, i)}>
              <td className="pf-emp">
                {e.name}
                <small>
                  {(finite(e.heads) || 0).toLocaleString("en-ZA")} staff
                </small>
              </td>
              {metrics.map((m) => (
                <td
                  key={m.key}
                  className={finite(e[m.key]) === null ? "pf-no-data" : ""}
                  style={{
                    ...colour(
                      m,
                      e[m.key],
                      E.map((row) => row[m.key]),
                    ),
                    fontWeight: 700,
                  }}
                  title={
                    finite(e[m.key]) === null
                      ? "Data not loaded for this measure"
                      : ""
                  }
                >
                  {format(m, e[m.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
    picker:
      !!count &&
      metrics.map((m) => (
        <button
          type="button"
          key={m.key}
          className={"pf-chip" + (m.key === metric?.key ? " on" : "")}
          data-k={m.key}
          onClick={() => pick(m.key)}
        >
          <span>{m.label}</span>
          {info(m.key)}
        </button>
      )),
    note:
      !count || !metric ? (
        ""
      ) : !available.length ? (
        `No ${metric.label} data is available for the selected employers.`
      ) : (
        <>
          Employers ranked by {metric.label} {info(metric.key)} ·{" "}
          {metric.goodHigh ? "highest first" : "highest risk first"}
          {missing ? ` · ${missing} unavailable` : ""}
        </>
      ),
    ranking: !count ? null : !available.length ? (
      <div className="muted" style={{ padding: "12px 0" }}>
        Data not loaded for this measure.
      </div>
    ) : (
      ranked.map((e, i) => {
        const v = finite(e[metric.key]),
          pct = max === min ? 100 : ((v - min) / (max - min)) * 100,
          col = colour(metric, v, values).color;
        return (
          <div className="pf-lg-row" key={employerKey(e, i)}>
            <div
              className="pf-lg-rank"
              style={{
                color:
                  i === 0
                    ? metric.goodHigh
                      ? "#137a47"
                      : "#b5371f"
                    : "#8497a7",
              }}
            >
              {i + 1}
            </div>
            <div className="pf-lg-name">
              {e.name}
              <small>
                {(finite(e.heads) || 0).toLocaleString("en-ZA")} staff
              </small>
            </div>
            <div className="pf-lg-track">
              <div
                className="pf-lg-fill"
                style={{
                  width: `${Math.max(6, metric.goodHigh ? pct : 100 - pct)}%`,
                  background: col,
                }}
              />
            </div>
            <div className="pf-lg-val" style={{ color: col }}>
              {format(metric, v)}
            </div>
          </div>
        );
      })
    ),
    footnote:
      (data?.live
        ? `Internal portfolio view calculated from the same dated source records and score rules as each employer dashboard.${data.filterContext?.label ? ` Reporting window: ${data.filterContext.label}.` : ""}`
        : data?.explicitDemo
          ? "Internal portfolio view Not available explicit demonstration mode."
          : "Internal portfolio view is unavailable because the live portfolio feed could not be loaded. No demonstration values are shown.") +
      ` Currently showing ${count} of ${employers.length} authorised employer${employers.length === 1 ? "" : "s"}. Heatmap colouring is relative within each metric column; with only one employer the cell is intentionally neutral. Missing measures are shown as unavailable and are not ranked as zero. For stress index and arrears, higher values indicate greater risk. Not shared with employer clients.`,
  };
  return (
    <PortfolioLayout
      state={state}
      actions={{
        toggle: () => setOpen((v) => !v),
        search: setSearch,
        all: () => setSelected(null),
        clear: () => setSelected(new Set()),
      }}
    />
  );
}
