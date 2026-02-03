import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactContent from "../components/ContactContent";

export default function ContactPage() {
  return (
    <div className="bg-white">
      <TopBar />
      <Header />
      <ContactContent />
      <Footer />
    </div>
  );
}
