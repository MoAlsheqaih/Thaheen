import { Link } from "react-router-dom";

import dead_fox from "../assets/dead_fox.png";
import Header from "../components/Header";

function NotFound() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-col items-center justify-center flex-1">
        <img src={dead_fox} alt="Dead Fox" className="md:w-96 w-64" />
        <h1 className="text-3xl md:text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <Link to="/" className="text-[#FD7B06] hover:underline">Go back to the home page</Link>
      </div>
    </div>
  )
}

export default NotFound;
