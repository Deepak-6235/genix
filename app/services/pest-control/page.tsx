import TopBar from "../../components/TopBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PestControlContent from "../../components/PestControlContent";

export default function PestControlPage() {
  return (
    <div className="bg-white">
      <TopBar />
      <Header />
      <PestControlContent />
      <Footer />
    </div>
  );
}
