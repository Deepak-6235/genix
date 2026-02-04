import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ServiceDetail from "../../components/ServiceDetail";

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const resolvedParams = await Promise.resolve(params);

  return (
    <div className="bg-white">
      <Header />
      <ServiceDetail serviceSlug={resolvedParams.slug} />
      <Footer />
    </div>
  );
}
