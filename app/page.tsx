import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import FAQ from "./components/FAQ";



export default function Home() {
  return (
   <>
    <Hero />
    <AboutSection />
    <Services />
    <WhyChooseUs />
    <Testimonials/>
    <Stats/>
    <FAQ/>
   </>
  );
}
