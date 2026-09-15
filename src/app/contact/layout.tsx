import type { Metadata } from "next";

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Steeple Lofts leasing team to schedule a tour or ask about available residences in University City, Philadelphia.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
