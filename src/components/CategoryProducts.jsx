"use client";

import { useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { formatNumber } from "@/lib/utils";

const OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function CategoryProducts({ products }) {
  const [sort, setSort] = useState("default");

  // Sort a copy by the numeric price (never the formatted Bengali string).
  const sorted = useMemo(() => {
    const copy = [...products];
    if (sort === "asc") copy.sort((a, b) => a.today - b.today);
    if (sort === "desc") copy.sort((a, b) => b.today - a.today);
    return copy;
  }, [products, sort]);

  return (
    <>
      <div className="surface mt-5 flex items-center justify-end gap-3 p-4">
        <label htmlFor="sort" className="text-sm text-muted">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered select-sm min-h-10"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <p className="mb-3 mt-5 text-sm text-muted">মোট {formatNumber(sorted.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={sorted} />
    </>
  );
}
