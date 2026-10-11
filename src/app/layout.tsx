import type { Metadata } from "next";
import { Baloo_Da_2, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/navbar";

const banglaFont = Baloo_Da_2({
  variable: "--font-bangla-sans",
  subsets: ["latin", "bengali"],
});

const englishFont = Inter({
  variable: "--font-english-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BazarDor",
  description: "A modern, responsive daily market price tracker for essential commodities in Bangladesh",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${banglaFont.variable} ${englishFont.variable} h-full antialiased`}
      data-theme="light"
    >
      <body className="min-h-full wrapper">
        <header className="sticky top-0 left-0 right-0 bg-white shadow">
          <Navbar/>
        </header>
        <main>
          {children}
        </main>
        <footer>

        </footer>
        </body>
    </html>
  );
}
