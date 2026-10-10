"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryNav({ categories }) {
  const pathname = usePathname();
  if (!categories.length) return null;

  return (
    <nav aria-label="পণ্যের ধরন" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4">
        <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {categories.map((category) => {
            const active = pathname === `/category/${category.slug}`;
            return (
              <li key={category.id} className="shrink-0">
                <Link
                  href={`/category/${category.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand ${
                    active ? "bg-brand text-white" : "text-ink hover:bg-brand-soft"
                  }`}
                >
                  <span aria-hidden="true">{category.icon}</span>
                  {category.nameBn}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
