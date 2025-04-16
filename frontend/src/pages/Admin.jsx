import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeAdmin from "../components/WelcomeAdmin/WelcomeAdmin";
import StatsCards from "../components/StatsCards/StatsCards";
import UsageChart from "../components/UsageChart/UsageChart";
import MostActiveList from "../components/MostActiveList/MostActiveList";
import TabSection from "../components/TabSection/TabSection";
import SettingsPanel from "../components/SettingsPanel/SettingsPanel";

function Admin() {
  return (
    <>
      <Header />
      <main className="px-6 py-4 max-w-7xl mx-auto">
        <WelcomeAdmin />
        <StatsCards />
        <section className="flex flex-col lg:flex-row gap-6 mt-6">
          <UsageChart />
          <MostActiveList />
        </section>
        <TabSection />
        <SettingsPanel />
      </main>
      <Footer />
    </>
  );
}

export default Admin;
