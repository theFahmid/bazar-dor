"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/app/types";

export default function CategoryNavLinks({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 items-center overflow-x-auto shadow pb-2 bg-white" >
      {categories.map((category) => {
        const href = `/category/${category.slug}`;
        const isActive = pathname === href;
        return (
          <Link
            href={href}
            key={category.id}
            aria-current={isActive ? "page" : undefined}
          >
            <button
              className={`btn ${isActive ? "btn-primary" : "btn-ghost"} flex gap-2 px-2 py-0 text-nowrap`}
            >
              <div>{category.icon}</div>
              <div>{category.nameBn}</div>
            </button>
          </Link>
        );
      })}
    </div>
  );
}
