import AboutHero from "../components/AboutHero";
import FAQ from "../components/FAQ";
import content from "../data";

export default function FAQsPage() {
  const { title, breadcrumb, backgroundImage } = content.faqSection.hero;

  return (
    <>
      <AboutHero
        title={title}
        breadcrumb={breadcrumb}
        backgroundImage={backgroundImage}
      />
      <FAQ showContactCard={false} showAll={true} />
    </>
  );
}
