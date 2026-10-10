"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton({ className = "", onDone }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।", { id: "signout-error" });
      setLoading(false);
      return;
    }
    onDone?.();
    toast.success("সফলভাবে সাইন আউট হয়েছে।", { id: "signout" });
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleSignOut} disabled={loading} className={className}>
      {loading ? <span className="loading loading-spinner loading-xs" /> : <LogOut size={16} aria-hidden="true" />}
      সাইন আউট
    </button>
  );
}
