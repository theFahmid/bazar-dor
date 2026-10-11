import { Category, Product } from "@/app/types";
import CategoryProductsView from "@/components/home/categoryProductsView";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getCategory(slug: string) {
  "use cache";
  const categoryRes = await fetch(
    `${process.env.MAIN_API_URL}/categories/${slug}`,
  );
  if (!categoryRes.ok) notFound();
  return (await categoryRes.json()) as Category;
}

async function getProducts(slug: string) {
  "use cache";
  const productsRes = await fetch(
    `${process.env.MAIN_API_URL}/products?category=${slug}`,
  );
  if (!productsRes.ok) return [] as Product[];
  return (await productsRes.json()) as Product[];
}

async function CategoryDetail({ params }: Props) {
  const { slug } = await params;
  const categoryInfo = await getCategory(slug);
  const products = await getProducts(slug);

  return (
    <div className="space-y-4">
          <div className="bg-slate-100 rounded-xl p-4 flex gap-4 items-center">
            <div className="text-4xl">{categoryInfo.icon}</div>
            <div>
              <h3 className="text-2xl font-bold">{categoryInfo.nameBn}</h3>
              <p>
                {products.length.toLocaleString("bn-bd")}টি পণ্যের আজকের দাম ও
                পরিবর্তন
              </p>
            </div>
          </div>
          <CategoryProductsView products={products} />
        </div>
  );
}
export default function CategoryPage({ params }: Props) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CategoryDetail params={params} />
    </Suspense>
  );
}
