import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center gap-4 flex-col min-h-screen">
      <h1 className="text-4xl font-bold">৪০৪</h1>
      <p>দুঃখিত, পৃষ্ঠাটি পাওয়া যায়নি</p>
      <Link href="/">
        <button className="btn btn-primary">হোম পেজে ফিরে যান</button>
      </Link>
    </div>
  );
}
