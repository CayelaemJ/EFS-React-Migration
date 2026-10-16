import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { DashboardDrawer, CompletionTrend } from "./DashboardDrawer.jsx";
import { Info } from "./Portfolio.jsx";
import { AnimatedNumber, Sparkline } from "./EmployerOverview.jsx";

let snapshot = null;
const listeners = new Set();
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export function updateEmployerCharts(value) {
  snapshot = value;
  listeners.forEach((listener) => listener());
}
function useCharts() {
  const value = useSyncExternalStore(subscribe, () => snapshot);
  useLayoutEffect(() => {
    value?.fit?.();
  }, [value]);
  return value;
}
const present = (value) =>
  value !== null &&
  value !== undefined &&
  value !== "" &&
  Number.isFinite(Number(value));
const count = (value) =>
  present(value) ? Number(value).toLocaleString("en-ZA") : "Not available";
const money = (value) =>
  present(value)
    ? "R " + Math.round(Number(value)).toLocaleString("en-ZA")
    : "Not available";
const displayMoney = (value) =>
  String(value ?? "").replace(
    /R\s*([0-9][0-9,]*(?:\.[0-9]+)?)\s*([kKmM])\b/g,
    (_, n, unit) =>
      money(
        parseFloat(n.replace(/,/g, "")) *
          (unit.toLowerCase() === "m" ? 1e6 : 1e3),
      ),
  );
