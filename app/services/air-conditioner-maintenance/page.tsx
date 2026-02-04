import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AirConditionerMaintenanceContent from "../../components/AirConditionerMaintenanceContent";

export default function AirConditionerMaintenancePage() {
  return (
    <div className="bg-white">
      <Header />
      <AirConditionerMaintenanceContent />
      <Footer />
    </div>
  );
}
