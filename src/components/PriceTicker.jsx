import { getProducts } from "@/lib/api";
import { formatPercent, formatPrice, getDirection, unitShort } from "@/lib/utils";

const COLORS = { up: "text-up", down: "text-down", flat: "text-flat" };
const ARROWS = { up: "▲", down: "▼", flat: "—" };

export default async function PriceTicker() {
  let products = [];
  try {
    products = await getProducts();
  } catch {
    return null; // pages report API problems themselves
  }
  if (!products.length) return null;

  // Two identical groups + translateX(-50%) = seamless loop with no empty gap.
  return (
    <div className="ticker-viewport overflow-hidden border-b border-line bg-surface" aria-label="আজকের দামের তালিকা" role="region">
      <div className="ticker-track flex w-max animate-ticker">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1 ? "true" : undefined}>
            {products.map((p) => {
              const dir = getDirection(p.pct);
              return (
                <li key={p.id} className="flex items-center gap-2 whitespace-nowrap border-r border-line px-4 py-2 text-sm">
                  <span aria-hidden="true">{p.image}</span>
                  <span className="font-medium">{p.nameBn}</span>
                  <span className="text-muted">
                    {formatPrice(p.today)} টাকা/{unitShort(p.unit)}
                  </span>
                  <span className={`font-semibold ${COLORS[dir]}`}>
                    {ARROWS[dir]} {formatPercent(p.pct)}
                  </span>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
