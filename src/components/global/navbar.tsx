import { Suspense } from "react";
import Today from "./today";
import Link from "next/link";
import { Category, Product } from "@/app/types";
import Marquee from "react-fast-marquee";
import { unitExpression } from "@/utils/unit";
import CategoryNavLinks from "./categoryNavLinks";

function PrimaryNav() {
  return (
    <div className="flex items-center justify-between py-4">
      <Link href="/">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center rounded-xl bg-primary p-2 text-xl">
            🛒
          </div>
          <div>
            <h1 className="text-2xl font-bold">বাজারদর</h1>
            <Suspense fallback="">
              <Today />
            </Suspense>
          </div>
        </div>
      </Link>
      <div>
        <Link href="/signin">
          <button className="btn btn-ghost">সাইন ইন</button>
        </Link>
        <Link href="/signup">
          <button className="btn btn-primary">সাইন আপ</button>
        </Link>
      </div>
    </div>
  );
}

async function CategoryNav() {
  "use cache";

  const res = await fetch(`${process.env.MAIN_API_URL}/categories`);
  const data = (await res.json()) as Category[];

  return (
    <Suspense fallback={<div className="flex gap-2 pb-2" />}>
      <CategoryNavLinks categories={data} />
    </Suspense>
  );
}

async function MarqueeText() {
  "use cache";

  const res = await fetch(`${process.env.MAIN_API_URL}/products`);
  const data = (await res.json()) as Product[];

  return (
    <Marquee pauseOnHover={true}>
      {data.map((item) => (
        <p className="px-4" key={item.id}>
          {item.image} <span className="font-medium">{item.nameBn}</span>{" "}
          {item.today.toLocaleString("bn-bd")}টাকা/
          {unitExpression(item.unit)}
          <span className={`${item.change.dir === "up" ? "text-red-600" : item.change.dir === "down" ? "text-green-600" : "text-slate-500"}`}>
            
          {item.change.dir === "up"
            ? `▲ ${item.change.pct.toLocaleString("bn-bd")}%`
            : item.change.dir === "down"
              ? `▼ ${item.change.pct.toLocaleString("bn-bd").slice(1)}%`
              : `— ${item.change.pct.toLocaleString("bn-bd")}%`}
          </span>
        </p>
      ))}
    </Marquee>
  );
}
export default function Navbar() {
  return (
    <>
      <PrimaryNav />
      <CategoryNav />
      <MarqueeText />
    </>
  );
}
