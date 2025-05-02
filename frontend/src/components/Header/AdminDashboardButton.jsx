import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminDashboardButton({ checkStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    checkStatus();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#006F6A] hover:bg-[#006f6a]/80 dark:bg-[#F97008] dark:hover:bg-[#F97008]/80 transition-all text-white py-2 px-4 rounded-2xl font-semibold drop-shadow-[0_4px_0_#00A59D] dark:drop-shadow-[0_4px_0_#F7AB73] text-sm sm:text-base"
      >
        Admin
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
          <Link
            to="/admin"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardButton;