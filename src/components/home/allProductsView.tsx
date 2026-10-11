"use client";

import { useMemo, useState } from "react";
import { Product } from "@/app/types";
import ProductCard from "@/components/home/productCard";
import SortBySelect, { SortKey } from "@/components/home/sortBySelect";

export default function AllProductsView({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortKey>("default");

  const sortedProducts = useMemo(() => {
    if (sort === "asc") return [...products].sort((a, b) => a.today - b.today);
    if (sort === "desc") return [...products].sort((a, b) => b.today - a.today);
    return products;
  }, [products, sort]);

  return (
    <div className="my-4">
      <div className="flex items-center justify-between">
        <h3
          className="font-bold text-2xl flex items-center gap-2 mb-4"
          id="all"
        >
          <span className="text-green-600 text-sm">▼</span>{" "}
          <span>সকল পণ্য</span>
        </h3>
        <div>
          <SortBySelect value={sort} onChange={setSort} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
