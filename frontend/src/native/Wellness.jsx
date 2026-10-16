import React, { useSyncExternalStore } from "react";
import { Info } from "./Portfolio.jsx";
let snapshot = null;
const listeners = new Set();
const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
export function updateWellness(value) {
  snapshot = value;
  listeners.forEach((fn) => fn());
}
const hasValue = (v) =>
  v !== null &&
  v !== undefined &&
  v !== "" &&
  !(typeof v === "number" && Number.isNaN(v));
function tone(value) {
  const rag = value >= 60 ? "green" : value >= 40 ? "amber" : "red",
    token = value >= 60 ? "low" : value >= 40 ? "mid" : "high";
  return {
    c: `var(--chart-${token})`,
    bg: `color-mix(in srgb, var(--chart-${token}) 12%, white)`,
    border: `color-mix(in srgb, var(--chart-${token}) 32%, white)`,
    rag,
  };
}
function Lights({ state }) {
  return (
    <span className="rag-lights" aria-label={`RAG status: ${state}`}>
      {["red", "amber", "green"].map((c) => (
        <i key={c} className={`rag-dot ${c} ${state === c ? "on" : ""}`} />
      ))}
    </span>
  );
}
export function Wellness() {
  const data = useSyncExternalStore(subscribe, () => snapshot);
  if (!data) return null;
  const w = data.wellness || {},
    incomplete = data.live && (w.complete === false || !hasValue(w.score)),
    value = Math.max(0, Math.min(100, Number(w.score) || 0)),
    colour = tone(value),
    delta = hasValue(w.prior) ? w.score - w.prior : null;
  const drivers = (w.drivers || []).map((d, i) => {
    const available = d.available !== false && hasValue(d.score),
      score = available ? Number(d.score) : 0,
      driverTone = available ? tone(score) : { c: "var(--grey-l)" },
      status = !available
        ? "Unavailable"
        : score >= 75
          ? "Strong"
          : score >= 60
            ? "On track"
            : score >= 40
              ? "At risk"
              : "Critical",
      col = data.colours[i],
      key = data.metricKeys[i];
    return (
      <div
        key={i}
        className="wd-row"
        style={{ "--driver-color": col, "--driver-state": driverTone.c }}
      >
        <div className="wd-name">
          {d.name} {key && <Info name={key} definitions={data.definitions} />}
          <small>{d.note || ""}</small>
        </div>
        <div className="wd-meter">
          <div className="wd-track">
            <div
              className="wd-fill"
              style={{
                width: `${available ? score : 0}%`,
                background: available ? col : "var(--brand-soft)",
              }}
            />
          </div>
          <div className="wd-scale">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
        <div className="wd-val">
          {available ? score : "—"}
          <span>/100</span>
        </div>
        <div className="wd-state">
          <i />
          {status}
        </div>
      </div>
    );
  });
  return (
    <div className="wellness-inner">
      <div className="wellness-left">
        {incomplete ? (
          <>
            <div
              style={{
                fontFamily: "'Fraunces',serif",
                fontSize: 46,
                color: "var(--brand-primary)",
                lineHeight: 1,
              }}
            >
              Not available
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#8497a7",
                fontWeight: 800,
                marginTop: 4,
              }}
            >
              / 100
            </div>
            <div
              className="wellness-band"
              style={{
                color: "#8a6610",
                background: "#fff8e8",
                borderColor: "#efd49b",
              }}
            >
              <Lights state="amber" />
              Data incomplete
            </div>
            <div className="wellness-note">
              The score is calculated only when all required driver feeds are
              available. Missing data is never treated as zero.
            </div>
          </>
        ) : (
          <>
            <svg
              viewBox="0 0 160 96"
              width="180"
              style={{ display: "block", margin: "0 auto" }}
              role="img"
              aria-label={`Workforce Financial Wellness Score ${value} out of 100`}
            >
              <defs>
                <linearGradient
                  id="wellnessGaugeGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0" stopColor="var(--brand-grad-1)" />
                  <stop offset=".5" stopColor="var(--brand-grad-3)" />
                  <stop offset="1" stopColor="var(--brand-grad-5)" />
                </linearGradient>
              </defs>
              <path
                d="M16 88 A64 64 0 0 1 144 88"
                fill="none"
                stroke="var(--ice-2)"
                strokeWidth="13"
                strokeLinecap="round"
              />
              <path
                d="M16 88 A64 64 0 0 1 144 88"
                fill="none"
                stroke="url(#wellnessGaugeGradient)"
                strokeWidth="13"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray={`${value} ${100 - value}`}
                strokeDashoffset="0"
              />
              <text
                x="80"
                y="74"
                textAnchor="middle"
                fontFamily="Fraunces,serif"
                fontSize="34"
                fontWeight="600"
                fill={colour.c}
              >
                {value.toFixed(0)}
              </text>
              <text
                x="80"
                y="90"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="700"
                fill="#8497a7"
              >
                / 100
              </text>
            </svg>
            <div
              className="wellness-band"
              style={{
                color: colour.c,
                background: colour.bg,
                borderColor: colour.border,
              }}
            >
              <Lights state={colour.rag} />
              {w.band || "Index"}
            </div>
            <div className="wellness-delta">
              {delta === null
                ? "No prior period"
                : (delta > 0 ? "▲ +" + delta : "▼ " + delta) +
                  " pts vs. " +
                  (data.comparisonLabel || "previous period")}
            </div>
            <div className="wellness-note">
              A composite of four weighted drivers. Use it to track workforce
              financial health over time.
            </div>
          </>
        )}
      </div>
      <div className="wellness-right">
        {drivers.length ? (
          drivers
        ) : incomplete ? (
          <div className="muted">
            Required score drivers have not been loaded.
          </div>
        ) : null}
      </div>
    </div>
  );
}
