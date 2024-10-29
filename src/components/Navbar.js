// src/components/Navbar.js
import React from "react";
import { FcElectricity } from "react-icons/fc";

function Navbar({ linkText }) {
  return (
    <nav className="bg-gray-900 shadow-md p-4 flex justify-between items-center w-screen">
      <div className="flex items-center j space-x-1">
        <FcElectricity className="text-white text-lg" />
        <h1 className="text-white text-sm font-extralight">CityScout</h1>
      </div>
      <div className="hidden md:flex space-x-6">
        <a
          className="text-gray-300 text-xs  hover:text-white transition"
          href="https://mixpanel.com/public/MJPKgaGaHdP8GKRCikSZwd"
          target="_blank" // Open link in a new tab
          rel="noopener noreferrer" // Security best practice
        >
          {linkText}
        </a>
        <a
          className="text-gray-300 text-xs hover:text-white transition"
          href="https://github.com/nate-j5/maptrack-app"
          target="_blank" // Open link in a new tab
          rel="noopener noreferrer" // Security best practice
        >
          View Code ↗
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
