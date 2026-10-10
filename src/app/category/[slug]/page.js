import { notFound } from "next/navigation";
import { PackageOpen } from "lucide-react";
import CategoryProducts from "@/components/CategoryProducts";
import EmptyState from "@/components/EmptyState";
import { getCategoryBySlug, getCategoryProducts } from "@/lib/api";
import { formatNumber } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug).catch(() => null);
  return { title: category ? category.nameBn : "ক্যাটাগরি" };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  // A failed request throws (-> error.js); only a truly unknown slug is a 404.
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const products = await getCategoryProducts(slug);

  if (products.length === 0) {
    return (
      <EmptyState
        icon={PackageOpen}
        title={`${category.nameBn} ক্যাটাগরিতে এখন কোনো পণ্য নেই`}
        message="অন্য ক্যাটাগরি দেখুন অথবা পরে আবার চেষ্টা করুন।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-16">
      <header className="surface flex items-center gap-4 p-5">
        <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-page text-3xl" aria-hidden="true">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-muted">{formatNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </header>
      <CategoryProducts products={products} />
    </div>
  );
}
