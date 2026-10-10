"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";

export default function UserMenu() {
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (isPending) return <div className="skeleton h-9 w-28 rounded-full" aria-hidden="true" />;

  if (!session) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm min-h-10 px-3 font-semibold">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm min-h-10 px-4 font-semibold">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = session;
  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex min-h-10 items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand"
      >
        <Avatar user={user} size={36} />
        <span className="hidden max-w-32 truncate text-sm font-medium sm:block">{user.name}</span>
        <ChevronDown size={14} aria-hidden="true" className="text-muted" />
      </button>

      {open && (
        <div role="menu" className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-line bg-surface p-4 shadow-lg">
          <p className="truncate font-semibold">{user.name}</p>
          <p className="truncate text-sm text-muted">{user.email}</p>
          <div className="mt-3 flex flex-col gap-1 border-t border-line pt-3">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm hover:bg-brand-soft"
            >
              <User size={16} aria-hidden="true" />
              আমার প্রোফাইল
            </Link>
            <SignOutButton
              onDone={() => setOpen(false)}
              className="flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm text-down hover:bg-down-soft"
            />
          </div>
        </div>
      )}
    </div>
  );
}
