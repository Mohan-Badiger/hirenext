import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import allRoles from "../Data/tests/tests.json";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  /* ---------------- Random 4 roles ---------------- */
  const randomRoles = useMemo(() => {
    const shuffled = [...allRoles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, []);
  /* ------------------------------------------------ */

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
          gap: "10px",
        }}
      >
        {children}
        {isPrimary && (
          <span
            style={{
              transition: "0.3s",
              transform: hover ? "translateX(4px)" : "none",
            }}
          >
            →
          </span>
        )}
      </a>
    );
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top right, #f0f9ff 0%, #ffffff 40%, #f8fafc 100%)",
          color: "#0f172a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            backgroundColor: "#e0f2fe",
            color: "#0369a1",
            padding: "8px 16px",
            borderRadius: "100px",
            fontSize: "14px",
            fontWeight: "700",
            marginBottom: "84px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          🚀 Level Up Your Career
        </div>

        <h1
          style={{
            fontSize: "clamp(40px, 8vw, 72px)",
            fontWeight: "800",
            lineHeight: "1.1",
            margin: "0 0 20px 0",
            background: "linear-gradient(to bottom right, #0f172a, #334155)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            maxWidth: "900px",
          }}
        >
          Learn. Practice.{" "}
          <span style={{ color: "#0ea5e9", WebkitTextFillColor: "initial" }}>
            Succeed.
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(18px, 4vw, 22px)",
            color: "#64748b",
            maxWidth: "650px",
            lineHeight: "1.6",
            marginBottom: "40px",
          }}
        >
          Master the technical interview with AI-powered mock tests and curated
          preparation paths for modern developers.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "60px",
          }}
        >
          <StyledLinkButton href="/test" variant="primary">
            Browse Mock Tests
          </StyledLinkButton>

          <StyledLinkButton href="/interview" variant="secondary">
            Interview Prep
          </StyledLinkButton>
        </div>

        {/* Section Header */}
        <div
          style={{
            width: "100%",
            maxWidth: "1100px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "700" }}>
            AI-Powered Mock Tests
          </h2>

          <span
            onClick={() => navigate("/test")}
            style={{
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              color: "#2563eb",
            }}
          >
            View all →
          </span>
        </div>

        {/* ------------------ 4 RANDOM CARDS ------------------ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "1100px",
            marginBottom: "80px",
          }}
        >
          {randomRoles.map((role) => (
            <div
              key={role.id}
              style={{
                background: "#fff",
                borderRadius: "6px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  height: "120px",
                  background: "#f8f9fa",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={role.logo}
                  alt={role.company}
                  style={{
                    width: "100px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div style={{ textAlign: "left" }}>
                <h3 style={{ fontSize: "18px", margin: 0 }}>{role.title}</h3>
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                  {role.company}
                </p>
              </div>

              <Link
                to={`/mocktest/${role.id}/${role.company}/${role.title}`}
                style={{
                  marginTop: "auto",
                  textDecoration: "none",
                  fontWeight: 600,
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Start Test</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          ))}
        </div>
        {/* ---------------------------------------------------- */}
      </main>
    </div>
  );
}
