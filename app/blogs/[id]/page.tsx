import { notFound, redirect } from "next/navigation";
import content from "../../data";
import AboutHero from "../../components/AboutHero";
import BlogDetails from "../../components/BlogDetails";
import BlogGrid from "../../components/BlogGrid";

export async function generateStaticParams() {
  return (content.blogs as any[]).flatMap((b) => {
    const params = [{ id: b.id }];
    if (b.numericId) {
      params.push({ id: b.numericId });
    }
    return params;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const blog = (content.blogs as any[]).find(
    (b) =>
      b.id === decodedId ||
      b.slug === decodedId ||
      b.numericId === decodedId ||
      b.id === id ||
      b.slug === id ||
      b.numericId === id
  );
  if (!blog) return {};
  return {
    title: `${blog.title} | ${content.site.name} Blog`,
    description: blog.content[0]?.text.slice(0, 155),
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const blog = (content.blogs as any[]).find(
    (b) =>
      b.id === decodedId ||
      b.slug === decodedId ||
      b.numericId === decodedId ||
      b.id === id ||
      b.slug === id ||
      b.numericId === id
  );

  if (!blog) notFound();

  if (decodedId === blog.numericId) {
    redirect(`/blogs/${blog.id}`);
  }

  const recentPosts = (content.blogs as any[])
    .filter((b) => b.id !== blog.id && b.slug !== blog.id)
    .slice(0, 5);

  return (
    <>
      <AboutHero
        title={blog.title}
        breadcrumb={blog.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: blog.title },
        ]}
        backgroundImage={content.blogDetailPage.backgroundImage}
      />

      <BlogDetails
        blog={blog}
        recentPosts={recentPosts}
        categories={content.categories}
      />
    </>
  );
}