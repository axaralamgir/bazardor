import Link from "next/link";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-10 pb-16">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <p className="mb-6 mt-2 text-center text-sm text-muted">{subtitle}</p>
      <div className="surface p-5 sm:p-6">{children}</div>
      <Link href="/" className="mt-6 text-center text-sm text-muted hover:text-brand">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
