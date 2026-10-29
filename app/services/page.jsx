import Services from "../components/Services";
import AboutHero from "../components/AboutHero";
import content from "../data";

export default function services() {
  const { title, breadcrumb, backgroundImage } = content.servicesSection.hero;

  return (
    <>
      <AboutHero
        title={title}
        breadcrumb={breadcrumb}
        backgroundImage={backgroundImage}
      />
      <Services />
    </>
  );
}
