import TopBar from "../../components/TopBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WaterfallsAndFountainsContent from "../../components/WaterfallsAndFountainsContent";

export default function WaterfallsAndFountainsPage() {
  return (
    <div className="bg-white">
      <TopBar />
      <Header />
      <WaterfallsAndFountainsContent />
      <Footer />
    </div>
  );
}
