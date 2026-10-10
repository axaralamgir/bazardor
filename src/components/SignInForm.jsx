"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Field from "@/components/Field";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import { safeCallbackUrl } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const rawCallback = params.get("callbackUrl");
  const callbackUrl = safeCallbackUrl(rawCallback);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toastShown = useRef(false);

  // Server-side redirects land here with ?reason=protected; show the toast once.
  useEffect(() => {
    if (params.get("reason") === "protected" && !toastShown.current) {
      toastShown.current = true;
      toast("এই পাতাটি দেখতে আগে সাইন ইন করুন।", { id: "protected-redirect", icon: "🔒" });
    }
  }, [params]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const nextErrors = {};
    if (!EMAIL_PATTERN.test(email)) nextErrors.email = "সঠিক ইমেইল ঠিকানা দিন।";
    if (password.length < 8) nextErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast.error("ফর্মের ভুলগুলো ঠিক করুন।", { id: "validation" });
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      toast.error(authErrorMessage(error), { id: "signin-error" });
      setLoading(false);
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে।", { id: "signin-success" });
    router.push(callbackUrl);
    router.refresh();
  }

  const signUpHref = rawCallback ? `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/signup";

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <Field id="email" type="email" label="ইমেইল" placeholder="you@example.com" autoComplete="email" error={errors.email} />
        <Field id="password" type="password" label="পাসওয়ার্ড" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="current-password" error={errors.password} />
        <button type="submit" className="btn btn-primary min-h-11 w-full" disabled={loading}>
          {loading && <span className="loading loading-spinner loading-sm" />}
          সাইন ইন
        </button>
      </form>
      <div className="divider my-4 text-xs text-muted">অথবা</div>
      <SocialButtons callbackURL={callbackUrl} />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href={signUpHref} className="font-medium text-brand hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
