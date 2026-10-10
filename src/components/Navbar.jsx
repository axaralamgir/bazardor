import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getCategories } from "@/lib/api";
import BengaliDate from "@/components/BengaliDate";
import CategoryNav from "@/components/CategoryNav";
import UserMenu from "@/components/UserMenu";

export default async function Navbar() {
  let categories = [];
  try {
    categories = await getCategories();
  } catch {
    // The navbar must never take the whole page down; pages show their own API error state.
  }

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-brand">
          <span className="grid size-10 place-items-center rounded-xl bg-brand text-white">
            <ShoppingCart size={20} aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-bold">বাজার দর</span>
            <BengaliDate className="block h-4 text-xs text-muted" />
          </span>
        </Link>
        <UserMenu />
      </div>
      <CategoryNav categories={categories} />
    </header>
  );
}
