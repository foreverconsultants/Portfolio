import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://forever-consultants.vercel.app";

// Full uncropped photo padded to landscape for WhatsApp/OG
const OG_IMAGE = "https://res.cloudinary.com/dbnlmt97x/image/upload/c_pad,b_rgb:0a0a0c,w_1200,h_630,q_auto,f_auto/v1775031318/Untitled_design_24_ze2wqv.png";

export const metadata: Metadata = {
  title: "Nitin Gandhi — 15x MDRT Qualifier & Senior Insurance Advisor | Forever Consultants",
  description:
    "Contact Nitin Gandhi — 15x MDRT (Million Dollar Round Table) qualifier with 25+ years of experience. Award-winning LIC agent recognized with Corporate Trophy, Warrior 2020, Shatakveer Agent & more. Mutual Funds & Wealth Management expert at Forever Consultants, Mumbai.",
  alternates: {
    canonical: `${BASE_URL}/vcard/nitin-gandhi`,
  },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: `${BASE_URL}/vcard/nitin-gandhi`,
    siteName: "Forever Consultants",
    title: "Nitin Gandhi — 15x MDRT Qualifier & Senior Insurance Advisor",
    description:
      "25+ years of trusted financial advisory. 15x MDRT qualifier, LIC Corporate Trophy winner, Warrior 2020. LIC Insurance, Mutual Funds & Wealth Management expert.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Nitin Gandhi — 15x MDRT Qualifier & Senior Insurance Advisor at Forever Consultants",
        type: "image/png",
      },
    ],
    firstName: "Nitin",
    lastName: "Gandhi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitin Gandhi — 15x MDRT Qualifier & Senior Insurance Advisor",
    description:
      "25+ years experience. 15x MDRT qualifier, LIC Corporate Trophy, Warrior 2020. Mutual Funds & Wealth Management expert at Forever Consultants.",
    images: [OG_IMAGE],
  },
  other: {
    "profile:first_name": "Nitin",
    "profile:last_name": "Gandhi",
  },
};

export default function NitinVCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
