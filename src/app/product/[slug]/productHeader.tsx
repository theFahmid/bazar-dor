import { Product } from "@/app/types";
import { unitExpression } from "@/utils/unit";
import { bn1, bnInt } from "./format";

export default function ProductHeader({ product }: { product: Product }) {
  const pct = Math.abs(product.change.pct);
  const verb =
    product.change.dir === "up"
      ? "বেড়েছে"
      : product.change.dir === "down"
        ? "কমেছে"
        : "অপরিবর্তিত";
  const arrow =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";
  const trendClass =
    product.change.dir === "up"
      ? "text-error"
      : product.change.dir === "down"
        ? "text-success"
        : "text-base-content/70";

  return (
    <header className="rounded-2xl border border-base-300 bg-base-100 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span
          aria-hidden="true"
          className="grid size-20 shrink-0 place-items-center rounded-2xl bg-base-200 text-4xl"
        >
          {product.image}
        </span>
        <div className="flex-1">
          <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
          <p className="text-sm text-base-content/70">
            প্রতি {unitExpression(product.unit)} · {product.categoryNameBn}
          </p>
          <p className="mt-2 text-sm text-base-content/70">
            গতকালের তুলনায় আজ দাম{" "}
            <span className="font-semibold">{verb}</span> {bn1(pct)}%
          </p>
        </div>
        <div className="rounded-box bg-base-200 px-5 py-4 text-center">
          <p className="text-sm text-base-content/70">আজকের দাম</p>
          <p className="text-3xl font-bold">{bnInt(product.today)}</p>
          <p className="text-sm text-base-content/70">
            টাকা / {unitExpression(product.unit)}
          </p>
          <span
            className={`inline-flex items-center gap-1 font-semibold ${trendClass} text-sm`}
            title={verb}
          >
            <span aria-hidden="true">{arrow}</span>
            <span>{bn1(pct)}%</span>
          </span>
        </div>
      </div>
    </header>
  );
}
