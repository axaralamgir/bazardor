import Link from "next/link";
import ChangeBadge from "@/components/ChangeBadge";
import ProductIcon from "@/components/ProductIcon";
import { formatPrice, unitLabel } from "@/lib/utils";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="surface group block p-4 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="flex items-center gap-3">
        <ProductIcon image={product.image} />
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-tight">{product.nameBn}</h3>
          <p className="text-sm text-muted">{unitLabel(product.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-xl font-bold">
            {formatPrice(product.today)} <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge pct={product.pct} />
      </div>
    </Link>
  );
}
