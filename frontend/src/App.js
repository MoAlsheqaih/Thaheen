import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChapterQuestionsPage from "./pages/ChapterQuestionsPage";
import LandingPage from "./pages/LandingPage";
import Course from "./pages/Course";
import Admin from "./pages/Admin";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/user" element={<User />} />
        <Route path="/course/:courseId/chapter/:chapterId" element={<ChapterQuestionsPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
