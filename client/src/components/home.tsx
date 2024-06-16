import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ role }: { role: string }) => {
  const navi = useNavigate();

  const handleViewDashboard = () => {
    if (role === "client") {
      navi("/dashboardclient");
    } else if (role === "admin") {
      navi("/dashboardadmin");
    } else {
      navi("/login"); // Redirect to login if role is undefined or not recognized
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-blue-600 text-white flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4">Hello test</h2>
        <ul className="space-y-2 justify-center">
          <li>
            <Link to="/register" className="block hover:bg-gray-700 rounded p-2">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="block hover:bg-gray-700 rounded p-2">
              Login
            </Link>
          </li>
          <li>
            <button
              className="block w-full hover:bg-gray-700 rounded p-2 text-left justify-center"
              onClick={handleViewDashboard}
            >
              View Dashboard
            </button>
          </li>
        </ul>
      </div>
      <div className="w-3/4 bg-gray-200 p-4">
        <div>Hello</div>
      </div>
    </div>
  );
};

export default Home;
