"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Field from "@/components/Field";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import { safeCallbackUrl } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const rawCallback = params.get("callbackUrl");
  const callbackUrl = safeCallbackUrl(rawCallback);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    const nextErrors = {};
    if (name.length < 2) nextErrors.name = "নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
    if (!EMAIL_PATTERN.test(email)) nextErrors.email = "সঠিক ইমেইল ঠিকানা দিন।";
    if (password.length < 8) nextErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    if (confirm !== password) nextErrors.confirm = "পাসওয়ার্ড দুটি মিলছে না।";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast.error("ফর্মের ভুলগুলো ঠিক করুন।", { id: "validation" });
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    if (error) {
      toast.error(authErrorMessage(error), { id: "signup-error" });
      setLoading(false);
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এবার সাইন ইন করুন।", { id: "signup-success" });
    router.push(rawCallback ? `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/signin");
  }

  const signInHref = rawCallback ? `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/signin";

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <Field id="name" type="text" label="নাম" placeholder="যেমন: রহিম উদ্দিন" autoComplete="name" error={errors.name} />
        <Field id="email" type="email" label="ইমেইল" placeholder="you@example.com" autoComplete="email" error={errors.email} />
        <Field id="password" type="password" label="পাসওয়ার্ড" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="new-password" error={errors.password} />
        <Field id="confirm" type="password" label="পাসওয়ার্ড নিশ্চিত করুন" placeholder="আবার লিখুন" autoComplete="new-password" error={errors.confirm} />
        <button type="submit" className="btn btn-primary min-h-11 w-full" disabled={loading}>
          {loading && <span className="loading loading-spinner loading-sm" />}
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>
      <div className="divider my-4 text-xs text-muted">অথবা</div>
      <SocialButtons callbackURL={callbackUrl} />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href={signInHref} className="font-medium text-brand hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}
