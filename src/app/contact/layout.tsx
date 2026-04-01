import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://forever-consultants.vercel.app";

export const metadata: Metadata = {
  title: "Contact Us — Book a Free Consultation with Award-Winning Advisors",
  description:
    "Get in touch with Forever Consultants — 8x MDRT qualifier & Care Health Champion advisors. Book a free personal consultation for LIC Insurance, Mutual Funds, or Health Insurance in Mumbai. ₹500Cr+ AUM managed.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact Forever Consultants — Book a Free Consultation",
    description:
      "Request a personal visit from award-winning advisors (8x MDRT, Care Health Champion). LIC Insurance, Mutual Funds & Health Insurance consultation in Mumbai.",
    url: `${BASE_URL}/contact`,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Contact Forever Consultants — Book a Free Consultation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Forever Consultants — Free Consultation",
    description:
      "Book a free visit from award-winning advisors. LIC Insurance, Mutual Funds & Health Insurance in Mumbai.",
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
