import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowLeft, PhoneCall } from "lucide-react";
import content from "../../data";
import AboutHero from "../../components/AboutHero";
import ProfessionalCleaning from "../../components/ProfessionalCleaning";
import Services from "../../components/Services";

export async function generateStaticParams() {
  return content.services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = content.services.find((s) => s.id === id);
  if (!service) return {};
  return {
    title: `${service.title} | ${content.site.name}`,
    description: service.longDescription.slice(0, 155),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = content.services.find((s) => s.id === id);

  if (!service) notFound();

  const { featuresSection, includedSection, processSection, ctaSection, heroBackground } =
    content.serviceDetailPage;

  return (
    <>
      {/* ── Hero ── */}
      <AboutHero
        title={service.title}
        breadcrumb={service.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        backgroundImage={heroBackground}
      />

      <ProfessionalCleaning serviceId={id} />
      <Services excludeId={id} />
    </>
  );
}