import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BlogDetail from "../../components/BlogDetail";

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const resolvedParams = await Promise.resolve(params);

  return (
    <div className="bg-white">
      <Header />
      <BlogDetail blogSlug={resolvedParams.slug} />
      <Footer />
    </div>
  );
}
