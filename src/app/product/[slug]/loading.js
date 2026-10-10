export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-16" role="status" aria-label="লোড হচ্ছে">
      <div className="skeleton mb-5 h-5 w-56" />
      <div className="surface flex items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <div className="skeleton size-20 rounded-xl" />
          <div className="space-y-2">
            <div className="skeleton h-8 w-48" />
            <div className="skeleton h-4 w-40" />
          </div>
        </div>
        <div className="skeleton hidden h-28 w-40 rounded-xl sm:block" />
      </div>
      <div className="surface mt-5 p-6">
        <div className="skeleton h-6 w-40" />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-24 rounded-xl" />
          ))}
        </div>
        <div className="skeleton mt-8 h-64 rounded-xl" />
      </div>
    </div>
  );
}
