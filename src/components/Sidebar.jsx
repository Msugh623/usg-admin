import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar-container themebg-grad slideRight text-white p-3">
      <nav className="nav flex-column">
        <div className="mb-4">
          <h2 className="text-white text-center text-uppercase font-bold">
            USGEAAN
          </h2>
        </div>

        <Link
          to="/dashboard"
          className={`${
            location.pathname === "/dashboard"
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link px-3 text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Admin
        </Link>
        <Link
          to="/dashboard/main"
          className={`${
            location.pathname.includes("/dashboard/main")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link b-0 text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/dashboard/alumni-making-waves"
          className={`${
            location.pathname.includes("/dashboard/alumni-making-waves")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Alumni Making Waves
        </Link>
        <Link
          to="/dashboard/expert"
          className={`${
            location.pathname.includes("/dashboard/expert")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Expert
        </Link>
        <Link
          to="/dashboard/impact-stories"
          className={`${
            location.pathname.includes("/dashboard/impact-stories")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Impact Stories
        </Link>
        <Link
          to="/dashboard/chapters"
          className={`${
            location.pathname.includes("/dashboard/chapters")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Chapters
        </Link>
        <Link
          to="/dashboard/alumini-spotlight"
          className={`${
            location.pathname.includes("/dashboard/alumini-spotlight")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Alumini Spotlight
        </Link>
        <Link
          to="/dashboard/resources"
          className={`${
            location.pathname.includes("/dashboard/resources")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Resources
        </Link>
        <Link
          to="/dashboard/news"
          className={`${
            location.pathname.includes("/dashboard/news")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          News
        </Link>
        <Link
          to="/dashboard/events"
          className={`${
            location.pathname.includes("/dashboard/events")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Events
        </Link>

        <Link
          to="/dashboard/leaders"
          className={`${
            location.pathname.includes("/dashboard/leaders")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Leaders
        </Link>

        <Link
          to="/dashboard/testimonials"
          className={`${
            location.pathname.includes("/dashboard/testimonials")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Testimonials
        </Link>

        <Link
          to="/dashboard/admins"
          className={`${
            location.pathname.includes("/dashboard/admins")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Admins
        </Link>

        <Link
          to="/dashboard/unverified"
          className={`${
            location.pathname.includes("/dashboard/unverified")
              ? "bg-light themetxt p-3 no-dec"
              : "nav-link text-white py-3 hover:bg-gray-700 rounded"
          }`}
        >
          Verify Alumni
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
