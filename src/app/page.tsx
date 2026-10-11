import Today from "@/components/global/today";
import Image from "next/image";
import { Suspense } from "react";
import { Product } from "./types";
import ProductCard from "@/components/home/productCard";
import AllProductsView from "@/components/home/allProductsView";

function Hero() {
  return (
    <div className="rounded-xl grid grid-cols-1 md:grid-cols-2 p-4 bg-slate-100 my-4">
      <div className="flex items-start justify-center gap-2 flex-col">
        <div className="badge badge-soft badge-primary">
          <Suspense fallback="">
            <Today />
          </Suspense>
        </div>
        <h2 className="font-bold text-4xl">আজকের বাজারের দাম এক নজরে</h2>
        <p className="text-gray-500">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a href="#all">
          <button className="btn btn-primary">সব পণ্য দেখুন</button>
        </a>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="/bazar-hero.svg"
          alt="BazarDor Hero Image"
          width={100}
          height={100}
          className="max-w-xl w-full"
        ></Image>
      </div>
    </div>
  );
}

async function PriceIncreased() {
  "use cache";

  const res = await fetch(`${process.env.MAIN_API_URL}/products`);
  const data = (await res.json()) as Product[];
  const filteredProducts = data
    .filter((item: Product) => item.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  return (
    <>
      <h3 className="font-bold text-2xl flex items-center gap-2 mb-4">
        <span className="text-red-600 text-sm">▲</span>{" "}
        <span>আজ দাম বেড়েছে</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}

async function PriceDecreased() {
  "use cache";

  const res = await fetch(`${process.env.MAIN_API_URL}/products`);
  const data = (await res.json()) as Product[];
  const filteredProducts = data
    .filter((item: Product) => item.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
  return (
    <div className="my-4">
      <h3 className="font-bold text-2xl flex items-center gap-2 mb-4">
        <span className="text-green-600 text-sm">▼</span>{" "}
        <span>আজ দাম কমেছে</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

async function AllProducts() {
  "use cache";

  const res = await fetch(`${process.env.MAIN_API_URL}/products`);
  const data = (await res.json()) as Product[];

  return <AllProductsView products={data} />;
}

export default function Home() {
  return (
    <>
      <Hero />
      <PriceIncreased />
      <PriceDecreased />
      <AllProducts />
    </>
  );
}
