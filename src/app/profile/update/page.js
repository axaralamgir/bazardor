import Link from "next/link";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export const metadata = { title: "তথ্য আপডেট" };

export default async function UpdateProfilePage() {
  const { user } = await requireSession("/profile/update");

  return (
    <div className="mx-auto max-w-md px-4 py-8 pb-16">
      <h1 className="text-3xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mb-6 mt-1 text-sm text-muted">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p>
      <div className="surface p-5 sm:p-6">
        <UpdateProfileForm initialName={user.name} />
      </div>
      <Link href="/profile" className="mt-6 block text-center text-sm text-muted hover:text-brand">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}
