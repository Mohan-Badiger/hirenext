import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowUpRight } from "lucide-react";

/* ---------------- MOCK TESTS SECTION ---------------- */

function MockTests() {
  const navigate = useNavigate();
  const tabs = ["Tech", "Management", "General"];
  const [active, setActive] = useState("Tech");

  const tests = [
    { id: 1, role: "Software Developer", desc: "Designs, codes, and maintains software solutions.", color: "#7c3aed" },
    { id: 2, role: "Data Analyst", desc: "Analyzes and interprets complex data for insights.", color: "#ec4899" },
    { id: 3, role: "Backend Developer", desc: "Develops and maintains server-side applications.", color: "#2563eb" },
    { id: 4, role: "Frontend Developer", desc: "Creates engaging, responsive web interfaces.", color: "#8b5cf6" },
    { id: 5, role: "Software Developer", desc: "Designs, codes, and maintains software solutions.", color: "#7c3aed" },
    { id: 6, role: "Data Analyst", desc: "Analyzes and interprets complex data for insights.", color: "#ec4899" },
  ];

  return (
    <section style={styles.section}>
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.sectionTitle}>AI-Powered Mock Tests</h2>
          <p style={styles.sectionSub}>
            Master your concepts with AI-powered full-length mock tests.
          </p>
        </div>

        <span
          onClick={() => navigate("/test")}
          style={styles.viewAll}
        >
          View all →
        </span>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            style={{
              ...styles.tabBtn,
              ...(active === t ? styles.tabActive : {}),
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div style={styles.scrollRail}>
        {tests.map((t) => (
          <div key={t.id} style={styles.card}>
            <div
              style={{
                ...styles.cardTop,
                background: `linear-gradient(135deg, ${t.color}, #1e293b)`,
              }}
            >
              <h3 style={styles.cardTitle}>{t.role}</h3>
            </div>

            <div style={styles.cardBody}>
              <p style={styles.cardDesc}>{t.desc}</p>
              <div style={styles.cardFooter}>
                <button
                  onClick={() => navigate("/test")}
                  style={styles.startBtn}
                >
                  Start Test
                </button>
                <button style={styles.arrowBtn}>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- HOME ---------------- */

export default function Home() {
  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.main}>
        {/* Badge */}
        <div style={styles.badge}>🚀 Level Up Your Career</div>

        <h1 style={styles.heroTitle}>
          Learn. Practice. <span style={styles.heroHighlight}>Succeed.</span>
        </h1>

        <p style={styles.heroDesc}>
          Master the technical interview with AI-powered mock tests and curated
          preparation paths for modern developers.
        </p>

        <div style={styles.heroButtons}>
          <a href="/test" style={styles.primaryBtn}>Browse Mock Tests</a>
          <a href="/interview" style={styles.secondaryBtn}>Interview Prep</a>
        </div>

        {/* Mock Tests Section */}
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
    textAlign: "center",
    padding: "0 20px",
  },

  /* Hero */
  badge: {
    marginTop: "80px",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "8px 16px",
    borderRadius: "100px",
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "1px",
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

  /* Section */
  section: {
    width: "100%",
    maxWidth: "1200px",
    marginTop: "80px",
    textAlign: "left",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
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

  /* Tabs */
  tabs: {
    display: "flex",
    gap: "10px",
    margin: "20px 0",
    flexWrap: "wrap",
  },
  tabBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #cbd5f5",
    background: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
  tabActive: {
    background: "#e0f2fe",
    borderColor: "#0ea5e9",
    color: "#0369a1",
  },

  /* Cards */
  scrollRail: {
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    paddingBottom: "20px",
  },
  card: {
    minWidth: "260px",
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    overflow: "hidden",
    flexShrink: 0,
  },
  cardTop: {
    height: "120px",
    padding: "16px",
    color: "#fff",
    display: "flex",
    alignItems: "flex-end",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "700",
  },
  cardBody: {
    padding: "16px",
  },
  cardDesc: {
    fontSize: "14px",
    color: "#64748b",
  },
  cardFooter: {
    marginTop: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  startBtn: {
    background: "none",
    border: "none",
    color: "#2563eb",
    fontWeight: "600",
    cursor: "pointer",
  },
  arrowBtn: {
    background: "#eff6ff",
    border: "none",
    borderRadius: "50%",
    padding: "6px",
    cursor: "pointer",
  },
};
