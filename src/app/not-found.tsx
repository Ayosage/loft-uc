import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="pt-28 min-h-screen bg-white">
      <div className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-12"></div>
            <h1 className="text-4xl md:text-6xl text-gray-800 mb-8 tracking-tight">
              PAGE NOT FOUND
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              That page does not exist or has moved. The residences, gallery
              and availability are all still here.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-block border border-[#C4A862] px-8 py-3 text-sm tracking-widest uppercase text-gray-800 hover:bg-[#C4A862] hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/availability"
                className="inline-block border border-gray-300 px-8 py-3 text-sm tracking-widest uppercase text-gray-800 hover:border-[#C4A862] transition-colors"
              >
                Availability
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
