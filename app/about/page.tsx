import AboutSection from "../components/AboutSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Stats from "../components/Stats";
import AboutHero from "../components/AboutHero";
import content from "../data";

export default function About() {
  const { title, breadcrumb, backgroundImage } = content.about.hero;

  return (
    <>
      <AboutHero
        title={title}
        breadcrumb={breadcrumb}
        backgroundImage={backgroundImage}
      />
      <AboutSection />
      <Stats />
      <WhyChooseUs />
    </>
  );
}
