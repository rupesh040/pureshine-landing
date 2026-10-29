import AboutHero from "../components/AboutHero";
import Gallery from "../components/Gallery";
import content from "../data";

export default function GalleryPage() {
  const { title, breadcrumb, backgroundImage } = content.gallery.hero;

  return (
    <>
      <AboutHero
        title={title}
        breadcrumb={breadcrumb}
        backgroundImage={backgroundImage}
      />
      <Gallery />
    </>
  );
}
