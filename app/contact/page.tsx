import AboutHero from "../components/AboutHero";
import ContactInformation from "../components/ContactInformation";
import ContactForm from "../components/ContactForm";
import ContactMap from "../components/ContactMap";
import content from "../data";

export default function ContactUs() {
  const { title, breadcrumb, backgroundImage } = content.contact.hero;

  return (
    <>
      <AboutHero
        title={title}
        breadcrumb={breadcrumb}
        backgroundImage={backgroundImage}
      />
      <ContactInformation />
      <ContactForm />
      <ContactMap />
    </>
  );
}
