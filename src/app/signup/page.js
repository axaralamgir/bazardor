import { Suspense } from "react";
import { redirect } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import SignUpForm from "@/components/SignUpForm";
import { getSession } from "@/lib/session";

export const metadata = { title: "সাইন আপ" };

export default async function SignUpPage() {
  if (await getSession()) redirect("/");

  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <Suspense fallback={<div className="skeleton h-96 w-full" />}>
        <SignUpForm />
      </Suspense>
    </AuthShell>
  );
}
