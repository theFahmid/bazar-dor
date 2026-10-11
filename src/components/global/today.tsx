"use client";

export default function Today() {
  const date = new Date();
  const today = date.toLocaleDateString("bn-bd", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return <p className="text-sm">{today}</p>;
}
