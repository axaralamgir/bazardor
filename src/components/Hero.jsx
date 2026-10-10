import BengaliDate from "@/components/BengaliDate";

function Basket() {
  return (
    <svg viewBox="0 0 240 190" className="h-auto w-full max-w-60" role="img" aria-label="সবজির ঝুড়ি">
      <ellipse cx="120" cy="172" rx="100" ry="12" fill="#e2e8de" />
      <path d="M74 52c2-14 14-24 26-22" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M138 38c0-14 6-22 14-26" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="96" cy="74" r="30" fill="#ef4444" />
      <circle cx="146" cy="64" r="30" fill="#22c55e" />
      <circle cx="64" cy="102" r="20" fill="#a855f7" />
      <circle cx="118" cy="98" r="17" fill="#f97316" />
      <circle cx="176" cy="98" r="19" fill="#f59e0b" />
      <path d="M38 108h164l-16 58a8 8 0 0 1-8 6H62a8 8 0 0 1-8-6z" fill="#b45309" />
      <rect x="34" y="104" width="172" height="12" rx="5" fill="#92400e" />
      <g stroke="#78350f" strokeWidth="3" strokeLinecap="round">
        <path d="M78 118l6 48M104 118v50M136 118v50M162 118l-6 48" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="surface flex flex-col items-start gap-6 overflow-hidden p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl">
        <BengaliDate className="inline-block min-h-6 rounded-full bg-brand-soft px-3 py-0.5 text-xs font-medium text-brand" />
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
        <p className="mt-3 text-muted">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        {/* Plain anchor: same-page scroll to the section, never a route change. */}
        <a href="#সব-পণ্য" className="btn btn-primary mt-5">
          সব পণ্য দেখুন
        </a>
      </div>
      <div className="flex w-full justify-center md:w-auto">
        <Basket />
      </div>
    </section>
  );
}
