import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://forever-consultants.vercel.app";

// Actual Cloudinary photo — face-centered landscape crop for OG
const OG_IMAGE = "https://res.cloudinary.com/dbnlmt97x/image/upload/c_fill,g_north,w_1200,h_630,q_auto,f_auto/v1775031318/Untitled_design_23_w0hgi5.png";

export const metadata: Metadata = {
  title: "Sujata Gandhi — Care Health Champion & Senior Insurance Advisor | Forever Consultants",
  description:
    "Contact Sujata Gandhi — Care Health Insurance Champion (2024) with 20+ years of experience. Amazing Almaty Contest winner. LIC Insurance, Mediclaim & Health Insurance expert at Forever Consultants, Mumbai.",
  alternates: {
    canonical: `${BASE_URL}/vcard/sujata-gandhi`,
  },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: `${BASE_URL}/vcard/sujata-gandhi`,
    siteName: "Forever Consultants",
    title: "Sujata Gandhi — Care Health Champion & Senior Insurance Advisor",
    description:
      "20+ years of trusted financial advisory. Care Health Insurance Champion (Jan & Sept 2024), Amazing Almaty Contest winner. LIC Insurance, Mediclaim & Health Insurance expert.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sujata Gandhi — Care Health Champion & Senior Insurance Advisor at Forever Consultants",
        type: "image/png",
      },
    ],
    firstName: "Sujata",
    lastName: "Gandhi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujata Gandhi — Care Health Champion & Senior Insurance Advisor",
    description:
      "20+ years experience. Care Health Insurance Champion 2024, Amazing Almaty Contest winner. LIC Insurance, Mediclaim & Health expert at Forever Consultants.",
    images: [OG_IMAGE],
  },
  other: {
    "profile:first_name": "Sujata",
    "profile:last_name": "Gandhi",
  },
};

export default function SujataVCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
