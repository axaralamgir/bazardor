// Dimensions mirror the real components so nothing jumps when data arrives.
export function ProductCardSkeleton() {
  return (
    <div className="surface p-4" aria-hidden="true">
      <div className="flex items-center gap-3">
        <div className="skeleton size-12 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-24" />
        </div>
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="লোড হচ্ছে">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeadingSkeleton() {
  return <div className="skeleton h-8 w-48" aria-hidden="true" />;
}

export function HeaderCardSkeleton() {
  return (
    <div className="surface flex items-center gap-4 p-5" aria-hidden="true">
      <div className="skeleton size-14 rounded-xl" />
      <div className="space-y-2">
        <div className="skeleton h-7 w-40" />
        <div className="skeleton h-4 w-56" />
      </div>
    </div>
  );
}
