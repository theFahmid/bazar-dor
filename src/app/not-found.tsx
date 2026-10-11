import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center gap-4 flex-col min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Page not found</p>
      <Link href="/">
        <button className="btn btn-primary">Return Home</button>
      </Link>
    </div>
  );
}
