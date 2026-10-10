import { HeaderCardSkeleton, ProductGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-16">
      <HeaderCardSkeleton />
      <div className="surface mt-5 h-[74px]" />
      <div className="mb-3 mt-5 h-5" />
      <ProductGridSkeleton count={6} />
    </div>
  );
}
