import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutUsContent from "../components/AboutUsContent";

export default function AboutUsPage() {
  return (
    <div className="bg-white">
      <TopBar />
      <Header />
      <AboutUsContent />
      <Footer />
    </div>
  );
}
