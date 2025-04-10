import QuestionMaster from "../components/QuestionMaster";
import CoursesList from "../components/CoursesList";
import Activities from "../components/Activities";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <CoursesList />
      <QuestionMaster />
      <Activities />
      <Footer />
    </>
  );
}

export default LandingPage; 