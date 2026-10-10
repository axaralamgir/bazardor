import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Store } from "lucide-react";
import ChangeBadge from "@/components/ChangeBadge";
import MarketTable from "@/components/MarketTable";
import ProductIcon from "@/components/ProductIcon";
import { getProductBySlug } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { formatPrice, formatTaka, getDirection, unitLabel, unitShort } from "@/lib/utils";

function SummaryCard({ label, value, hint, tone }) {
  const color = tone === "up" ? "text-up" : tone === "down" ? "text-down" : "text-brand";
  return (
    <div className="rounded-xl border border-line p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>
        {value} <span className="text-sm font-medium">টাকা</span>
      </p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  // Server-side gate: nothing below runs (or renders) for a signed-out visitor.
  await requireSession(`/product/${slug}`);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const { markets } = product;
  const hasMarkets = markets.length > 0;
  const min = hasMarkets ? Math.min(...markets.map((m) => m.min)) : null;
  const max = hasMarkets ? Math.max(...markets.map((m) => m.max)) : null;
  const avg = hasMarkets
    ? Math.round(markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length)
    : null;

  const diff = product.yesterday === null ? null : product.today - product.yesterday;
  const dir = getDirection(diff);
  const unit = unitShort(product.unit);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-16">
      <nav aria-label="breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-brand">হোম</Link>
        <ChevronLeft size={14} className="rotate-180" aria-hidden="true" />
        <Link href={`/category/${product.category}`} className="hover:text-brand">{product.categoryNameBn}</Link>
        <ChevronLeft size={14} className="rotate-180" aria-hidden="true" />
        <span className="text-ink" aria-current="page">{product.nameBn}</span>
      </nav>

      <section className="surface flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <ProductIcon image={product.image} className="size-20 text-4xl" />
          <div>
            <h1 className="text-3xl font-bold leading-tight">{product.nameBn}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
              <span>{unitLabel(product.unit)}</span>
              <span aria-hidden="true">·</span>
              <Link href={`/category/${product.category}`} className="badge badge-outline">
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
            </div>
            {diff !== null && (
              <p className="mt-2 text-sm">
                {dir === "flat" ? (
                  <>গতকালের তুলনায় আজ দাম <strong>অপরিবর্তিত</strong></>
                ) : (
                  <>
                    গতকালের তুলনায় আজ দাম <strong>{dir === "up" ? "বেড়েছে" : "কমেছে"}</strong> · {formatTaka(Math.abs(diff))}
                  </>
                )}
              </p>
            )}
          </div>
        </div>
        <div className="rounded-xl bg-page px-6 py-4 text-center sm:min-w-40">
          <p className="text-sm text-muted">আজকের দাম</p>
          <p className="text-4xl font-bold">{formatPrice(product.today)}</p>
          <p className="text-sm text-muted">টাকা / {unit}</p>
          <ChangeBadge pct={product.pct} className="mt-2" />
        </div>
      </section>

      <section className="surface mt-5 p-5 sm:p-6" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="text-lg font-bold">দামের সারসংক্ষেপ</h2>
        {hasMarkets ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryCard label="সর্বনিম্ন দাম" value={formatPrice(min)} hint="সবচেয়ে কম দামের বাজার" tone="up" />
            <SummaryCard label="সর্বাধিক দাম" value={formatPrice(max)} hint="সবচেয়ে বেশি দামের বাজার" tone="down" />
            <SummaryCard label="গড় দাম" value={formatPrice(avg)} hint={`প্রতি ${unit}-এর হিসাবে`} />
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">দামের সারসংক্ষেপ তৈরির মতো বাজারভিত্তিক তথ্য নেই।</p>
        )}

        <h2 className="mb-3 mt-8 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {hasMarkets ? (
          <MarketTable markets={markets} />
        ) : (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-line px-4 py-10 text-center text-muted">
            <Store size={28} aria-hidden="true" />
            <p className="mt-2">এই পণ্যের বাজারভিত্তিক দাম এখনো পাওয়া যায়নি।</p>
          </div>
        )}
      </section>
    </div>
  );
}
