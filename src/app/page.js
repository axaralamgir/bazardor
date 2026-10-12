import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/EmptyState";
import { HeadingSkeleton, ProductGridSkeleton } from "@/components/Skeletons";
import { getProducts } from "@/lib/api";
import { formatNumber } from "@/lib/utils";

function SectionHeading({ children, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="flex items-center gap-2 text-2xl font-bold">{children}</h2>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}

async function HomeSections() {
  const products = await getProducts(); // API failures bubble up to app/error.js

  if (products.length === 0) {
    return <EmptyState title="কোনো পণ্য পাওয়া যায়নি" message="এখন দেখানোর মতো কোনো দামের তথ্য নেই। পরে আবার চেষ্টা করুন।" />;
  }

  // Sort by the numeric percentage on copies; never rely on API order.
  const rising = products.filter((p) => p.pct > 0).sort((a, b) => b.pct - a.pct).slice(0, 6);
  const falling = products.filter((p) => p.pct < 0).sort((a, b) => a.pct - b.pct).slice(0, 6);

  return (
    <>
      {rising.length > 0 && (
        <section aria-labelledby="rising-heading" className="mt-10">
          <SectionHeading>
            <span aria-hidden="true" className="text-base text-up">▲</span>
            <span id="rising-heading">আজ দাম বেড়েছে</span>
          </SectionHeading>
          <ProductGrid products={rising} />
        </section>
      )}

      {falling.length > 0 && (
        <section aria-labelledby="falling-heading" className="mt-10">
          <SectionHeading>
            <span aria-hidden="true" className="text-base text-down">▼</span>
            <span id="falling-heading">আজ দাম কমেছে</span>
          </SectionHeading>
          <ProductGrid products={falling} />
        </section>
      )}

      <section id="সব-পণ্য" aria-labelledby="all-heading" className="mt-10 scroll-mt-6">
        <SectionHeading subtitle={`মোট ${formatNumber(products.length)}টি পণ্য দেখানো হচ্ছে`}>
          <span id="all-heading">সব পণ্য</span>
        </SectionHeading>
        <ProductGrid products={products} />
      </section>
    </>
  );
}

function HomeSkeleton() {
  return (
    <div className="mt-10 space-y-10">
      {[6, 6, 9].map((count, i) => (
        <section key={i}>
          <div className="mb-4">
            <HeadingSkeleton />
          </div>
          <ProductGridSkeleton count={count} />
        </section>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-16">
      <Hero />
      <Suspense fallback={<HomeSkeleton />}>
        <HomeSections />
      </Suspense>
    </div>
  );
}
