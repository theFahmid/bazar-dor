"use client";

import { useMemo, useState } from "react";
import { Product } from "@/app/types";
import ProductCard from "@/components/home/productCard";
import SortBySelect, { SortKey } from "@/components/home/sortBySelect";

export default function CategoryProductsView({
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
    <>
      <div className="flex items-center justify-between">
        <p>
          মোট {products.length.toLocaleString("bn-bd")}টি পণ্য দেখানো হচ্ছে
        </p>
        <div>
          <SortBySelect value={sort} onChange={setSort} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
