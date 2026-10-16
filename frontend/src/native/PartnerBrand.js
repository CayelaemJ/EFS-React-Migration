import BrandEngine from "../lib/brand-engine.js";
export { BrandEngine };
export const presets = [
  {
    name: "FNB (test)",
    initials: "FNB",
    primaryColor: "003C64",
    accentColor: "00A651",
    navyColor: "003C64",
    tagline: "First National Bank — test client",
  },
  {
    name: "ABSA (test)",
    initials: "AB",
    primaryColor: "A6192E",
    accentColor: "DC1928",
    navyColor: "6E0E1B",
    tagline: "Absa — test client",
  },
  {
    name: "Capitec (test)",
    initials: "CB",
    primaryColor: "004B87",
    accentColor: "E4002B",
    navyColor: "002B4D",
    tagline: "Capitec Bank — test client",
  },
  {
    name: "Standard Bank (test)",
    initials: "SB",
    primaryColor: "0033A0",
    accentColor: "1F63D6",
    navyColor: "001F5C",
    tagline: "Standard Bank — test client",
  },
  {
    name: "Nedbank (test)",
    initials: "NB",
    primaryColor: "00703C",
    accentColor: "00A651",
    navyColor: "003D22",
    tagline: "Nedbank — test client",
  },
];
export function dummyLogo(preset) {
  return (
    "data:image/svg+xml;base64," +
    btoa(
      `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" rx="32" fill="#${preset.accentColor}"/><text x="80" y="98" font-family="Manrope,Arial,sans-serif" font-size="58" font-weight="800" fill="#ffffff" text-anchor="middle">${preset.initials}</text></svg>`,
    )
  );
}
export function brand(p) {
  return {
    accentColor: String(p.accentColor || p.primaryColor || "B15BE8").replace(
      /^#/,
      "",
    ),
    primaryColor: String(p.primaryColor || p.accentColor || "32217C").replace(
      /^#/,
      "",
    ),
    navyColor: String(p.navyColor || p.primaryColor || "32217C").replace(
      /^#/,
      "",
    ),
  };
}
export function tileTheme(p) {
  const b = brand(p),
    tokens = BrandEngine.themeTokens(b, "dark"),
    surface = tokens["--bar-bg"];
  const readable = (value) =>
    "#" +
    BrandEngine.ensureContrast(
      String(value).replace(/^#/, ""),
      surface.replace(/^#/, ""),
      4.5,
    );
  const accent = readable(b.accentColor);
  return {
    "--preview-surface": surface,
    "--preview-text": readable(tokens["--brand-primary"]),
    "--preview-muted": readable(tokens["--grey"]),
    "--preview-accent": accent,
    "--preview-on-accent":
      BrandEngine.contrast("FFFFFF", accent.slice(1)) >= 4.5
        ? "#fff"
        : "#0b0f19",
    "--preview-line": tokens["--dm-line"],
    "--preview-logo-bg": "#fff",
  };
}
export function previewTheme(p, dark) {
  const tokens = BrandEngine.themeTokens(brand(p), dark ? "dark" : "light"),
    accent = tokens["--blue"];
  return {
    "--preview-bg": tokens["--dm-bg"] || tokens["--ent-paper"] || "#f6f4fb",
    "--preview-surface": tokens["--white"] || "#fff",
    "--preview-surface-2": tokens["--ice"] || "#f3efff",
    "--preview-navy": tokens["--brand-primary"],
    "--preview-blue": accent,
    "--preview-line": tokens["--line"],
    "--preview-ink": tokens["--ink"],
    "--preview-muted": tokens["--grey"],
    "--preview-on-accent":
      BrandEngine.contrast("FFFFFF", accent.replace(/^#/, "")) < 4.5
        ? "#0b0f19"
        : "#fff",
    "--preview-logo-bg": "#fff",
  };
}
export function readLogo(file) {
  if (file.size > 500000)
    return Promise.reject(new Error("Please use a logo under 500KB."));
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read this logo."));
    reader.readAsDataURL(file);
  });
}
export async function detectLogo(logo, signal) {
  let profile = null;
  try {
    const response = await fetch("/api/admin/brand-learning/profile", {
      cache: "no-store",
      signal,
    });
    if (response.ok) profile = await response.json();
  } catch {}
  return BrandEngine.extractFromImage(logo, 256, profile);
}
export async function learn(detected, signal) {
  if (!detected) return;
  try {
    await fetch("/api/admin/brand-learning/observe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal,
      body: JSON.stringify({
        engineVersion: BrandEngine.VERSION,
        palette: detected.palette || [],
        confidence: Number(detected.confidence || 0),
        accepted: Number(detected.confidence || 0) >= 0.7,
      }),
    });
  } catch {}
}
export function logoPayload(logo, detected) {
  return detected
    ? {
        logoDataUrl: logo,
        primaryColor: detected.primaryColor,
        accentColor: detected.accentColor,
        navyColor: detected.navyColor,
        brandEngineVersion: BrandEngine.VERSION,
        brandDetectionStatus:
          Number(detected.confidence || 0) >= 0.7
            ? "AUTO_ACCEPTED"
            : "NEEDS_REVIEW",
        brandDetectionConfidence: Number(detected.confidence || 0),
        brandDetectionWarnings: detected.warnings || [],
        brandDetectionDiagnostics: detected.diagnostics || {},
        brandDetectedPalette: detected.palette || [],
      }
    : { logoDataUrl: logo };
}
export function brandSummary(detected) {
  if (!detected) return "";
  return (
    `Detected accent #${detected.accentColor}, secondary #${detected.primaryColor}, brand bar #${detected.navyColor} (${Math.round(Number(detected.confidence || 0) * 100)}% confidence).` +
    (detected.warnings?.length ? " " + detected.warnings[0] : "")
  );
}
