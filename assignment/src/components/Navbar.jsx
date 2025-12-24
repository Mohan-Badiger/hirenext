import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ---------------- STYLES ---------------- */

  const navStyle = {
    width: "100%",
    height: "70px",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    boxSizing: "border-box",
    position: "fixed",
    top: 0,
    zIndex: 1000,
    borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
  };

  const logoStyle = {
    color: "#0f172a",
    fontSize: "24px",
    fontWeight: "800",
    textDecoration: "none",
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  const logoDotStyle = {
    color: "#0ea5e9",
  };

  const menuDesktop = {
    display: "flex",
    gap: "32px",
    alignItems: "center",
  };

  const menuMobile = {
    position: "fixed",
    top: "70px",
    left: 0,
    width: "100%",
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    borderBottom: "1px solid rgba(226,232,240,0.8)",
  };

  const getLinkStyle = (linkName) => ({
    color: hoveredLink === linkName ? "#0ea5e9" : "#475569",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  });

  const hamburgerStyle = {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    cursor: "pointer",
  };

  const barStyle = {
    width: "22px",
    height: "2px",
    background: "#0f172a",
    borderRadius: "2px",
  };

  /* ---------------- RENDER ---------------- */

  return (
    <>
      <nav style={navStyle}>
        <Link to="/" style={logoStyle} onClick={() => setMenuOpen(false)}>
          HireNext<span style={logoDotStyle}>.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={menuDesktop}>
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

        {/* Hamburger */}
        <div
          className="hamburger"
          style={hamburgerStyle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div style={barStyle}></div>
          <div style={barStyle}></div>
          <div style={barStyle}></div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={menuMobile}>
          <Link
            to="/test"
            style={getLinkStyle("tests")}
            onClick={() => setMenuOpen(false)}
          >
            Mock Tests
          </Link>

          <Link
            to="/interview"
            style={getLinkStyle("prep")}
            onClick={() => setMenuOpen(false)}
          >
            Interview Prep
          </Link>
        </div>
      )}

      {/* Inline Media Query */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
