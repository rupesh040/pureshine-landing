import AboutHero from "../components/AboutHero";
import BlogGrid from "../components/BlogGrid";
import content from "../data";

export default function Blog() {
  const { title, breadcrumb, backgroundImage } = content.blogsPage;

  return (
    <>
      <AboutHero
        title={title}
        breadcrumb={breadcrumb}
        backgroundImage={backgroundImage}
      />
      <BlogGrid />
    </>
  );
}
