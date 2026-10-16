import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { Info } from "./Portfolio.jsx";
let snapshot = null;
const listeners = new Set();
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export function updateEmployerOverview(value) {
  snapshot = value;
  listeners.forEach((listener) => listener());
}
function useOverview() {
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
const number = (value) => Math.round(Number(value)).toLocaleString();
const money = (value) => "R " + Math.round(value).toLocaleString("en-ZA");
const series = (i) =>
  `var(${["--chart-engagement", "--chart-cashflow", "--chart-debt", "--chart-insurance", "--chart-workforce"][i]})`;
function Metric({ name, data }) {
  return name ? <Info name={name} definitions={data.definitions} /> : null;
}
export function ExecSummary() {
  const data = useOverview();
  if (!data) return null;
  const incomplete =
    data.live &&
    (data.wellness?.complete === false || !present(data.wellness?.score));
  const verdict = incomplete
    ? "Data incomplete"
    : data.live
      ? data.wellness.score >= 75
        ? "Strong"
        : data.wellness.score >= 60
          ? "On track"
          : "Needs attention"
      : "On track";
  return (
    <div className="exec-band reveal">
      <div className="exec-head">
        <div className="exec-pulse" />
        <div>
          <div className="exec-title">Financial wellbeing impact summary</div>
          <div className="exec-sub" id="exec-period">
            {data.period} · at a glance
          </div>
        </div>
        <div
          className={
            "exec-verdict " +
            (incomplete
              ? "is-incomplete"
              : verdict === "Needs attention"
                ? "is-needs-attention"
                : "")
          }
        >
          {verdict}
        </div>
      </div>
      <div className="exec-grid">
        {(data.exec?.items || []).map((item, i) => (
          <div className="exec-item" key={i}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="var(--chart-cashflow)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <div className="exec-v">{item.v}</div>
              <div className="exec-l">
                {item.l} <Metric name={data.keys.exec[i]} data={data} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Icon({ index }) {
  return (
    <span
      className="kpi-ico"
      style={{
        background: [
          "var(--brand-soft)",
          "var(--brand-soft)",
          "#e7f7ef",
          "#fdf3e2",
        ][index],
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24">
        {index === 0 ? (
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
        ) : index === 1 ? (
          <path
            d="M13 3L5 13h6l-1 8 8-10h-6l1-8z"
            stroke="var(--chart-cashflow)"
            strokeWidth="1.7"
            fill="none"
            strokeLinejoin="round"
          />
        ) : index === 2 ? (
          <path
            d="M12 4v16m4-13H10a2.5 2.5 0 000 5h4a2.5 2.5 0 010 5H8"
            stroke="var(--chart-cashflow)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z"
            stroke="var(--chart-mid)"
            strokeWidth="1.6"
            fill="none"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </span>
  );
}
export function Sparkline({ points, colour }) {
  if (
    !Array.isArray(points) ||
    points.length < 2 ||
    points.some((value) => !present(value))
  )
    return null;
  const w = 180,
    h = 54,
    max = Math.max(...points),
    min = Math.min(...points),
    norm = (v) => h - 6 - ((v - min) / (max - min || 1)) * (h - 14),
    step = w / (points.length - 1),
    path = points
      .map(
        (p, i) =>
          (i ? "L" : "M") + (i * step).toFixed(1) + " " + norm(p).toFixed(1),
      )
      .join(" ");
  return (
    <svg
      className="kpi-spark"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
    >
      <path
        d={path + ` L${w} ${h} L0 ${h} Z`}
        fill={colour}
        fillOpacity=".08"
      />
      <path
        d={path}
        fill="none"
        stroke={colour}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function AnimatedNumber({ target, decimals = 0, index, refresh }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame;
    const start = performance.now() + 120 + index * 60;
    setValue(0);
    const tick = (now) => {
      if (now < start) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (now - start) / 750);
      setValue(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
      else refresh.fit?.();
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, index, refresh]);
  return (
    <span className="kpi-num">
      {decimals ? value.toFixed(decimals) : number(value)}
    </span>
  );
}
function Kpi({ card, index, data }) {
  const available = card.data?.available !== false && present(card.value),
    delta = card.data?.delta;
  let comparison = "No comparison available";
  if (delta !== null && delta !== undefined && delta !== "") {
    const n = Number(delta),
      label = data.comparison || "previous period";
    if (!Number.isFinite(n)) comparison = String(delta) + " vs. " + label;
    else {
      const absolute = Math.abs(n),
        value = card.money
          ? money(absolute)
          : card.decimals
            ? absolute.toFixed(card.decimals) + " pts"
            : Math.round(absolute) + " pts";
      comparison =
        (n > 0 ? "▲" : n < 0 ? "▼" : "•") +
        " " +
        (n > 0 ? "+" : n < 0 ? "-" : "") +
        value +
        " vs. " +
        label;
    }
  }
  return (
    <div
      className="card kpi reveal"
      style={{ animationDelay: index * 0.06 + "s" }}
    >
      <div className="kpi-label">
        <Icon index={index} />
        {card.label}
        <Metric name={card.key} data={data} />
      </div>
      <div className="kpi-value">
        {available && card.money && <span className="cur">R</span>}
        {available ? (
          <AnimatedNumber
            target={Number(card.value)}
            decimals={card.decimals || 0}
            index={index}
            refresh={data}
          />
        ) : (
          <span className="kpi-num">Not available</span>
        )}
        {available && card.suffix && (
          <span style={{ fontSize: 18 }}>{card.suffix}</span>
        )}
      </div>
      <div className="kpi-sub">
        {available ? (
          <span className="delta">{comparison}</span>
        ) : (
          <span className="overview-unavailable" style={{ color: "#8497a7" }}>
            Data not loaded
          </span>
        )}
      </div>
      {available && (
        <Sparkline
          points={card.data?.trend}
          colour={
            [
              series(2),
              series(1),
              "var(--chart-cashflow)",
              "var(--chart-engagement)",
            ][index]
          }
        />
      )}
    </div>
  );
}
export function EmployerKpis() {
  const data = useOverview();
  if (!data) return null;
  const k = data.kpis || {},
    cards = [
      {
        label: "Programme take-up",
        key: "takeUp",
        data: k.takeUp,
        value: k.takeUp?.pct,
        suffix: "%",
      },
      {
        label: "Actively engaged",
        key: "engaged",
        data: k.activated,
        value: k.activated?.pct,
        suffix: "%",
      },
      {
        label: "Cash freed up / month",
        key: "saving",
        data: k.monthlySaving,
        value: k.monthlySaving?.rand,
        money: true,
      },
      {
        label: "Avg experience rating",
        key: "rating",
        data: k.avgRating,
        value: k.avgRating?.val,
        suffix: "/5",
        decimals: 1,
      },
    ];
  return cards.map((card, index) => (
    <Kpi key={card.key} card={card} index={index} data={data} />
  ));
}
function FunnelRow({ item, index, data }) {
  const [width, setWidth] = useState(0),
    available =
      item.available !== false && present(item.n) && present(item.pct);
  useLayoutEffect(() => {
    setWidth(0);
    if (!available) return;
    const timer = setTimeout(() => setWidth(item.pct), 120 + index * 90);
    return () => clearTimeout(timer);
  }, [available, item.pct, index, data]);
  return (
    <div className="funnel-row">
      <div className="funnel-lbl">
        {item.label} <Metric name={data.keys.funnel[index]} data={data} />
        <small>{available ? item.sub : "Data not loaded"}</small>
      </div>
      <div className="funnel-bar-bg">
        <div
          className="funnel-bar"
          style={{
            width: width + "%",
            background: available ? series(index) : "var(--brand-soft)",
          }}
        >
          {available ? item.pct + "%" : "Not available"}
        </div>
      </div>
      <div className="funnel-val">
        {available ? Number(item.n).toLocaleString("en-ZA") : "Not available"}
      </div>
    </div>
  );
}
export function EngagementFunnel() {
  const data = useOverview();
  if (!data) return null;
  return (data.funnel || []).map((item, index) => (
    <FunnelRow key={index} item={item} index={index} data={data} />
  ));
}
export function ValueStrip() {
  const data = useOverview();
  if (!data) return null;
  return (
    <div className="stat-strip reveal">
      {(data.valueStrip || []).map((item, index) => (
        <div className="stat-cell" key={index}>
          <div className="l">
            {item.l} <Metric name={data.keys.value[index]} data={data} />
          </div>
          <div className="v">{item.v}</div>
          <div className="d">{item.d}</div>
        </div>
      ))}
    </div>
  );
}
