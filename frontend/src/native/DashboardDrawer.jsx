import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function DashboardDrawer({
  title,
  subtitle,
  kind = "",
  onClose,
  children,
}) {
  const panel = useRef(null),
    id = useId(),
    [shown, setShown] = useState(false);
  useEffect(() => {
    const previous = document.activeElement,
      overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => {
      setShown(true);
      panel.current?.querySelector("button")?.focus();
    });
    const keydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "Tab") {
        const targets = [
          ...panel.current.querySelectorAll(
            'button,[href],input,select,textarea,[tabindex="0"]',
          ),
        ].filter((node) => !node.disabled);
        const first = targets[0],
          last = targets[targets.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", keydown);
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, [onClose]);
  return createPortal(
    <>
      <div
        className={"drawer-backdrop" + (shown ? " show" : "")}
        onClick={onClose}
      />
      <div
        ref={panel}
        className={
          "drawer" + (kind ? " drawer-" + kind : "") + (shown ? " show" : "")
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
      >
        <div className="drawer-hd">
          <div>
            <div className="drawer-eyebrow">Drill-down</div>
            <div className="drawer-title" id={id}>
              {title}
            </div>
            <div className="drawer-sub">{subtitle}</div>
          </div>
          <button
            type="button"
            className="drawer-x"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="drawer-body">{children}</div>
      </div>
    </>,
    document.body,
  );
}
const count = (value) => Number(value).toLocaleString("en-ZA");
const series = (value) =>
  Array.isArray(value) ? value.map((v) => (v == null ? null : Number(v))) : [];
function countTicks(maxValue, target = 5) {
  const max = Math.max(1, Math.ceil(Number(maxValue) || 0));
  if (max <= target) return Array.from({ length: max + 1 }, (_, i) => i);
  const raw = max / target,
    magnitude = Math.pow(10, Math.floor(Math.log10(raw))),
    normalized = raw / magnitude,
    step =
      (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) *
      magnitude,
    top = Math.ceil(max / step) * step,
    ticks = [];
  for (let v = 0; v <= top + step / 2; v += step) ticks.push(Math.round(v));
  return ticks;
}
function shortLabel(label) {
  const parts = String(label || "")
    .trim()
    .split(/\s+/);
  return parts.length >= 2
    ? parts[0].slice(0, 3) + " " + parts[parts.length - 1].slice(-2)
    : String(label || "");
}
export function CompletionTrend({
  current,
  previous,
  labels = [],
  currentLabel,
  previousLabel,
}) {
  const a = series(current),
    b = series(previous),
    n = Math.max(a.length, b.length),
    aligned = [a, b].map((value) =>
      Array.from(
        { length: n },
        (_, i) => value[i - (n - value.length)] ?? null,
      ),
    ),
    values = aligned.flat().filter(Number.isFinite);
  if (!values.length)
    return (
      <div className="muted" style={{ padding: "10px 0", fontSize: 12.5 }}>
        No trend data is available for this period.
      </div>
    );
  const w = 700,
    h = 260,
    left = 58,
    right = 22,
    top = 24,
    bottom = 44,
    ticks = countTicks(Math.max(...values)),
    yMax = Math.max(1, ticks[ticks.length - 1] || 1),
    py = (v) => h - bottom - (v / yMax) * (h - bottom - top),
    px = (i) => left + (i * (w - left - right)) / Math.max(1, n - 1);
  const lineOf = (value) => {
    let started = false;
    return value
      .map((v, i) => {
        if (!Number.isFinite(v)) return "";
        const cmd = started ? "L" : "M";
        started = true;
        return cmd + px(i).toFixed(1) + " " + py(v).toFixed(1);
      })
      .filter(Boolean)
      .join(" ");
  };
  return (
    <>
      <div className="comparison-legend">
        <span>
          <i className="comparison-dot current" />
          {currentLabel || "Selected period"}
        </span>
        <span>
          <i className="comparison-dot previous" />
          {previousLabel || "Previous period"}
        </span>
      </div>
      <svg
        className="outcome-trend-chart"
        viewBox={`0 0 ${w} ${h}`}
        style={{ width: "100%", height: "auto" }}
        role="img"
        aria-label="Completion trend comparison"
      >
        <line
          x1={left}
          x2={left}
          y1={top}
          y2={h - bottom}
          stroke="var(--line)"
        />
        {ticks.map((v) => (
          <React.Fragment key={v}>
            <line
              x1={left}
              x2={w - right}
              y1={py(v)}
              y2={py(v)}
              stroke="var(--line-soft)"
              strokeWidth="1"
            />
            <text
              x={left - 10}
              y={py(v) + 3}
              textAnchor="end"
              fontSize="10"
              fontWeight="700"
              fill="var(--grey-l)"
            >
              {count(v)}
            </text>
          </React.Fragment>
        ))}
        {aligned.map((value, j) => (
          <path
            key={j}
            d={lineOf(value)}
            fill="none"
            stroke={j ? "var(--chart-engagement)" : "var(--chart-cashflow)"}
            strokeWidth={j ? "2.2" : "2.8"}
            strokeDasharray={j ? "6 5" : undefined}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {aligned.map((value, j) =>
          value.map((v, i) =>
            Number.isFinite(v) ? (
              <circle
                key={`${j}-${i}`}
                cx={px(i)}
                cy={py(v)}
                r={j ? 3.2 : 3.8}
                fill={j ? "var(--chart-engagement)" : "var(--chart-cashflow)"}
                stroke="var(--white)"
                strokeWidth="2"
              >
                <title>{count(v)}</title>
              </circle>
            ) : null,
          ),
        )}
        {Array.from({ length: n }, (_, i) => {
          const idx = labels.length ? i - (n - labels.length) : i,
            label = idx >= 0 ? labels[idx] : null;
          return label &&
            (i === 0 || i === n - 1 || i % (n > 8 ? 2 : 1) === 0) ? (
            <text
              key={i}
              x={px(i)}
              y={h - 14}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="600"
              fill="var(--grey-l)"
            >
              {shortLabel(label)}
            </text>
          ) : null;
        })}
      </svg>
    </>
  );
}
