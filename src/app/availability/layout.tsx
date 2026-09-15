import type { Metadata } from "next";

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Available Residences",
  description:
    "Browse current availability at Steeple Lofts at University City and find the residence that matches your lifestyle.",
  alternates: { canonical: "/availability" },
};

export default function AvailabilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
