import MostActiveList from "../components/MostActiveList";
import SettingsPanel from "../components/SettingsPanel";
import WelcomeAdmin from "../components/WelcomeAdmin";
import StatsCards from "../components/Statistics";
import UsageChart from "../components/UsageChart";
import TabSection from "../components/TabSection";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
