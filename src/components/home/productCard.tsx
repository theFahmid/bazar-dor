import { Product } from "@/app/types";
import { unitExpression } from "@/utils/unit";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`products/${product.slug}`}>
      <div className="p-4 border-slate-300 border rounded-xl hover:border-green-500 hover:cursor-pointer flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2 text-xl rounded-xl bg-slate-100">
            {product.image}
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-md">{product.nameBn}</h4>
            <p className="text-gray-500 text-sm">
              প্রতি {unitExpression(product.unit)}
            </p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <p className="text-sm text-gray-400">আজকের দাম</p>
            <p className="flex items-end gap-2">
              <span className="text-xl font-bold">
                {product.today.toLocaleString("bn-bd")}
              </span>
              <span>টাকা</span>
            </p>
          </div>
          <div
            className={`badge badge-soft text-sm font-bold ${product.change.dir === "up" ? "badge-error" : product.change.dir === "down" ? "badge-success" : "badge-neutral"}`}
          >
            {product.change.dir === "up"
              ? `▲ ${product.change.pct.toLocaleString("bn-bd")}%`
              : product.change.dir === "down"
                ? `▼ ${product.change.pct.toLocaleString("bn-bd").slice(1)}%`
                : `— ${product.change.pct.toLocaleString("bn-bd")}%`}
          </div>
        </div>
      </div>
    </Link>
  );
}
