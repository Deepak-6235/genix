import TopBar from "../../components/TopBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SwimmingPoolsContent from "../../components/SwimmingPoolsContent";

export default function SwimmingPoolsPage() {
  return (
    <div className="bg-white">
      <TopBar />
      <Header />
      <SwimmingPoolsContent />
      <Footer />
    </div>
  );
}
