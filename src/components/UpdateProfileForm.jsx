"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Field from "@/components/Field";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";

export default function UpdateProfileForm({ initialName }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get("name") ?? "").trim();

    if (name.length < 2 || name.length > 60) {
      setError("নাম ২ থেকে ৬০ অক্ষরের মধ্যে হতে হবে।");
      toast.error("নামটি সঠিক নয়।", { id: "validation" });
      return;
    }
    setError("");

    setLoading(true);
    const { error: updateError } = await authClient.updateUser({ name });
    if (updateError) {
      toast.error(authErrorMessage(updateError), { id: "update-error" });
      setLoading(false);
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে।", { id: "update-success" });
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field id="name" type="text" label="নাম" defaultValue={initialName} autoComplete="name" error={error} />
      <button type="submit" className="btn btn-primary min-h-11 w-full" disabled={loading}>
        {loading && <span className="loading loading-spinner loading-sm" />}
        Update Information
      </button>
    </form>
  );
}
