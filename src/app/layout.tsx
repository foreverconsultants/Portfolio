import type { Metadata, Viewport } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.foreverconsultants.in";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3B82F6",
};

export const metadata: Metadata = {
  // ── Core Meta ──────────────────────────────────────────
  title: {
    default: "Forever Consultants — Total Investment & Insurance Solutions | Mumbai",
    template: "%s | Forever Consultants",
  },
  description:
    "Award-winning financial advisory in Mumbai — 15x MDRT qualifier Nitin Gandhi & Care Health Champion Sujata Gandhi. 25+ years expertise in LIC Insurance, Mutual Funds, SIP, Mediclaim & Health Insurance. ₹50Cr+ AUM. Book a free consultation today.",
  keywords: [
    "Forever Consultants",
    "financial advisor Mumbai",
    "LIC agent Mumbai",
    "LIC insurance",
    "mutual funds advisor",
    "SIP investment",
    "health insurance India",
    "mediclaim policy",
    "wealth management",
    "investment consultant",
    "Nitin Gandhi",
    "Sujata Gandhi",
    "insurance advisor",
    "MDRT agent India",
    "MDRT qualifier",
    "Million Dollar Round Table",
    "Care Health Insurance champion",
    "LIC Warrior award",
    "LIC Corporate Trophy",
    "retirement planning",
    "child education plan",
    "term insurance",
    "portfolio management",
    "financial planning India",
    "best LIC agent Nalasopara",
    "insurance advisor Vasai",
  ],
  authors: [{ name: "Forever Consultants" }],
  creator: "Forever Consultants",
  publisher: "Forever Consultants",

  // ── Canonical & Alternates ─────────────────────────────
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
    },
  },

  // ── OpenGraph (Facebook, LinkedIn, WhatsApp) ───────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Forever Consultants",
    title: "Forever Consultants — Total Investment & Insurance Solutions",
    description:
      "Award-winning financial advisory — 15x MDRT qualifier. LIC Insurance, Mutual Funds, SIP, Mediclaim & Health Insurance. ₹50Cr+ AUM. Expert wealth management in Mumbai.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Forever Consultants — Your Trusted Financial Partners",
        type: "image/png",
      },
    ],
  },

  // ── Twitter Card ───────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Forever Consultants — Total Investment & Insurance Solutions",
    description:
      "Award-winning financial advisory — 15x MDRT qualifier. LIC Insurance, Mutual Funds, SIP & Health Insurance. ₹50Cr+ AUM in Mumbai.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@ForeverConsult",
  },

  // ── Robots ─────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification ───────────────────────────────────────
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && {
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
      },
    }),
  },

  // ── App & Icons ────────────────────────────────────────
  applicationName: "Forever Consultants",
  category: "Finance",
  classification: "Financial Services",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/infinity-logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  other: {
    // ── Geo Meta Tags (Local SEO) ──────────────────────
    "geo.region": "IN-MH",
    "geo.placename": "Mumbai",
    "geo.position": "19.0760;72.8777",
    "ICBM": "19.0760, 72.8777",
    // ── Business Info ──────────────────────────────────
    "business:contact_data:street_address": "B/205, Chawre Arcade, Vasai, Nalasopara",
    "business:contact_data:locality": "Nalasopara",
    "business:contact_data:region": "Maharashtra",
    "business:contact_data:postal_code": "401203",
    "business:contact_data:country_name": "India",
    "business:contact_data:phone_number": "+91-9769660363",
    // ── Content Language ───────────────────────────────
    "content-language": "en-IN",
    // ── IndexNow ───────────────────────────────────────
    "indexnow-key": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  },
};

