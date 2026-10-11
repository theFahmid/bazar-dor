import { Suspense } from "react";
import Today from "./today";
import Link from "next/link";
import { Category } from "@/app/types";

function PrimaryNav() {
  return (
    <div className="flex items-center justify-between my-4">
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
  const data = await res.json();
  console.log(data);

  return (
    <div className="flex gap-2 items-center overflow-x-auto border-b border-b-slate-400">
      {data.map((category: Category) => (
        <Link href={`/category/${category.slug}`} key={category.id}>
          <button className="btn btn-ghost flex gap-2 px-2 py-0 text-nowrap">
            <div>{category.icon}</div>
            <div>{category.nameBn}</div>
          </button>
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  return (
    <>
      <PrimaryNav />
      <CategoryNav />
    </>
  );
}
