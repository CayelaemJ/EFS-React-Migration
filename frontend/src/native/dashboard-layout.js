// Measuring rendered values is a layout effect; never truncate financial amounts.
let pending = null;
export function fitDashboardValues(root = document) {
  const nodes =
    root.querySelectorAll?.(
      ".kpi-value,.stat-value,.metric-value,.stat-cell .v,.rating-big,.stress-v,.hbar-val,.rb-val,.dp-pct",
    ) || [];
  for (const node of nodes) {
    node.style.whiteSpace = "nowrap";
    node.style.overflow = "visible";
    const original = parseFloat(getComputedStyle(node).fontSize);
    const min = Math.min(original, node.matches(".rating-big") ? 28 : 14);
    if (!node.parentElement || !Number.isFinite(original)) continue;
    node.style.fontSize = original + "px";
    let size = original;
    const maxWidth = Math.max(40, node.parentElement.clientWidth);
    while (size > min && node.scrollWidth > maxWidth + 1) {
      size = Math.max(min, size - 0.5);
      node.style.fontSize = size + "px";
    }
    if (node.scrollWidth > maxWidth + 1) node.style.fontSize = min + "px";
  }
}
export function scheduleDashboardFit() {
  if (pending !== null) cancelAnimationFrame(pending);
  pending = requestAnimationFrame(() => {
    pending = null;
    fitDashboardValues();
  });
}
export function cancelDashboardFit() {
  if (pending !== null) cancelAnimationFrame(pending);
  pending = null;
}
