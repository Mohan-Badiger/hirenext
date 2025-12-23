import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {

  const StyledLinkButton = ({ href, children, variant = "primary" }) => {
    const [hover, setHover] = useState(false);

    const isPrimary = variant === "primary";

    return (
      <a
        href={href}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          padding: "16px 32px",
          fontSize: "16px",
          fontWeight: "600",
          color: isPrimary ? "#fff" : "#0ea5e9",
          backgroundColor: isPrimary ? "#0ea5e9" : "transparent",
          border: isPrimary ? "none" : "2px solid #0ea5e9",
          borderRadius: "12px",
          textDecoration: "none",
          width: "260px",
          textAlign: "center",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: hover ? "translateY(-5px)" : "none",
          boxShadow: hover
            ? "0 15px 30px rgba(14,165,233,0.25)"
            : "0 4px 6px rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px"
        }}
      >
        {children}
        {isPrimary && <span style={{ transition: "0.3s", transform: hover ? "translateX(4px)" : "none" }}>→</span>}
      </a>
    );
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background: "radial-gradient(circle at top right, #f0f9ff 0%, #ffffff 40%, #f8fafc 100%)",
          color: "#0f172a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 20px",
          textAlign: "center"
        }}
      >
        {/* Creative Badge */}
        <div style={{
          backgroundColor: "#e0f2fe",
          color: "#0369a1",
          padding: "8px 16px",
          borderRadius: "100px",
          fontSize: "14px",
          fontWeight: "700",
          marginBottom: "24px",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          🚀 Level Up Your Career
        </div>

        <h1 style={{ 
          fontSize: "clamp(40px, 8vw, 72px)", 
          fontWeight: "800", 
          lineHeight: "1.1",
          margin: "0 0 20px 0",
          background: "linear-gradient(to bottom right, #0f172a, #334155)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          maxWidth: "900px"
        }}>
          Learn. Practice. <span style={{ color: "#0ea5e9", WebkitTextFillColor: "initial" }}>Succeed.</span>
        </h1>

        <p style={{ 
          fontSize: "clamp(18px, 4vw, 22px)", 
          color: "#64748b", 
          maxWidth: "650px", 
          lineHeight: "1.6",
          marginBottom: "40px"
        }}>
          Master the technical interview with AI-powered mock tests and curated preparation paths for modern developers.
        </p>

        <div style={{ 
          display: "flex", 
          flexDirection: "row", 
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px" 
        }}>
          <StyledLinkButton href="/test" variant="primary">
            Browse Mock Tests
          </StyledLinkButton>

          <StyledLinkButton href="/interview" variant="secondary">
            Interview Prep
          </StyledLinkButton>
        </div>

        {/* Subtle Decorative Elements */}
        <div style={{
          marginTop: "60px",
          fontSize: "14px",
          color: "#94a3b8",
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}>

        </div>
      </main>
    </div>
  );
}