const rows = (value) => (Array.isArray(value) ? value : []);
const percent = (value) => Math.max(0, Math.min(100, Number(value) || 0));
function Metric({ name, data }) {
  return <Info name={name} definitions={data.definitions} />;
}
const iconPaths = {
  shield: "M12 3l7 3v5c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6l7-3z",
  umbrella: "M12 3v2M3.5 11a8.5 8.5 0 0117 0H3.5zM12 11v7a2.5 2.5 0 01-5 0",
  scale:
    "M12 4v16M7 20h10M5 8l-2.5 5a2.5 2.5 0 005 0L5 8zm14 0l-2.5 5a2.5 2.5 0 005 0L19 8zM5 8l7-2 7 2",
  scroll:
    "M6 4h10a2 2 0 012 2v11a3 3 0 01-3 3H7a2 2 0 01-2-2V6M9 8h6M9 12h6M9 16h4",
  wallet:
    "M3 8a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm14 3h-3a2 2 0 000 4h3",
  car: "M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4h2v-2m10 2h2v-4m-12 1h1m9 0h1",
};
function Icon({ name }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      {iconPaths[name] ? (
        <path
          d={iconPaths[name]}
          stroke="var(--chart-cashflow)"
          strokeWidth={
            ["scale", "scroll", "car"].includes(name) ? "1.7" : "1.8"
          }
          fill="none"
          strokeLinecap={name === "shield" ? undefined : "round"}
          strokeLinejoin={["scale", "car"].includes(name) ? "round" : undefined}
        />
      ) : null}
    </svg>
  );
}
function activate(event, action) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    action();
  }
}
export function OutcomesNote() {
  const data = useCharts();
  if (!data) return null;
  const total = rows(data.outcomes).reduce(
    (sum, row) => sum + (Number(row.count) || 0),
    0,
  );
  return data.availability?.journeys === false
    ? "Journey data not loaded."
    : `${total.toLocaleString("en-ZA")} financial ${total === 1 ? "problem" : "problems"} resolved Not available and the value created`;
}
export function Outcomes() {
  const data = useCharts(),
    [selected, setSelected] = useState(null),
    close = useCallback(() => setSelected(null), []);
  useEffect(() => setSelected(null), [data]);
  if (!data) return null;
  if (data.availability?.journeys === false)
    return (
      <div className="muted" style={{ padding: "22px 8px" }}>
        Journey data has not been loaded for this employer.
      </div>
    );
  if (!rows(data.outcomes).length)
    return (
      <div className="muted" style={{ padding: "22px 8px" }}>
        No completed outcomes in the selected reporting window.
      </div>
    );
  return (
    <>
      {rows(data.outcomes).map((row, i) => (
        <div
          className="outcome clickable"
          key={i}
          role="button"
          tabIndex={0}
          onClick={() => setSelected(row)}
          onKeyDown={(event) => activate(event, () => setSelected(row))}
        >
          <div className="outcome-ico">
            <Icon name={row.ico} />
          </div>
          <div>
            <div className="outcome-name">{row.name}</div>
            <div className="outcome-meta">
              {count(row.count)} completed · {row.meta}
            </div>
          </div>
          <div className="outcome-stat">
            <div className="v">{displayMoney(row.stat)}</div>
            <div className="l">{row.statL}</div>
          </div>
          <div className="row-chevron">›</div>
        </div>
      ))}
      {selected ? (
        <OutcomeDetail row={selected} data={data} onClose={close} />
      ) : null}
    </>
  );
}
function niceTicks(values, count = 5) {
  const nums = values.map(Number).filter(Number.isFinite);
  if (!nums.length) return [0];
  const min = Math.min(0, ...nums),
    max = Math.max(...nums);
  if (max <= min) return [min];
  const raw = (max - min) / Math.max(1, count - 1),
    mag = Math.pow(10, Math.floor(Math.log10(raw))),
    unit = raw / mag;
  const step = (unit >= 5 ? 5 : unit >= 2 ? 2 : 1) * mag,
    start = Math.floor(min / step) * step,
    end = Math.ceil(max / step) * step,
    ticks = [];
  for (let v = start; v <= end + step * 0.001 && ticks.length < 12; v += step)
    ticks.push(Math.round(v * 1e6) / 1e6);
  return ticks.length >= 2 ? ticks : [min, max];
}
function PeriodLineChart({
  current = [],
  previous = [],
  currentLabel = "Selected period",
  previousLabel = "Previous period",
  colour = "var(--chart-cashflow)",
}) {
  const a = rows(current).filter(present).map(Number),
    b = rows(previous).filter(present).map(Number);
  if (!a.length && !b.length)
    return (
      <div className="muted comparison-empty">
        No data is available for this period.
      </div>
    );
  const single = a.length === 1 && b.length === 1,
    values = single ? [b[0], a[0]] : [...a, ...b],
    labels = [previousLabel, currentLabel];
  const w = 760,
    h = 240,
    axisLeft = 112,
    plotLeft = 132,
    plotRight = 738,
    top = 22,
    bottom = 46;
  const ticks = niceTicks(values, single ? 4 : 5),
    max = ticks[ticks.length - 1] || 1,
    n = Math.max(a.length, b.length);
  const px = (i) =>
      plotLeft +
      (i * (plotRight - plotLeft)) / (single ? 1 : Math.max(1, n - 1)),
    py = (v) => h - bottom - (v / max) * (h - bottom - top);
  const lineOf = (series) => {
    let started = false;
    return Array.from(
      { length: n },
      (_, i) => series[i - (n - series.length)] ?? null,
    )
      .map((v, i) => {
        if (v == null) return "";
        const command = started ? "L" : "M";
        started = true;
        return command + px(i).toFixed(1) + " " + py(v).toFixed(1);
      })
      .filter(Boolean)
      .join(" ");
  };
  return (
    <div className="comparison-chart">
      {single ? (
        <div className="comparison-value-row">
          {values.map((v, i) => (
            <div
              key={i}
              className={
                "comparison-value-card " + (i === 1 ? "current" : "previous")
              }
            >
              <span className="comparison-value-period">{labels[i]}</span>
              <strong>{money(v)}</strong>
            </div>
          ))}
        </div>
      ) : null}
      <div className="comparison-legend">
        <span>
          <i className="comparison-dot current" />
          {currentLabel}
        </span>
        <span>
          <i className="comparison-dot previous" />
          {previousLabel}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label={
          single
            ? `${currentLabel} compared with ${previousLabel}`
            : `${currentLabel} and ${previousLabel} trend`
        }
      >
        {single ? (
          <line
            x1={plotLeft}
            x2={plotRight}
            y1={h - bottom}
            y2={h - bottom}
            stroke="var(--line)"
          />
        ) : null}
        {!single ? (
          <>
            <path
              d={lineOf(a)}
              fill="none"
              stroke={colour}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d={lineOf(b)}
              fill="none"
              stroke="var(--chart-engagement)"
              strokeWidth="2.2"
              strokeDasharray="6 5"
              strokeLinecap="round"
            />
          </>
        ) : null}
        {ticks.map((v) => (
          <React.Fragment key={v}>
            <line
              x1={plotLeft}
              x2={plotRight}
              y1={py(v)}
              y2={py(v)}
              stroke="var(--line-soft)"
            />
            <text
              x={axisLeft}
              y={py(v) + 3}
              textAnchor="end"
              fontSize="9.5"
              fontWeight="700"
              fill="#8497a7"
            >
              {money(v)}
            </text>
          </React.Fragment>
        ))}
        {single ? (
          <>
            <path
              d={`M${px(0).toFixed(1)} ${py(values[0]).toFixed(1)} L${px(1).toFixed(1)} ${py(values[1]).toFixed(1)}`}
              fill="none"
              stroke={colour}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {values.map((v, i) => (
              <circle
                key={i}
                cx={px(i)}
                cy={py(v)}
                r={i === 1 ? 5.5 : 4.5}
                fill={i === 1 ? colour : "var(--chart-engagement)"}
                stroke="#fff"
                strokeWidth="2"
              >
                <title>
                  {labels[i]}: {money(v)}
                </title>
              </circle>
            ))}
            {labels.map((label, i) => (
              <text
                key={i}
                x={i === 0 ? plotLeft : plotRight}
                y={h - 13}
                textAnchor={i === 0 ? "start" : "end"}
                fontSize="10"
                fontWeight="800"
                fill={i === 1 ? "var(--brand-primary)" : "#8497a7"}
              >
                {label}
              </text>
            ))}
          </>
        ) : null}
      </svg>
    </div>
  );
}
function FinancialChart({ data, kind }) {
  const pc = data.periodComparison,
    key = kind === "ewa" ? "totalAdvanced" : "monthlyCashFreedUp";
  const comparison =
    data.filterContext?.period &&
    pc?.current &&
    pc?.previous &&
    present(pc.current[key]) &&
    present(pc.previous[key]);
  return comparison ? (
    <PeriodLineChart
      current={[pc.current[key]]}
      previous={[pc.previous[key]]}
      currentLabel={
        pc.current.label ||
        data.filterContext.label ||
        data.filterContext.period
      }
      previousLabel={pc.previous.label || "Previous month"}
    />
  ) : (
    <PeriodLineChart
      current={kind === "ewa" ? data.ewa?.trend : data.savings}
      previous={data.comparison?.previous?.[kind]}
      currentLabel={data.filterContext?.label || "Selected period"}
      previousLabel={data.comparison?.label || "Previous period"}
    />
  );
}
export function SavingsChart() {
  const data = useCharts();
  return data ? <FinancialChart data={data} kind="savings" /> : null;
}
export function EwaChart() {
  const data = useCharts();
  return data ? <FinancialChart data={data} kind="ewa" /> : null;
}
export function EwaKpis() {
  const data = useCharts();
  if (!data) return null;
  const e = data.ewa;
  if (!e || !e.advances)
    return (
      <div className="muted" style={{ padding: "8px 2px", fontSize: 13.5 }}>
        No early wage access activity recorded yet.
      </div>
    );
  return [
    {
      v: count(e.clients),
      l: "Employees took up",
      k: "ewaEmployees",
      s: count(e.advances) + " advances total",
      bg: "var(--brand-soft)",
    },
    {
      v: e.total,
      l: "Total advanced",
      k: "ewaTotal",
      s: "All finalised advances",
      bg: "#e7f7ef",
    },
    {
      v: e.avg,
      l: "Average advance",
      k: "ewaAverage",
      s: "Per drawdown",
      bg: "var(--brand-soft)",
    },
    {
      v: present(e.perClient)
        ? Number(e.perClient).toFixed(1)
        : "Not available",
      l: "Advances per employee",
      k: "ewaFrequency",
      s: "Average frequency",
      bg: "#fdf3e2",
    },
  ].map((x, i) => (
    <div
      className="card kpi reveal"
      key={x.k}
      style={{ animationDelay: `${i * 0.06}s` }}
    >
      <div className="kpi-label">
        <span className="kpi-ico" style={{ background: x.bg }} />
        {x.l}
        <Metric name={x.k} data={data} />
      </div>
      <div className="kpi-value">{x.v}</div>
      <div className="kpi-sub">{x.s}</div>
    </div>
  ));
}
export function DebtProfile() {
  const data = useCharts(),
    [open, setOpen] = useState(false),
    [selected, setSelected] = useState(null),
    close = useCallback(() => setSelected(null), []);
  useEffect(() => {
    setOpen(false);
    setSelected(null);
  }, [data]);
  if (!data) return null;
  return (
    <>
      <div id="debt-profile">
        <div>
          <div className="dp-bar">
            {rows(data.debtProfile).map((d, i) => (
              <div
                key={i}
                className="dp-seg"
                style={{
                  width: `${percent(d.pct)}%`,
                  background: data.colours[i],
                }}
                title={d.type}
              />
            ))}
          </div>
          <div className="dp-legend">
            {rows(data.debtProfile).map((d, i) => (
              <div key={i} className="dp-leg">
                <span
                  className="dp-dot"
                  style={{ background: data.colours[i] }}
                />
                <span className="dp-type">{d.type}</span>
                <span className="dp-bal">{displayMoney(d.balance)}</span>
                <span className="dp-pct">{d.pct}%</span>
              </div>
            ))}
          </div>
          <button
            className="dp-toggle"
            id="dp-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="creditor-table"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Hide creditor detail ▴" : "View by creditor ▾"}
          </button>
        </div>
      </div>
      <div
        id="creditor-table"
        style={{ marginTop: 18, display: open ? "block" : "none" }}
      >
        <table className="ct">
          <thead>
            <tr>
              <th>Creditor</th>
              <th className="r">Accounts</th>
              <th className="r">Balance</th>
              <th className="r">Average per account</th>
              <th className="r">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows(data.creditors).map((c, i) => (
              <tr
                className="ct-row"
                key={i}
                data-i={i}
                tabIndex={0}
                onClick={() => setSelected(c)}
                onKeyDown={(event) => activate(event, () => setSelected(c))}
              >
                <td data-label="Creditor">
                  <div className="cred-name">
                    <span className="cred-logo" style={{ background: c.color }}>
                      {String(c.name || "")
                        .split(/\s|\//)[0]
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    <span className="cred-name-text">{c.name}</span>
                  </div>
                </td>
                <td data-label="Accounts" className="r num">
                  {c.accounts}
                </td>
                <td data-label="Balance" className="r num">
                  {displayMoney(c.balance)}
                </td>
                <td data-label="Average per account" className="r muted">
                  {displayMoney(c.avg)}
                </td>
                <td data-label="Status" className="r">
                  <span
                    className={
                      "chip-mini " +
                      (c.status === "elig" ? "chip-elig" : "chip-prog")
                    }
                  >
                    {c.statusL}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="ct-total">
              <td data-label="Total">
                <strong>Total in arrears journey</strong>
              </td>
              <td data-label="Accounts" className="r num">
                {data.creditorsTotal?.accounts}
              </td>
              <td data-label="Balance" className="r num">
                {displayMoney(data.creditorsTotal?.balance)}
              </td>
              <td data-label="Average per account" className="r" />
              <td data-label="Status" className="r" />
            </tr>
          </tbody>
        </table>
      </div>
      {selected ? <CreditorDetail row={selected} onClose={close} /> : null}
    </>
  );
}
function AnimatedBar({ value, delay, colour }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [value, delay, colour]);
  return (
    <div
      className="hbar-fill"
      style={{ width: `${ready ? percent(value) : 0}%`, background: colour }}
    />
  );
}
export function Regions() {
  const data = useCharts();
  return data
    ? rows(data.regions).map((r, i) => (
        <div className="hbar-row" key={i}>
          <div className="hbar-lbl">{r.name}</div>
          <div className="hbar-track">
            <AnimatedBar
              value={r.stress}
              delay={150 + i * 80}
              colour={
                r.stress >= 70
                  ? "var(--chart-high)"
                  : r.stress >= 55
                    ? "var(--chart-mid)"
                    : r.stress >= 45
                      ? "var(--chart-debt)"
                      : "var(--chart-low)"
              }
            />
          </div>
          <div className="hbar-val">{r.stress}</div>
        </div>
      ))
    : null;
}
export function StressMap() {
  const data = useCharts();
  const tone = {
    red: "var(--chart-high)",
    green: "var(--chart-low)",
    blue: "var(--chart-debt)",
    amber: "var(--chart-mid)",
  };
  return data ? (
    <div className="stress-grid reveal">
      {rows(data.stressMap).map((s, i) => (
        <div className="stress-cell" key={i} style={{ "--t": tone[s.tone] }}>
          <div className="stress-l">
            {s.l} <Metric name={data.keys.stress[i]} data={data} />
          </div>
          <div className="stress-v">{s.v}</div>
          <div className="stress-d">{s.d}</div>
        </div>
      ))}
    </div>
  ) : null;
}
export function Income() {
  const data = useCharts();
  if (!data) return null;
  const bands = rows(data.income),
    total = bands.reduce((sum, row) => sum + (Number(row.count) || 0), 0);
  if (!bands.length || total <= 0)
    return (
      <div
        className="muted"
        style={{ padding: "28px 8px", textAlign: "center" }}
      >
        {!bands.length
          ? "Income-band data is not available for this period."
          : "No activated employees with an income band are available in this view."}
      </div>
    );
  const r = 52,
    c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="donut-wrap">
      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        role="img"
        aria-label="Activated employees by income band"
      >
        {bands.map((b, i) => {
          const length = ((Number(b.count) || 0) / total) * c,
            previous = offset;
          offset += length;
          return (
            <circle
              key={i}
              cx="70"
              cy="70"
              r={r}
              fill="none"
              stroke={data.colours[i]}
              strokeWidth="20"
              strokeDasharray={`${length} ${c - length}`}
              strokeDashoffset={-previous}
              transform="rotate(-90 70 70)"
            />
          );
        })}
        <text
          x="70"
          y="65"
          textAnchor="middle"
          fontSize="22"
          fontWeight="800"
          fill="var(--brand-primary)"
          fontFamily="Fraunces,serif"
        >
          {count(total)}
        </text>
        <text
          x="70"
          y="84"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="700"
          fill="#8497a7"
        >
          ACTIVATED
        </text>
      </svg>
      <div className="legend">
        {bands.map((b, i) => (
          <div className="legend-row" key={i}>
            <span
              className="legend-dot"
              style={{ background: data.colours[i] }}
            />
            <span className="legend-name">{b.name}</span>
            <span className="legend-val">{count(b.count || 0)}</span>
          </div>
        ))}
        <div className="legend-sub" style={{ marginTop: 4 }}>
          Income-band reach among activated employees in the selected view.
        </div>
      </div>
    </div>
  );
}
export function Ratings() {
  const data = useCharts();
  if (!data) return null;
  const rt = data.ratings || {},
    avg = Math.max(0, Math.min(5, Number(rt.avg) || 0)),
    rounded = Math.round(avg * 2) / 2;
  return (
    <div>
      <div className="rating-hero">
        <div className="rating-big">{avg.toFixed(1)}</div>
        <div className="rating-summary">
          <div
            className="rating-stars"
            role="img"
            aria-label={`${avg.toFixed(1)} out of 5 stars`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={
                  "rating-star " +
                  (rounded - i >= 1
                    ? "full"
                    : rounded - i >= 0.5
                      ? "half"
                      : "empty")
                }
                aria-hidden="true"
              >
                ★
              </span>
            ))}
          </div>
          <div className="rating-response-count">
            {present(rt.responses)
              ? Number(rt.responses).toLocaleString()
              : "Not available"}{" "}
            ratings
          </div>
        </div>
      </div>
      <div className="rating-bars">
        {[5, 4, 3, 2, 1].map((s) => (
          <div className="rb-row" key={s}>
            <div className="rb-lbl">{s} ★</div>
            <div className="rb-track">
              <div
                className="rb-fill"
                style={{
                  width: `${percent(rt.dist?.[s])}%`,
                  background:
                    s <= 2
                      ? "var(--chart-high)"
                      : s === 3
                        ? "var(--chart-mid)"
                        : undefined,
                }}
              />
            </div>
            <div className="rb-val">{rt.dist?.[s]}%</div>
          </div>
        ))}
      </div>
      {[
        [
          "5-star ratings",
          "fiveStarPct",
          rt.fiveStarPct == null ? "Not available" : rt.fiveStarPct + "%",
        ],
        ["Net Promoter Score", "nps", rt.nps ?? "Not available"],
      ].map(([label, key, value]) => (
        <div className="rating-share-pill" key={key}>
          <div>
            <div className="l">
              {label} <Metric name={key} data={data} />
            </div>
          </div>
          <div className="v">{value}</div>
        </div>
      ))}
    </div>
  );
}
export function DebtStates() {
  const data = useCharts();
  if (!data?.debtStates) return null;
  const d = data.debtStates,
    cols = [
      {
        ...d.active,
        c: "var(--blue)",
        tag: "ACTIVE ARRANGEMENT",
        key: "debtActive",
      },
      {
        ...d.challenged,
        c: "var(--chart-insurance)",
        tag: "BEING CONTESTED",
        key: "debtChallenged",
      },
      {
        ...d.guided,
        c: "var(--chart-mid)",
        tag: "GUIDANCE ONLY",
        key: "debtGuided",
      },
    ],
    total = cols.reduce((sum, x) => sum + (Number(x.rand) || 0), 0);
  return (
    <div>
      <div className="ds-bar">
        {cols.map((x) => (
          <div
            key={x.key}
            style={{
              width: `${total > 0 ? ((Number(x.rand) / total) * 100).toFixed(1) : 0}%`,
              background: x.c,
              height: "100%",
            }}
          />
        ))}
      </div>
      <div className="ds-grid">
        {cols.map((x) => (
          <div className="ds-card" key={x.key} style={{ "--c": x.c }}>
            <div className="ds-tag" style={{ color: x.c }}>
              {x.tag}
            </div>
            <div className="ds-v">{money(x.rand)}</div>
            <div className="ds-name">
              {x.label} <Metric name={x.key} data={data} />
            </div>
            <div className="ds-note">{x.note}</div>
            <div className="ds-emp">{x.employees} employees</div>
          </div>
        ))}
      </div>
      <div className="ds-foot">
        Only <strong>{money(d.active?.rand)}</strong> is counted as{" "}
        <strong>debt under active intervention</strong> in the summary above.
        The guidance-only amount is shown separately and honestly Not available
        we educated these employees on prescription so they can manage accounts
        they couldn't afford to arrange; we don't claim it as active
        intervention.
      </div>
    </div>
  );
}
export function Prescription() {
  const data = useCharts();
  if (!data?.prescription) return null;
  const p = data.prescription;
  return (
    <>
      <div
        className="prescription-summary"
        style={{
          display: "flex",
          gap: 26,
          marginBottom: 18,
          paddingBottom: 18,
          borderBottom: "1px solid #f7f4ff",
        }}
      >
        {[
          ["Value challenged", "prescriptionValue", displayMoney(p.total)],
          [
            "Already written off",
            "prescriptionWrittenOff",
            displayMoney(p.writtenOff),
          ],
          ["Accounts", "prescriptionAccounts", p.accounts],
        ].map(([label, key, value], i) => (
          <div key={key}>
            <div
              className="chart-inline-muted"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#8497a7",
                textTransform: "uppercase",
                letterSpacing: ".05em",
              }}
            >
              {label} <Metric name={key} data={data} />
            </div>
            <div
              style={{
                fontFamily: "Fraunces,serif",
                fontSize: 30,
                fontWeight: 600,
                color:
                  i === 1 ? "var(--chart-cashflow)" : "var(--brand-primary)",
                letterSpacing: -1,
                marginTop: 5,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
      <div className="hbar">
        {rows(p.statusBars).map((b, i) => (
          <div
            className="hbar-row"
            key={i}
            style={{ gridTemplateColumns: "130px 1fr 96px" }}
          >
            <div className="hbar-lbl">{b.l}</div>
            <div className="hbar-track" style={{ height: 26 }}>
              <AnimatedBar value={b.pct} delay={150 + i * 100} colour={b.c} />
            </div>
            <div className="hbar-val">{b.n} acct</div>
          </div>
        ))}
      </div>
    </>
  );
}
export function RiskSignals() {
  const data = useCharts();
  if (!data) return null;
  const severity = {
    high: { c: "var(--chart-high)", l: "High" },
    med: { c: "var(--chart-mid)", l: "Medium" },
    low: { c: "var(--chart-debt)", l: "Low" },
  };
  return rows(data.riskSignals).map((s, i) => {
    const sv = severity[s.sev] || severity.low;
    return (
      <div className="risk-row" key={i}>
        <div className="risk-bar" style={{ background: sv.c }} />
        <div className="risk-body">
          <div className="risk-sig">
            {s.sig} <Metric name="riskSignals" data={data} />
          </div>
          <div className="risk-note">{s.note}</div>
        </div>
        <div className="risk-stat">
          <div className="risk-n">
            {present(s.n) ? Number(s.n).toLocaleString() : "Not available"}
          </div>
          <div className="risk-sev" style={{ color: sv.c }}>
            {sv.l}
          </div>
        </div>
      </div>
    );
  });
}
export function Opportunities() {
  const data = useCharts();
  if (!data?.opportunities) return null;
  const o = data.opportunities,
    r = data.referral || {};
  return (
    <div className="opp-wrap reveal">
      <div className="opp-grid">
        {rows(o.cards).map((c, i) => (
          <div className="opp-card" key={i}>
            <div className="opp-ico">
              <Icon name={c.icon} />
            </div>
            <div className="opp-name">
              {c.name} <Metric name="opportunities" data={data} />
            </div>
            <div className="opp-elig">
              <span className="opp-n">{c.eligible}</span> employees eligible
            </div>
            <div className="opp-save">
              {c.saving !== "Not available"
                ? "+ " + c.saving + "/mo potential"
                : c.extra || ""}
            </div>
          </div>
        ))}
      </div>
      <div className="opp-foot">
        <div className="opp-foot-main">
          <div className="opp-foot-l">
            Estimated additional value in the next wave{" "}
            <Metric name="opportunityValue" data={data} />
          </div>
          <div className="opp-foot-v">
            {o.estMonthly}
            <span>/month</span> &nbsp;·&nbsp; {o.estAnnual}
            <span>/year</span>
          </div>
          <div className="opp-foot-note">
            Direct your broker to activate these segments Not available the
            diagnosis is already done.
          </div>
        </div>
        <div className="opp-foot-ref">
          <div className="opp-ref-v">{r.shareRate}%</div>
          <div className="opp-ref-l">
            organic referral rate <Metric name="referralRate" data={data} />
            <br />
            <span>
              {present(r.shares)
                ? Number(r.shares).toLocaleString()
                : "Not available"}{" "}
              shares · reach {r.impliedReach}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const journeyColours = {
  credit: "var(--chart-debt)",
  funeral: "var(--chart-insurance)",
  arrears: "var(--chart-mid)",
  prescribed: "var(--chart-workforce)",
  emergency: "var(--chart-cashflow)",
  general: "var(--chart-engagement)",
};
function ChatEmpty({ children, unavailable = false }) {
  return (
    <div
      className="muted"
      style={{
        padding: unavailable ? "34px 18px" : "28px 12px",
        textAlign: "center",
        color: "#8497a7",
        fontSize: 13,
        ...(unavailable ? { lineHeight: 1.55 } : {}),
      }}
    >
      {children ||
        "Chat data is supplied by the separate chat integration and is not currently available."}
    </div>
  );
}
function ChatBar({ className, value, colour, delay }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [value, colour, delay]);
  return (
    <div
      className={className}
      style={{ width: `${ready ? percent(value) : 0}%`, background: colour }}
    />
  );
}
function ChatIcon({ index }) {
  const path =
    index === 0
      ? "M13 3L5 13h6l-1 8 8-10h-6l1-8z"
      : index === 1
        ? "M5 19c0-3 3.1-5 7-5s7 2 7 5"
        : index === 2
          ? "M12 7v5l3 2"
          : "M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z";
  return (
    <span
      className="kpi-ico"
      style={{ background: index === 3 ? "#fdf3e2" : "var(--brand-soft)" }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24">
        {index === 1 ? (
          <circle
            cx="12"
            cy="8"
            r="3.5"
            stroke="var(--chart-cashflow)"
            strokeWidth="1.8"
            fill="none"
          />
        ) : index === 2 ? (
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="var(--chart-cashflow)"
            strokeWidth="1.8"
            fill="none"
          />
        ) : null}
        <path
          d={path}
          stroke={index === 3 ? "var(--chart-mid)" : "var(--chart-cashflow)"}
          strokeWidth={index === 0 ? "1.7" : index === 3 ? "1.6" : "1.8"}
          fill={index === 2 ? undefined : "none"}
          strokeLinecap={index === 1 || index === 2 ? "round" : undefined}
          strokeLinejoin={index === 0 || index === 3 ? "round" : undefined}
        />
      </svg>
    </span>
  );
}
export function EmployeeChat() {
  const data = useCharts(),
    [selected, setSelected] = useState("credit");
  if (!data) return null;
  const c = data.chat || {},
    unavailable = c.available === false,
    journeys = rows(c.byJourney),
    journey = journeys.find((j) => j.key === selected) || journeys[0],
    max = Math.max(1, ...journeys.map((j) => Number(j.convos) || 0)),
    themeMax = Math.max(
      1,
      ...rows(journey?.themes).map((t) => Number(t.n) || 0),
    );
  const title =
    unavailable || !journey
      ? "Chat themes"
      : "Top themes Not available " + journey.name;
  const note = unavailable
    ? "Available when the separate chat integration is connected."
    : !journey
      ? "No journey themes in the selected period."
      : data.live
        ? "Most frequent themes tagged for this journey in the selected period."
        : "Illustrative demonstration themes for this journey.";
  const cards = [
    {
      label: "Total conversations",
      key: "chatTotal",
      num: Number(c.conversations || 0),
      sub: "selected period",
    },
    {
      label: "Resolved in chat",
      key: "chatResolved",
      num: Number(c.resolvedInChat || 0),
      suffix: "%",
      sub: Number.isFinite(Number(c.escalated))
        ? Number(c.escalated) + "% handed to an agent"
        : "handoff rate unavailable",
    },
    {
      label: "Avg first reply",
      key: "chatFirstReply",
      raw: c.avgFirstReply || "Not available",
      sub: "median response time",
    },
    {
      label: "Chat satisfaction",
      key: "chatSatisfaction",
      num: Number(c.csat || 0),
      suffix: "/5",
      decimals: 1,
      sub: "rated after chat",
    },
  ];
  return (
    <>
      <div className="head" style={{ padding: "36px 0 14px" }}>
        <div>
          <div className="head-eyebrow">Voice of the employee</div>
          <h1 style={{ fontSize: 27 }}>What your people are asking</h1>
          <div className="head-sub">
            Every question asked in the in-app chat, categorised by journey.
            This is your early-warning system for where employees hesitate, what
            reassurance they need, and which objections to pre-empt.
          </div>
        </div>
      </div>
      <div id="chat-kpis" className="grid g-4">
        {unavailable ? (
          <div
            className="card reveal"
            style={{ gridColumn: "1/-1", padding: "10px 0" }}
          >
            <ChatEmpty unavailable />
          </div>
        ) : (
          cards.map((card, i) => (
            <div
              key={card.key}
              className="card kpi reveal"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="kpi-label">
                <ChatIcon index={i} />
                {card.label}
                <Metric name={card.key} data={data} />
              </div>
              <div className="kpi-value">
                {card.raw || (
                  <AnimatedNumber
                    target={card.num}
                    decimals={card.decimals || 0}
                    index={i}
                    refresh={c}
                  />
                )}{" "}
                {card.suffix ? (
                  <span style={{ fontSize: 18 }}>{card.suffix}</span>
                ) : null}
              </div>
              <div className="kpi-sub">{card.sub}</div>
              {i === 0 ? (
                <Sparkline points={c.volume} colour="var(--blue)" />
              ) : null}
            </div>
          ))
        )}
      </div>
      <div className="grid g-12 section-gap">
        <div
          className="card reveal"
          style={{ gridColumn: "span 7", animationDelay: ".05s" }}
        >
          <div className="card-hd">
            <div>
              <div className="card-title">
                Conversations by journey{" "}
                <Metric name="chatByJourney" data={data} />
              </div>
              <div className="card-note">
                Where the questions are coming from Not available click a
                journey for its top themes
              </div>
            </div>
            <span className="card-tag" id="chat-count-tag">
              {unavailable
                ? "Data unavailable"
                : Number(c.conversations || 0).toLocaleString() + " chats"}
            </span>
          </div>
          <div id="chat-journeys">
            {unavailable ? (
              <ChatEmpty unavailable />
            ) : !journeys.length ? (
              <ChatEmpty>No conversations in the selected period.</ChatEmpty>
            ) : (
              journeys.map((j, i) => {
                const colour = journeyColours[j.key] || "var(--blue)",
                  sentimentColour =
                    data.sentimentColours[j.key] || "var(--blue)";
                return (
                  <div
                    key={j.key}
                    className={"chat-jrow" + (j.key === selected ? " sel" : "")}
                    data-k={j.key}
                    role="button"
                    tabIndex={0}
                    aria-pressed={j.key === selected}
                    onClick={() => setSelected(j.key)}
                    onKeyDown={(event) =>
                      activate(event, () => setSelected(j.key))
                    }
                  >
                    <div className="chat-jbar-lbl">
                      <span
                        className="chat-jdot"
                        style={{ background: colour }}
                      />
                      {j.name}
                    </div>
                    <div className="chat-jbar-track">
                      <ChatBar
                        className="chat-jbar"
                        value={(j.convos / max) * 100}
                        colour={colour}
                        delay={140 + i * 70}
                      />
                    </div>
                    <div className="chat-jmeta">
                      {Number(j.convos || 0).toLocaleString()}
                      <small>
                        <span
                          style={{
                            fontSize: 10.5,
                            fontWeight: 800,
                            color: sentimentColour,
                            background: sentimentColour + "1a",
                            padding: "3px 8px",
                            borderRadius: 6,
                          }}
                        >
                          {j.sentiment >= 72
                            ? "Positive"
                            : j.sentiment >= 64
                              ? "Mixed"
                              : "Anxious"}{" "}
                          · {j.sentiment}%
                        </span>
                      </small>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div
          className="card reveal"
          style={{ gridColumn: "span 5", animationDelay: ".1s" }}
        >
          <div className="card-hd">
            <div>
              <div className="card-title">
                Trending questions <Metric name="chatTrending" data={data} />
              </div>
              <div className="card-note">
                Rising across the workforce this period
              </div>
            </div>
            <span className="card-tag">Themes</span>
          </div>
          <div id="chat-trending">
            {unavailable ? (
              <ChatEmpty unavailable />
            ) : !rows(c.trending).length ? (
              <ChatEmpty>
                No trending questions in the selected period.
              </ChatEmpty>
            ) : (
              rows(c.trending).map((t, i) => (
                <div className="trend-row" key={i}>
                  <div className="trend-rank">{i + 1}</div>
                  <div className="trend-body">
                    <div className="trend-q">"{t.q}"</div>
                    <div className="trend-meta">{t.journey}</div>
                  </div>
                  <div className="trend-stat">
                    <div className="trend-n">{t.n}</div>
                    <div
                      className="trend-up"
                      style={{
                        color:
                          t.trend === "flat"
                            ? "#8497a7"
                            : "var(--chart-engagement)",
                      }}
                    >
                      {t.trend === "flat" ? "Not available" : "▲ " + t.trend}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div
        className="card reveal section-gap"
        style={{ animationDelay: ".05s" }}
      >
        <div className="card-hd">
          <div>
            <div className="card-title" id="chat-theme-title">
              {title}
            </div>
            <div className="card-note" id="chat-theme-note">
              {note}
            </div>
          </div>
          <span className="card-tag">Drill-down</span>
        </div>
        <div id="chat-themes">
          {unavailable ? (
            <ChatEmpty unavailable />
          ) : !journey ? (
            <ChatEmpty>No themes tagged in the selected period.</ChatEmpty>
          ) : !rows(journey.themes).length ? (
            <div
              className="muted"
              style={{ padding: "10px 0", color: "#8497a7", fontSize: 13 }}
            >
              No themes tagged for this journey yet.
            </div>
          ) : (
            <div className="theme-grid">
              {journey.themes.map((t, i) => (
                <div className="theme-row" key={i}>
                  <div className="theme-q">{t.t}</div>
                  <div className="theme-track">
                    <ChatBar
                      className="theme-fill"
                      value={(t.n / themeMax) * 100}
                      colour={journeyColours[journey.key]}
                      delay={120 + i * 60}
                    />
                  </div>
                  <div className="theme-n">{t.n}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Stat({ label, children }) {
  return (
    <div className="ds">
      <div className="dsl">{label}</div>
      <div className="dsv">{children}</div>
    </div>
  );
}
function OutcomeDetail({ row: o, data, onClose }) {
  return (
    <DashboardDrawer
      title={o.name}
      subtitle={o.meta}
      kind="outcome"
      onClose={onClose}
    >
      <div className="drawer-stat-grid">
        <Stat label="Fixes completed">{count(o.count)}</Stat>
        <Stat label={o.statL}>{displayMoney(o.stat)}</Stat>
        <Stat label="Average per employee">
          {o.avgPerEmployee || "Not available"}
        </Stat>
        <Stat label="Period change">
          {present(o.delta)
            ? (Number(o.delta) > 0 ? "+" : "") + count(o.delta)
            : "Not available"}
        </Stat>
      </div>
      <div className="drawer-section-title">Completion trend</div>
      <CompletionTrend
        current={o.trend}
        previous={data.comparison?.previous?.outcomes?.[o.key]}
        labels={
          Array.isArray(o.trendLabels)
            ? o.trendLabels
            : data.comparison?.current?.savingsLabels || []
        }
        currentLabel={data.filterContext?.label}
        previousLabel={data.comparison?.label}
      />
      <div className="drawer-note">
        Employee-level detail is de-identified. The employer sees aggregated
        outcomes only.{" "}
        {o.key === "credit"
          ? "Credit life replacement uses the applicable NCA substitution rules."
          : ""}
      </div>
    </DashboardDrawer>
  );
}
function CreditorDetail({ row: c, onClose }) {
  const stages = rows(c.stateBreakdown);
  return (
    <DashboardDrawer
      title={c.name}
      subtitle="Unsecured arrears, settlement journey"
      kind="creditor"
      onClose={onClose}
    >
      <div className="drawer-stats">
        <Stat label="Accounts in journey">{c.accounts}</Stat>
        <Stat label="Total balance">{c.balance}</Stat>
        <Stat label="Avg per account">{c.avg}</Stat>
      </div>
      <div className="drawer-section-title">Where accounts stand</div>
      <div className="hbar" style={{ marginTop: 10 }}>
        {stages.length ? (
          stages.map((s, i) => (
            <div
              className="hbar-row"
              key={i}
              style={{ gridTemplateColumns: "190px 1fr 68px" }}
            >
              <div className="hbar-lbl">{s.label}</div>
              <div className="hbar-track">
                <div
                  className="hbar-fill"
                  style={{ width: `${percent(s.pct)}%` }}
                />
              </div>
              <div className="hbar-val">
                {s.count} · {s.pct}%
              </div>
            </div>
          ))
        ) : (
          <div className="muted" style={{ padding: "10px 0", fontSize: 12.5 }}>
            No status breakdown available for this creditor.
          </div>
        )}
      </div>
      <div className="drawer-note">
        Employees deal with {c.name} directly through a guided, do-it-yourself
        settlement Not available no debt-review flag, no third party taking over
        their money. Figures aggregated across {c.accounts} employees.
      </div>
    </DashboardDrawer>
  );
}
export function ExecutiveInsight() {
  const data = useCharts();
  if (!data) return null;
  const w = data.wellness || {},
    pc = data.periodComparison,
    score = Number(w.score),
    prior = Number(w.prior),
    delta =
      Number.isFinite(score) && Number.isFinite(prior) ? score - prior : null,
    statements = [];
  if (present(w.score))
    statements.push(
      "Financial wellbeing score is " +
        score +
        "/100" +
        (delta === null
          ? ""
          : ", " +
            (delta > 0 ? "up " : delta < 0 ? "down " : "unchanged ") +
            Math.abs(delta) +
            " points versus " +
            (pc?.previous?.label || "the comparison period")) +
        ".",
    );
  if (present(pc?.current?.monthlyCashFreedUp))
    statements.push(
      "Monthly cash freed up is " + money(pc.current.monthlyCashFreedUp) + ".",
    );
  if (present(pc?.current?.totalAdvanced))
    statements.push(
      "Total advanced through early wage access is " +
        money(pc.current.totalAdvanced) +
        " in this period.",
    );
  return (
    <div className="enterprise-insight">
      <div className="enterprise-insight-eyebrow">Executive insight</div>
      <div className="enterprise-insight-copy">
        {statements.join(" ") ||
          "More data is required to produce an executive insight for this view."}
      </div>
    </div>
  );
}
export function DataTrust() {
  const data = useCharts(),
    [open, setOpen] = useState(false),
    close = useCallback(() => setOpen(false), []);
  useEffect(() => setOpen(false), [data]);
  if (!data) return null;
  const q = data.dataQuality || {},
    warnings = rows(q.warnings),
    state =
      warnings.length === 0
        ? "Good"
        : warnings.length <= 2
          ? "Attention"
          : "Incomplete";
  return (
    <>
      <button
        className={"data-trust-pill " + state.toLowerCase()}
        type="button"
        onClick={() => setOpen(true)}
      >
        <span className="data-trust-dot" />
        <span>
          Data quality: <strong>{state}</strong>
        </span>
      </button>
      {open ? (
        <DashboardDrawer
          title="Data quality"
          subtitle={data.filterContext?.label || "Selected view"}
          kind="outcome"
          onClose={close}
        >
          <div className="data-trust-grid">
            {[
              ["loadedFeedCount", "feeds loaded"],
              ["coreFeedCount", "core feeds"],
              ["workforceObservationRows", "workforce observations"],
              ["debtObservationRows", "debt observations"],
            ].map(([key, label]) => (
              <div key={key}>
                <strong>{q[key] ?? 0}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          {warnings.length ? (
            <ul className="data-trust-list">
              {warnings.map((w, i) => (
                <li key={i}>
                  {typeof w === "string" ? w : w.message || JSON.stringify(w)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data-quality warnings were returned for this view.</p>
          )}
        </DashboardDrawer>
      ) : null}
    </>
  );
}
