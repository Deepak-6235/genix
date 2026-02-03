import TopBar from "../../components/TopBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InteriorExteriorRestorationContent from "../../components/InteriorExteriorRestorationContent";

export default function InteriorExteriorRestorationPage() {
  return (
    <div className="bg-white">
      <TopBar />
      <Header />
      <InteriorExteriorRestorationContent />
      <Footer />
    </div>
  );
}
