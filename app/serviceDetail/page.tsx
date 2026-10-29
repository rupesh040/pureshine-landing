import AboutHero from "../components/AboutHero";
import ProfessionalCleaning from "../components/ProfessionalCleaning";
import Services from "../components/Services";
import content from "../data";

export default function serviceDetail() {
  const { defaultTitle, defaultBreadcrumb, heroBackground } =
    content.serviceDetailPage;

  return (
    <>
      <AboutHero
        title={defaultTitle}
        breadcrumb={defaultBreadcrumb}
        backgroundImage={heroBackground}
      />
      <ProfessionalCleaning />
      <Services />
    </>
  );
}
