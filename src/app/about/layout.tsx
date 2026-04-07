import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://forever-consultants.vercel.app";

// Trophy cabinet photo as OG image — showcases all awards
const OG_IMAGE = "https://res.cloudinary.com/dbnlmt97x/image/upload/c_fill,w_1200,h_630,q_auto,f_auto/v1775035892/IMG_9507_yfcg7v.heic";

export const metadata: Metadata = {
  title: "About Us — Meet Award-Winning Advisors Nitin & Sujata Gandhi",
  description:
    "Meet the award-winning founders of Forever Consultants — Nitin Gandhi (15x MDRT qualifier, 25+ years in wealth management, LIC Corporate Trophy & Warrior 2020 winner) and Sujata Gandhi (Care Health Insurance Champion 2024, 20+ years in insurance). 45+ combined years of financial expertise in Mumbai.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: "About Us — Award-Winning Financial Advisors | Forever Consultants",
    description:
      "45+ combined years of financial expertise. 15x MDRT qualifier, LIC Corporate Trophy winners, Care Health Champions. Meet the trusted advisors behind Forever Consultants.",
    url: `${BASE_URL}/about`,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Forever Consultants — Trophy Cabinet Showcasing Years of Award-Winning Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us — Award-Winning Financial Advisors | Forever Consultants",
    description:
      "45+ combined years. 15x MDRT qualifier, LIC Corporate Trophy, Care Health Champions. Meet Nitin & Sujata Gandhi.",
    images: [OG_IMAGE],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
