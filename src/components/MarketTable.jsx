import { formatPrice } from "@/lib/utils";

export default function MarketTable({ markets }) {
  // Cheapest market first. Sort a copy; the average is the midpoint of the market's min and max.
  const rows = [...markets]
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.min - b.min || a.max - b.max);

  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-page text-muted">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">বাজার</th>
            <th scope="col" className="px-4 py-3 font-medium">বিভাগ</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">গড়</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.market}-${row.division}`} className="border-t border-line even:bg-page/50">
              <th scope="row" className="px-4 py-3 font-medium">{row.market}</th>
              <td className="px-4 py-3">{row.division}</td>
              <td className="px-4 py-3 text-right">{formatPrice(row.min)} টাকা</td>
              <td className="px-4 py-3 text-right">{formatPrice(row.max)} টাকা</td>
              <td className="px-4 py-3 text-right font-bold">{formatPrice(row.avg)} টাকা</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
