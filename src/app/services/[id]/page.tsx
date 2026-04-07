import React from "react";
import type { Metadata } from "next";
import { servicesData } from "@/data/services";
import ServiceDetailClient from "./ServiceDetailClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://forever-consultants.vercel.app";

export function generateStaticParams() {
  return servicesData
    .filter((s) => s.id !== "hero")
    .map((s) => ({
      id: s.id,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.id === resolvedParams.id);

  if (!service || !service.title) {
    return {
      title: "Service Not Found",
    };
  }

  const serviceMetaMap: Record<string, { title: string; description: string; keywords: string[] }> = {
    lic: {
      title: "LIC Insurance & Life Protection — Plans, Benefits & Expert Advisory",
      description:
        "Expert LIC insurance advisory by 15x MDRT qualifier & Corporate Trophy winning agents. Endowment plans, term life, retirement, child education plans with sovereign guarantee. 25+ years of trusted service in Mumbai.",
      keywords: [
        "LIC insurance Mumbai",
        "LIC agent",
        "life insurance India",
        "LIC policy",
        "endowment plan",
        "term life insurance",
        "child education plan LIC",
        "retirement plan LIC",
        "MDRT LIC agent",
        "best LIC agent Mumbai",
        "LIC Corporate Trophy winner",
      ],
    },
    "mutual-funds": {
      title: "Mutual Funds & Wealth Creation — SIP, Portfolio Management & Expert Advisory",
      description:
        "Best mutual fund advisor in Mumbai. ₹50Cr+ AUM managed. SIP, SWP, portfolio management, ELSS tax-saving funds. Expert fund selection & quarterly rebalancing by 15x MDRT qualifier. Start with ₹500/month.",
      keywords: [
        "mutual funds advisor Mumbai",
        "SIP investment",
        "SWP plan",
        "portfolio management",
        "ELSS funds",
        "equity mutual funds",
        "best mutual fund advisor",
        "wealth creation India",
        "500 crore AUM",
        "MDRT financial advisor",
      ],
    },
    health: {
      title: "Health Insurance & Mediclaim — Cashless Hospitalization & Expert Advisory",
      description:
        "Best health insurance plans in Mumbai by Care Health Insurance Champion (2024). Cashless hospitalization at 10,000+ hospitals. Care Health, Star Health, ICICI Lombard policies. Family floater & senior citizen plans.",
      keywords: [
        "health insurance Mumbai",
        "mediclaim policy",
        "cashless hospitalization",
        "family health insurance",
        "Star Health insurance",
        "Care Health insurance",
        "ICICI Lombard health",
        "senior citizen health insurance",
        "Care Health Champion advisor",
        "best health insurance agent Mumbai",
      ],
    },
  };

  const meta = serviceMetaMap[resolvedParams.id];

  return {
    title: meta?.title || service.title,
    description: meta?.description || service.description,
    keywords: meta?.keywords,
    alternates: {
      canonical: `${BASE_URL}/services/${resolvedParams.id}`,
    },
    openGraph: {
      title: meta?.title || service.title,
      description: meta?.description || service.description,
      url: `${BASE_URL}/services/${resolvedParams.id}`,
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${service.title} — Forever Consultants`,
        },
      ],
    },
  };
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.id === resolvedParams.id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-600 bg-zinc-50">
        Service not found.
      </div>
    );
  }

  return <ServiceDetailClient service={service} />;
}
