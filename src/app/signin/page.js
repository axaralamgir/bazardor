import { Suspense } from "react";
import { redirect } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import SignInForm from "@/components/SignInForm";
import { getSession } from "@/lib/session";
import { safeCallbackUrl } from "@/lib/utils";

export const metadata = { title: "সাইন ইন" };

export default async function SignInPage({ searchParams }) {
  const { callbackUrl } = await searchParams;
  if (await getSession()) redirect(safeCallbackUrl(callbackUrl));

  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <Suspense fallback={<div className="skeleton h-64 w-full" />}>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
