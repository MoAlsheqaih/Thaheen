import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Course from "./pages/Course";
import User from "./pages/User";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
