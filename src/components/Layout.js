"use strict";
import React from "react"
import PropTypes from "prop-types"; // Import PropTypes
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Pass props to Navbar if needed */}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

// Add PropTypes for type checking
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Layout); // Wrap in React.memo for performance
