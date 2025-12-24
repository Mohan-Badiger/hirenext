import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import allRoles from "../Data/tests/tests.json";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- MOCK TESTS SECTION ---------------- */

function MockTests() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section style={styles.section}>
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.sectionTitle}>AI-Powered Mock Tests</h2>
          <p style={styles.sectionSub}>
            Practice real interview questions from top companies.
          </p>
        </div>

        <span onClick={() => navigate("/test")} style={styles.viewAll}>
          View all →
        </span>
      </div>

      {/* Scroll Buttons (Desktop only) */}
      <button
        onClick={scrollLeft}
        className="desktop-only"
        style={{ ...styles.scrollBtn, left: "-20px" }}
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={scrollRight}
        className="desktop-only"
        style={{ ...styles.scrollBtn, right: "-20px" }}
      >
        <ChevronRight size={18} />
      </button>

      {/* Cards */}
      <div ref={scrollRef} style={styles.scrollRail}>
        {allRoles.map((role) => (
          <div key={role.id} style={styles.card}>
            <div style={styles.cardTop}>
              <img src={role.logo} alt={role.company} style={styles.logo} />
            </div>

            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>{role.title}</h3>
              <p style={styles.cardCompany}>{role.company}</p>

              <Link
                to={`/mocktest/${role.id}/${role.company}/${role.title}`}
                style={styles.startLink}
              >
                <span>Start Test</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop-only CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-only {
              display: none !important;
            }
          }
        `}
      </style>
    </section>
  );
}

/* ---------------- HOME ---------------- */

export default function Home() {
  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.main}>
        <div style={styles.badge}>🚀 Level Up Your Career</div>

        <h1 style={styles.heroTitle}>
          Learn. Practice. <span style={styles.heroHighlight}>Succeed.</span>
        </h1>

        <p style={styles.heroDesc}>
          Crack technical interviews with AI-powered mock tests from top tech
          companies.
        </p>

        <div style={styles.heroButtons}>
          <Link to="/test" style={styles.primaryBtn}>
            Browse Mock Tests
          </Link>
          <Link to="/interview" style={styles.secondaryBtn}>
            Interview Prep
          </Link>
        </div>

        <MockTests />
      </main>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    backgroundColor: "#fff",
    minHeight: "100vh",
  },

  main: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top right, #f0f9ff 0%, #ffffff 40%, #f8fafc 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 20px",
    textAlign: "center",
  },

  badge: {
    marginTop: "80px",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "8px 16px",
    borderRadius: "100px",
    fontSize: "14px",
    fontWeight: "700",
  },

  heroTitle: {
    fontSize: "clamp(36px, 8vw, 72px)",
    fontWeight: "800",
    margin: "20px 0",
  },

  heroHighlight: {
    color: "#0ea5e9",
  },

  heroDesc: {
    maxWidth: "650px",
    fontSize: "18px",
    color: "#64748b",
  },

  heroButtons: {
    marginTop: "30px",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  primaryBtn: {
    padding: "14px 30px",
    background: "#0ea5e9",
    color: "#fff",
    borderRadius: "12px",
    fontWeight: "600",
    textDecoration: "none",
  },

  secondaryBtn: {
    padding: "14px 30px",
    border: "2px solid #0ea5e9",
    color: "#0ea5e9",
    borderRadius: "12px",
    fontWeight: "600",
    textDecoration: "none",
  },

  section: {
    width: "100%",
    maxWidth: "1200px",
    marginTop: "80px",
    position: "relative",
    textAlign: "left",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
  },

  sectionTitle: {
    fontSize: "26px",
    fontWeight: "700",
  },

  sectionSub: {
    fontSize: "14px",
    color: "#64748b",
  },

  viewAll: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2563eb",
    cursor: "pointer",
  },

  scrollRail: {
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    paddingBottom: "20px",
    scrollBehavior: "smooth",
  },

  scrollBtn: {
    position: "absolute",
    top: "55%",
    transform: "translateY(-50%)",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#fff",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  card: {
    minWidth: "280px",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    flexShrink: 0,
  },

  cardTop: {
    height: "120px",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: "90px",
    height: "90px",
    objectFit: "contain",
  },

  cardBody: {
    padding: "16px",
  },

  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
  },

  cardCompany: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "12px",
  },

  startLink: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textDecoration: "none",
    fontWeight: "600",
    color: "#2563eb",
  },
};
