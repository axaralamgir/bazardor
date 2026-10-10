import Link from "next/link";
import { SearchX } from "lucide-react";

export default function EmptyState({
  icon: Icon = SearchX,
  title,
  message,
  actionHref = "/",
  actionLabel = "হোম পেজে ফিরে যান",
  children,
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-brand-soft text-brand">
        <Icon size={36} aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-2xl font-bold">{title}</h1>
      {message && <p className="mt-2 text-muted">{message}</p>}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {children}
        <Link href={actionHref} className="btn btn-primary">
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}
