"use client";

import { useRouter } from "next/navigation";
import { RefreshCw, WifiOff } from "lucide-react";
import EmptyState from "@/components/EmptyState";

// Shown for temporary failures (API down, DB down). A genuinely missing resource
// calls notFound() instead and gets app/not-found.js.
export default function GlobalError({ reset }) {
  const router = useRouter();
  return (
    <EmptyState
      icon={WifiOff}
      title="তথ্য লোড করা যায়নি"
      message="সার্ভারের সাথে যোগাযোগ করতে সমস্যা হচ্ছে। একটু পরে আবার চেষ্টা করুন।"
    >
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => {
          router.refresh();
          reset();
        }}
      >
        <RefreshCw size={16} aria-hidden="true" />
        আবার চেষ্টা করুন
      </button>
    </EmptyState>
  );
}
