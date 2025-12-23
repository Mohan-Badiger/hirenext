import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const navStyle = {
    width: "100%",
    height: "70px",
    // Glassmorphism effect
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 60px",
    boxSizing: "border-box",
    position: "fixed",
    top: 0,
    zIndex: 1000,
    borderBottom: "1px solid rgba(226, 232, 240, 0.8)", // Suble border
  };

  const logoStyle = {
    color: "#0f172a", // Darker for white mode
    fontSize: "24px",
    fontWeight: "800",
    textDecoration: "none",
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  };

  const logoDotStyle = {
    color: "#0ea5e9" // Blue accent dot
  };

  const menuStyle = {
    display: "flex",
    gap: "32px",
    alignItems: "center",
  };

  const getLinkStyle = (linkName) => ({
    color: hoveredLink === linkName ? "#0ea5e9" : "#475569",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    position: "relative",
  });

  const loginButtonStyle = {
    backgroundColor: "#0f172a",
    color: "#fff",
    padding: "10px 22px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.3s ease",
    marginLeft: "10px"
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        HireNext<span style={logoDotStyle}>.</span>
      </Link>

      <div style={menuStyle}>
        <Link 
          to="/test" 
          style={getLinkStyle("tests")}
          onMouseEnter={() => setHoveredLink("tests")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Mock Tests
        </Link>
        <Link 
          to="/interview" 
          style={getLinkStyle("prep")}
          onMouseEnter={() => setHoveredLink("prep")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Interview Prep
        </Link>

      </div>
    </nav>
  );
}