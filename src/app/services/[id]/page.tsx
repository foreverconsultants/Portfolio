import React from "react";
import { servicesData } from "@/data/services";
import ServiceDetailClient from "./ServiceDetailClient";
// ss
export function generateStaticParams() {
  return servicesData
    .filter((s) => s.id !== "hero")
    .map((s) => ({
      id: s.id,
    }));
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
