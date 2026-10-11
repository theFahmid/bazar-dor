import { Product } from "@/app/types";
import { unitExpression } from "@/utils/unit";
import { bnAvg, bnInt, marketAvg } from "./format";

export default function ProductMarkets({ product }: { product: Product }) {
  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const minPrice = mins.length ? Math.min(...mins) : product.today;
  const maxPrice = maxs.length ? Math.max(...maxs) : product.today;
  const rows = [...product.markets].sort(
    (a, b) => marketAvg(a) - marketAvg(b),
  );

  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
      <div className="flex flex-col gap-6">
        <section>
          <h2 className="mb-3 text-lg font-semibold">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="stat rounded-box border border-base-300 bg-base-100">
              <div className="stat-title">সর্বনিম্ন দাম</div>
              <div className="stat-value text-2xl text-success">
                {bnInt(minPrice)}
                <span className="text-sm font-medium"> টাকা</span>
              </div>
              <div className="stat-desc">সবচেয়ে কম দামের বাজার</div>
            </div>
            <div className="stat rounded-box border border-base-300 bg-base-100">
              <div className="stat-title">সর্বাধিক দাম</div>
              <div className="stat-value text-2xl text-error">
                {bnInt(maxPrice)}
                <span className="text-sm font-medium"> টাকা</span>
              </div>
              <div className="stat-desc">সবচেয়ে বেশি দামের বাজার</div>
            </div>
            <div className="stat rounded-box border border-base-300 bg-base-100">
              <div className="stat-title">গড় দাম</div>
              <div className="stat-value text-2xl text-primary">
                {bnInt(product.today)}
                <span className="text-sm font-medium"> টাকা</span>
              </div>
              <div className="stat-desc">
                প্রতি {unitExpression(product.unit)}-এর হিসাবে
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বাধিক</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((market) => (
                  <tr key={`${market.market}-${market.division}`}>
                    <td className="font-medium">{market.market}</td>
                    <td className="text-base-content/70">{market.division}</td>
                    <td className="text-right">{bnInt(market.min)} টাকা</td>
                    <td className="text-right">{bnInt(market.max)} টাকা</td>
                    <td className="text-right font-semibold">
                      {bnAvg(marketAvg(market))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
