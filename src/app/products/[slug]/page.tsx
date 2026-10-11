import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Product } from "@/app/types";
import ProductGate from "./productGate";
import ProductHeader from "./productHeader";
import ProductMarkets from "./productMarkets";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProduct(slug: string) {
  "use cache";
  const res = await fetch(`${process.env.MAIN_API_URL}/products`);
  if (!res.ok) notFound();
  const products = (await res.json()) as Product[];
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return product;
}

async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return (
    <div className="space-y-4">
      <ProductHeader product={product} />
      <ProductMarkets product={product} />
    </div>
  );
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProductGate>
        <ProductDetail params={params} />
      </ProductGate>
    </Suspense>
  );
}
