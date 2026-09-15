import type { Metadata } from "next";

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "The Neighborhood",
  description:
    "University City in Philadelphia: the campuses, restaurants, culture, and green space around Steeple Lofts.",
  alternates: { canonical: "/neighborhood" },
};

export default function NeighborhoodLayout({ children }: { children: React.ReactNode }) {
  return children;
}
