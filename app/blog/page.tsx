import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogContent from "../components/BlogContent";

export default function BlogPage() {
  return (
    <div className="bg-white">
      <TopBar />
      <Header />
      <BlogContent />
      <Footer />
    </div>
  );
}
