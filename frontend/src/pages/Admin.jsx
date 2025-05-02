import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import MostActiveList from "../components/MostActiveList";
import SettingsPanel from "../components/SettingsPanel";
import WelcomeAdmin from "../components/WelcomeAdmin";
import StatsCards from "../components/Statistics";
import UsageChart from "../components/UsageChart";
import TabSection from "../components/TabSection";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Admin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/api/auth/status", {
          headers: {
            "x-auth-token": token,
          },
        });

        const data = await response.json();

        if (response.status === 200 && data.role === "admin") {
          setIsAuthenticated(true);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006F6A] dark:border-[#FD7B06]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

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
