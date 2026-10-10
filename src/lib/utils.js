const integerFormat = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 0 });
const decimalFormat = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const percentFormat = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/** Bengali-numeral count, e.g. 33 -> ৩৩ */
export function formatNumber(value) {
  return Number.isFinite(value) ? integerFormat.format(value) : "—";
}

/** Whole numbers have no decimals (১,৮৫০); fractional values get two (৬৩.৫০). */
export function formatPrice(value) {
  if (!Number.isFinite(value)) return "—";
  return Number.isInteger(value) ? integerFormat.format(value) : decimalFormat.format(value);
}

export function formatTaka(value) {
  return `${formatPrice(value)} টাকা`;
}

export function formatPercent(pct) {
  return `${percentFormat.format(Math.abs(Number.isFinite(pct) ? pct : 0))}%`;
}

/** "up" | "down" | "flat" derived from the numeric percentage. */
export function getDirection(pct) {
  if (!Number.isFinite(pct) || pct === 0) return "flat";
  return pct > 0 ? "up" : "down";
}

const UNITS = {
  kg: { full: "প্রতি কেজি", short: "কেজি" },
  litre: { full: "প্রতি লিটার", short: "লিটার" },
  dozen: { full: "প্রতি ডজন", short: "ডজন" },
  piece: { full: "প্রতি পিস", short: "পিস" },
};

export function unitLabel(unit) {
  return UNITS[unit]?.full ?? (unit ? `প্রতি ${unit}` : "");
}

export function unitShort(unit) {
  return UNITS[unit]?.short ?? unit ?? "";
}

/** Only allow same-site relative paths as post-login destinations. */
export function safeCallbackUrl(url) {
  if (typeof url === "string" && url.startsWith("/") && !url.startsWith("//") && !url.startsWith("/\\")) {
    return url;
  }
  return "/";
}

export function formatBengaliDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}
