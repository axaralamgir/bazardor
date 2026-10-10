import Link from "next/link";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import { requireSession } from "@/lib/session";

export const metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");

  // Only expose the fields we display, never the raw session/user record.
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 pb-16">
      <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
      <p className="mb-6 mt-1 text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <section className="surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar user={user} size={80} />
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold">{user.name}</p>
            <p className="truncate text-muted">{user.email}</p>
          </div>
        </div>
        <SignOutButton className="btn btn-outline btn-error min-h-11" />
      </section>

      <section className="surface mt-5 p-5">
        <h2 className="text-lg font-bold">তথ্য</h2>
        <dl className="mt-3 divide-y divide-line text-sm">
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-muted">নাম</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-muted">ইমেইল</dt>
            <dd className="truncate font-medium">{user.email}</dd>
          </div>
        </dl>
        <Link href="/profile/update" className="btn btn-primary mt-4 min-h-11 w-full">
          Update Information
        </Link>
      </section>
    </div>
  );
}
