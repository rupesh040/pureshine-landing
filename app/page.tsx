import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import FAQ from "./components/FAQ";
import { CategoriesPreview, EnquirySection } from "./components/LandingSections";

export default function Home() {
  return (
    <div className="landing-page">
      <div id="home" className="landing-section"><Hero /></div>
      <div id="about" className="landing-section"><AboutSection /></div>
      <div id="services" className="landing-section"><Services layout="grid" /></div>
      <div id="gallery" className="landing-section"><CategoriesPreview /></div>
      <div id="features" className="landing-section">
        <span id="feature" className="sr-only" />
        <WhyChooseUs />
      </div>
      <div className="landing-section"><Testimonials autoPlay={false} /></div>
      <div className="landing-section"><Stats /></div>
      <div id="faq" className="landing-section"><FAQ /></div>
      <div id="contact" className="landing-section"><EnquirySection /></div>
    </div>
  );
}
