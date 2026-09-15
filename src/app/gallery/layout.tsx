import type { Metadata } from "next";

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs of the residences, shared spaces, and amenities at Steeple Lofts at University City in Philadelphia.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
