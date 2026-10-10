import { formatPercent, getDirection } from "@/lib/utils";

const STYLES = {
  up: "bg-up-soft text-up",
  down: "bg-down-soft text-down",
  flat: "bg-flat-soft text-flat",
};
const ARROWS = { up: "▲", down: "▼", flat: "—" };
const LABELS = { up: "বেড়েছে", down: "কমেছে", flat: "অপরিবর্তিত" };

export default function ChangeBadge({ pct, className = "" }) {
  const dir = getDirection(pct);
  return (
    <span
      aria-label={`দাম ${LABELS[dir]} ${formatPercent(pct)}`}
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[dir]} ${className}`}
    >
      <span aria-hidden="true">{ARROWS[dir]}</span>
      {formatPercent(pct)}
    </span>
  );
}
