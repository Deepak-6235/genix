import TopBar from "../../components/TopBar";
import Header from "../../components/Header";
import PaintsDecorationsContent from "../../components/PaintsDecorationsContent";
import Footer from "../../components/Footer";

export default function PaintsAndDecorationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <PaintsDecorationsContent />
      <Footer />
    </div>
  );
}
