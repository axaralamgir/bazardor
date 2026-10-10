import EmptyState from "@/components/EmptyState";

export const metadata = { title: "পাতাটি পাওয়া যায়নি" };

export default function NotFound() {
  return (
    <EmptyState
      title="পাতাটি খুঁজে পাওয়া যায়নি"
      message="আপনি যে পাতা বা পণ্যটি খুঁজছেন তা নেই, অথবা লিংকটি ভুল হতে পারে।"
    />
  );
}