// JSON-LD Structured Data
function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization
      {
        "@type": "FinancialService",
        "@id": `${BASE_URL}/#organization`,
        name: "Forever Consultants",
        alternateName: "Forever Consultants — Total Investment Solutions",
        url: BASE_URL,
        logo: `${BASE_URL}/og-image.png`,
        description:
          "Award-winning wealth management, LIC insurance, mutual funds, and health insurance advisory services in Mumbai. 15x MDRT qualifier, LIC Corporate Trophy winners, Care Health Insurance Champions. 25+ years of experience, ₹50Cr+ AUM.",
        foundingDate: "2000",
        areaServed: {
          "@type": "City",
          name: "Mumbai",
          "@id": "https://www.wikidata.org/wiki/Q1156",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "B/205, Chawre Arcade, Vasai",
          addressLocality: "Nalasopara",
          addressRegion: "Maharashtra",
          postalCode: "401203",
          addressCountry: "IN",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-9769660363",
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi", "Marathi"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+91-8087907776",
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi", "Marathi"],
          },
        ],
        email: "foreverconsultants2311@gmail.com",
        sameAs: [],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Financial Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "LIC Insurance & Life Protection",
                description:
                  "Comprehensive LIC policy advisory including endowment, money-back, term life, retirement, and child education plans.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mutual Funds & Wealth Creation",
                description:
                  "Expert mutual fund advisory including SIP, SWP, Portfolio Management, and alternative investments.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mediclaim & Health Protection",
                description:
                  "Comprehensive health insurance from top providers including Care Health, Star Health, ICICI Lombard.",
              },
            },
          ],
        },
      },
      // Persons
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#nitin-gandhi`,
        name: "Nitin Gandhi",
        jobTitle: "Senior Financial Strategist & MDRT Qualifier",
        worksFor: { "@id": `${BASE_URL}/#organization` },
        telephone: "+91-9769660363",
        email: "ntngandhi65@gmail.com",
        image: "https://res.cloudinary.com/dbnlmt97x/image/upload/w_800,q_auto,f_auto/v1775031318/Untitled_design_24_ze2wqv.png",
        description:
          "15x MDRT (Million Dollar Round Table) qualifier with 25+ years of experience. Award-winning LIC agent recognized with Corporate Trophy (2015, 2016), Warrior 2020, Achiever's Trophy, Shatakveer Agent, Champions' Trophy, and Dharma Chakra Trophy. Expert in mutual funds, wealth compounding, and asset allocation.",
        memberOf: {
          "@type": "Organization",
          name: "Million Dollar Round Table (MDRT)",
          url: "https://www.mdrt.org",
        },
        award: [
          "15x MDRT Qualifier (2010, 2011, 2013, 2021+)",
          "LIC Corporate Trophy 2015",
          "LIC Corporate Trophy 2016",
          "LIC Warrior 2020",
          "LIC Achiever's Trophy 2013-14",
          "LIC Shatakveer Agent 2012-13",
          "LIC Champions' Trophy 2014",
          "LIC Dharma Chakra Trophy 2023",
          "LIC Abhikarta Mahakumbh 2024",
        ],
        knowsAbout: ["Mutual Funds", "LIC Insurance", "SIP", "Wealth Management", "Portfolio Management", "Financial Planning"],
      },
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#sujata-gandhi`,
        name: "Sujata Gandhi",
        jobTitle: "Principal Life & Health Advisor",
        worksFor: { "@id": `${BASE_URL}/#organization` },
        telephone: "+91-8087907776",
        email: "sujatagandhi72@gmail.com",
        image: "https://res.cloudinary.com/dbnlmt97x/image/upload/w_800,q_auto,f_auto/v1775031318/Untitled_design_23_w0hgi5.png",
        description:
          "20+ years of expertise in life insurance, health insurance and risk mitigation. Care Health Insurance Champion (Jan 2024, Sept 2024), Amazing Almaty Contest winner 2024. Specialist in LIC policies, mediclaim, and family financial protection.",
        award: [
          "Care Health Insurance Champion — September 2024",
          "Care Health Insurance Champion — January 2024",
          "Care Health Insurance Amazing Almaty Contest 2024",
        ],
        knowsAbout: ["Health Insurance", "LIC Insurance", "Mediclaim", "Risk Mitigation", "Family Protection"],
      },
      // WebSite
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Forever Consultants",
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: "en-IN",
      },
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: `${BASE_URL}/about`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Contact",
            item: `${BASE_URL}/contact`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" dir="ltr">
      <head>
        <JsonLd />
        <link rel="canonical" href={BASE_URL} />
      </head>
      <body className={`${openSans.variable} ${playfair.variable} font-[family-name:var(--font-body)] min-h-screen flex flex-col w-full m-0 p-0`}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        {/* Content */}
        <div className="relative flex flex-col min-h-screen w-full">
          <Navbar />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
