import React, { useState } from "react";
import styled from "styled-components";
import { ArrowUpRight, Play, Info } from "lucide-react";
import logo from "../utils/logo.jpg";
import { Link } from "react-router-dom";
import allRoles from "../Data/tests/tests.json";
import { useEffect } from "react";
import { Clock } from "lucide-react";
import { X } from "lucide-react";

const Container = styled.div`
  min-height: 100vh;
  background: #fff;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #f7f9ff 0%, #d8ddfb 50%, #caddf2 100%);
  padding: 0px 10px 0px;
  height: 333.6px;

  position: relative;
  overflow: hidden;
  @media (max-width: 968px) {
    background: linear-gradient(
      135deg,
      #f7f9ff 0%,
      #e1e5fcff 50%,
      #cee4f4ff 100%
    );
    height: auto;
    padding: 30px 0px 20px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    overflow-x: hidden;
  }
`;

const MobileHeader = styled.div`
  display: none;
  @media (max-width: 968px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 12px;
    width: 100%;
  }
`;

const MyAttemptsButton = styled.button`
  display: none;
  @media (max-width: 968px) {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #0056b3;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const HeroContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
  margin-left: 120.7px;
  margin-right: 120.7px;
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    margin-left: 0;
    margin-right: 0;
    padding: 0 20px;
    gap: 5px;
    display: flex;
    flex-direction: column;
  }
`;

const MobileTopRow = styled.div`
  display: none;

  @media (max-width: 968px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 968px) {
    gap: 16px;
    align-items: flex-start;
    width: 100%;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #1a237e;
  background-image: radial-gradient(white 10%, transparent 11%),
    /* Slightly smaller dots */ radial-gradient(white 10%, transparent 11%); /* Slightly smaller dots */
  background-size: 16px 16px, 14px 14px; /* Increased size to reduce density */
  background-position: 0 0, 8px 8px; /* Increased offset for more spacing */
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  width: fit-content;

  @media (max-width: 968px) {
    font-size: 12px;
    margin: 0;
  }

  &::before {
    content: "✨";
    font-size: 16px;
    // --- START CHANGES FOR WHITE STAR (using filter) ---
    filter: grayscale(100%) brightness(500%); /* Makes it grayscale and very bright */
    // --- END CHANGES ---
  }
`;

const Badge2 = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #1a237e;
  background-image: radial-gradient(white 10%, transparent 11%),
    /* Slightly smaller dots */ radial-gradient(white 10%, transparent 11%); /* Slightly smaller dots */
  background-size: 16px 16px, 14px 14px; /* Increased size to reduce density */
  background-position: 0 0, 8px 8px; /* Increased offset for more spacing */
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  width: fit-content;

  @media (max-width: 968px) {
    display: none;
  }

  &::before {
    content: "✨";
    font-size: 16px;
    filter: grayscale(100%) brightness(500%);
  }
`;

const HeroTitle = styled.h1`
  font-size: 56px;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
  line-height: 1.1;

  @media (max-width: 968px) {
    font-size: 32px;
    text-align: left;
  }

  @media (max-width: 640px) {
    font-size: 28px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
  max-width: 600px;

  @media (max-width: 968px) {
    font-size: 14px;
    text-align: left;
  }
`;

const HeroRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 968px) {
    display: none;
  }
`;

const LaptopContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 600px;
  @media (max-width: 968px) {
    max-width: 120px;
    height: 87px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
`;

const LaptopImage = styled.img`
  width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));

  @media (max-width: 968px) {
    width: auto;
    height: 87px;
    object-fit: contain;
  }
`;

const MainContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 60px 20px 40px;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    padding: 20px 20px;
  }

  @media (max-width: 968px) {
    padding: 20px 20px;
  }
`;

const LeftSection = styled.div`
  padding: 0;
  position: relative;
  top: -60px;

  @media (max-width: 968px) {
    top: 0;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 30px;

  @media (max-width: 968px) {
    font-size: 22px;
    margin-bottom: 20px;
  }
`;

const MobileCreditsCard = styled.div`
  display: none;

  @media (max-width: 968px) {
    display: flex;
    background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
    border-radius: 16px;
    padding: 14px 16px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
`;

const CreditsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CreditsIcon = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
  @media (max-width: 968px) {
    width: 22px;
    height: 22px;
    font-size: 10px;
  }
`;

const CreditsText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #424242;
`;

const CreditsCount = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #5e35b1;
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 40px;

  @media (max-width: 968px) {
    gap: 8px;
    margin-bottom: 24px;
  }
`;

const Select = styled.select`
  padding: 14px 18px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  font-size: 15px;
  color: #424242;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
  transition: all 0.3s ease;

  @media (max-width: 968px) {
    padding: 10px 12px;
    font-size: 13px;
    background-position: right 12px center;
  }

  &:hover {
    border-color: #9e9e9e;
  }

  &:focus {
    outline: none;
    border-color: #5e35b1;
    box-shadow: 0 0 0 3px rgba(94, 53, 177, 0.1);
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    width: 100%;
  }
`;

const RoleCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 232px;
  width: 266px;
  gap: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 968px) {
    width: 100%;
    height: auto;
    min-height: 180px;
    padding: 10px;
    gap: 6px;
    box-sizing: border-box;
  }

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: #000;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 120px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  @media (max-width: 968px) {
    height: 80px;
    margin-bottom: 4px;
  }
`;

const CompanyLogo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;

  @media (max-width: 968px) {
    width: 90px;
    height: 90px;
  }
`;

const RoleTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #212121;
  margin: 0;

  @media (max-width: 968px) {
    font-size: 12px;
  }
`;

const CompanyName = styled.p`
  font-size: 14px;
  color: #757575;
  margin: 0;

  @media (max-width: 968px) {
    font-size: 10px;
  }
`;

const StartLink = styled(Link)`
  width: 90%;
  padding: 12px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #424242;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  margin-top: auto;
  text-decoration: none;

  @media (max-width: 968px) {
    width: 90%;
    padding: 8px;
    font-size: 11px;
  }

  &:hover {
    background: #f5f5f5;
    border-color: #9e9e9e;
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CreditsCard = styled.div`
  background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%);
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SidebarSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const SidebarTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
`;

const AttemptsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  /* --- Added for scrollability --- */
  max-height: 400px; /* **Adjust this value as needed** */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #c0c0c0 transparent;
  /* --- ----------------------- --- */
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
`;

const TableHeaderCell = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #757575;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AttemptRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
`;

const AttemptInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AttemptTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #212121;
`;

const AttemptDate = styled.span`
  font-size: 12px;
  color: #9e9e9e;
`;

const Score = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #424242;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
  }

  svg {
    width: 16px;
    height: 16px;
    color: #616161;
  }
`;
const IconButtonCross = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: #e14646ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
  }

  svg {
    width: 16px;
    height: 16px;
    color: #616161;
  }
`;

const ReferSection = styled.div`
  background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ReferTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const ReferDescription = styled.p`
  font-size: 14px;
  color: #616161;
  margin: 0;
  line-height: 1.6;
`;

const ReferImage = styled.div`
  width: 100%;
  height: 80px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`;

const ReferButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const ReferButton = styled.button`
  padding: 10px 16px;
  border: 1px solid #c2185b;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.primary
      ? `
    background: #c2185b;
    color: white;
    
    &:hover {
      background: #ad1457;
    }
  `
      : `
    background: white;
    color: #c2185b;
    
    &:hover {
      background: #fce4ec;
    }
  `}
`;

// Mobile Modal Styles
const ModalOverlay = styled.div`
  display: none;

  @media (max-width: 1200px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
`;

const ModalContent = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 20px 20px 0 0;
  max-height: 60vh;
  overflow-y: auto;
  padding: 24px;
  z-index: 1001;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;

  &:hover {
    color: #424242;
  }
`;

function App() {
  // const roles = allRoles;
  // const [results, setResults] = useState([]);
  // const [loading, setLoading] = useState(true);
  const rolesData = React.useMemo(() => allRoles, []);

  const [attempts, setAttempts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = localStorage.getItem("user");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedRoleType, setSelectedRoleType] = useState("");

  const filteredRoles = React.useMemo(() => {
    return allRoles.filter((role) => {
      const matchesCategory =
        !selectedCategory || role.category === selectedCategory;
      const matchesCompany =
        !selectedCompany || role.company === selectedCompany;
      const matchesRoleType =
        !selectedRoleType ||
        role.title.toLowerCase().includes(selectedRoleType.toLowerCase());

      return matchesCategory && matchesCompany && matchesRoleType;
    });
  }, [selectedCategory, selectedCompany, selectedRoleType]);

  const uniqueCompanies = React.useMemo(() => {
    return [...new Set(allRoles.map((r) => r.company))].sort();
  }, []);

  const handleDelete = async (resultId) => {
  const userData = localStorage.getItem("user");
  const email = userData ? JSON.parse(userData).email : null;

  if (!email || !resultId) return;

  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/data/deleteresult/${resultId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (!res.ok) {
      console.error("Delete failed");
      return;
    }

    // ✅ REMOVE FROM UI IMMEDIATELY
    setAttempts((prev) =>
      prev.filter((attempt) => attempt.resultId !== resultId)
    );

  } catch (err) {
    console.error("Delete error:", err);
  }
};


  useEffect(() => {
    const fetchResults = async () => {
      const email = user ? JSON.parse(user).email : null;
      const token = localStorage.getItem("token");
      if (!email) return;

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/data/getresults/${encodeURIComponent(email)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) {
          console.error("Error fetching results:", res);
          return;
        }

        const data = await res.json();
        const apiResults = data.results || [];

        // 1️⃣ sort latest first
        apiResults.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        // 2️⃣ keep only latest attempt per test
        const latestMap = new Map();

        for (const r of apiResults) {
          if (!latestMap.has(r.test_id)) {
            const role = rolesData.find(
              (role) => String(role.id) === String(r.test_id)
            );

            let totalQuestions = 0;
            const difficulty = r.difficulty || "novice"; // fallback

            // 3️⃣ load ONLY attempted difficulty questions
            if (role?.title) {
              try {
                const fileName = role.title.replace(/ /g, "_");
                const questions = require(`../Data/mockTestQA/${fileName}.json`);

                totalQuestions = questions[difficulty]?.length || 0;
              } catch (err) {
                console.warn("Questions file missing for:", role?.title);
              }
            }

            latestMap.set(r.test_id, {
              resultId: r.id,              // ✅ IMPORTANT for delete
              testId: r.test_id,
              title: role?.title ?? "Unknown Role",
              company: role?.company ?? "Unknown Company",
              score: r.test_score,
              totalQuestions,
              difficulty,
              date: new Date(r.created_at).toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            });
          }
        }

        setAttempts(Array.from(latestMap.values()));
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    fetchResults();
  }, [rolesData, user]);



  localStorage.removeItem("mockTestState");
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("submitted_")) {
      localStorage.removeItem(key);
    }
  });

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <MobileTopRow>
            <Badge>AI-Powered</Badge>
            <LaptopContainer>
              <LaptopImage src={logo} alt="Laptop" />
            </LaptopContainer>
          </MobileTopRow>

          <HeroLeft>
            <Badge2>AI-Powered</Badge2>
            <HeroTitle>Company Mock Tests</HeroTitle>
            <HeroSubtitle>
              Master your concepts with full-length AI-Powered mock exams for
              360° preparation!
            </HeroSubtitle>
            <MobileHeader>
              <MyAttemptsButton onClick={() => setIsModalOpen(true)}>
                <Clock />
                My Attempts
              </MyAttemptsButton>
            </MobileHeader>
          </HeroLeft>
          <HeroRight>
            <LaptopContainer>
              <LaptopImage src={logo} alt="Laptop" />
            </LaptopContainer>
          </HeroRight>
        </HeroContent>
      </HeroSection>

      <MainContent>
        <LeftSection>
          <MobileCreditsCard>
            <CreditsInfo>
              <CreditsIcon>AI</CreditsIcon>
              <CreditsText>AI Credits</CreditsText>
            </CreditsInfo>
            <CreditsCount>0/7</CreditsCount>
          </MobileCreditsCard>

          <SectionTitle>Top Roles</SectionTitle>

          <FilterContainer>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
              <option value="Management">Management</option>
            </Select>

            <Select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="">All Companies</option>
              {uniqueCompanies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </Select>

            <Select
              value={selectedRoleType}
              onChange={(e) => setSelectedRoleType(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="Engineer">Engineer</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Analyst">Analyst</option>
              <option value="Intern">Intern</option>
            </Select>
          </FilterContainer>

          <CardsGrid>
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role) => (
                <RoleCard key={role.id}>
                  <LogoContainer>
                    <CompanyLogo src={role.logo} alt={role.company} />
                  </LogoContainer>
                  <div>
                    <RoleTitle>{role.title}</RoleTitle>
                    <CompanyName>{role.company}</CompanyName>
                  </div>
                  <StartLink
                    to={`/mocktest/${role.id}/${role.company}/${role.title}`}
                  >
                    <span>Start Test</span>
                    <ArrowUpRight size={18} />
                  </StartLink>
                </RoleCard>
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  padding: "40px",
                  color: "#666",
                }}
              >
                No matching roles found.
              </div>
            )}
          </CardsGrid>
        </LeftSection>

        <RightSection>
          <Sidebar>
            <CreditsCard>
              <CreditsInfo>
                <CreditsIcon>AI</CreditsIcon>
                <CreditsText>AI Credits</CreditsText>
                <Info size={16} color="#757575" />
              </CreditsInfo>
              <CreditsCount>2/7</CreditsCount>
            </CreditsCard>

            <SidebarSection>
              <SidebarTitle>
                My Attempts
                {attempts.length > 0 && (
                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "14px",
                      marginLeft: "6px",
                    }}
                  >
                    ({attempts.length})
                  </span>
                )}
              </SidebarTitle>

              <AttemptsTable>
                <TableHeader>
                  <TableHeaderCell>Category</TableHeaderCell>
                  <TableHeaderCell>Score</TableHeaderCell>
                  <TableHeaderCell>Action</TableHeaderCell>
                </TableHeader>

                {attempts.length === 0 ? (
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#777",
                    }}
                  >
                    No attempts yet
                  </div>
                ) : (
                  attempts.map((attempt) => (
                    <AttemptRow key={attempt.testId}>
                      <AttemptInfo>
                        <AttemptTitle>
                          {attempt.company} {attempt.title}
                        </AttemptTitle>
                        <AttemptDate>
                          {attempt.difficulty.toUpperCase()} • Last Attempted: {attempt.date}
                        </AttemptDate>

                      </AttemptInfo>

                      {/* ✅ EXACT format: 20/50 */}
                      <Score>
                        {attempt.score}/{attempt.totalQuestions}
                      </Score>


                      <ActionButtons>
                        {/* ✅ Delete latest attempt */}
                        <IconButtonCross onClick={() => handleDelete(attempt.resultId)}>
                          <X color="black" />
                        </IconButtonCross>


                        {/* ✅ Resume test */}
                        <IconButton
                          onClick={() =>
                            (window.location.href = `/mocktest/${attempt.testId}/${attempt.company}/${attempt.title}`)
                          }
                        >
                          <Play />
                        </IconButton>
                      </ActionButtons>
                    </AttemptRow>
                  ))
                )}
              </AttemptsTable>
            </SidebarSection>

            <ReferSection>
              <ReferTitle>Refer & Win</ReferTitle>
              <ReferDescription>
                MacBook, iPhone, Apple Watch, Cash and more!
              </ReferDescription>
              <ReferImage>🎁 💰</ReferImage>
              <ReferButtons>
                <ReferButton>Refer now</ReferButton>
                <ReferButton $primary>Know more</ReferButton>
              </ReferButtons>
            </ReferSection>
          </Sidebar>
        </RightSection>
      </MainContent>

      {/* Mobile Modal for Attempts */}
      <ModalOverlay
        $isOpen={isModalOpen}
        onClick={() => setIsModalOpen(false)}
      />
      {isModalOpen && (
        <ModalContent>
          <ModalHeader>
            <ModalTitle>My Attempts</ModalTitle>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              <X size={24} />
            </CloseButton>
          </ModalHeader>
          <AttemptsTable>
            <TableHeader>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Score</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableHeader>
            {attempts.map((attempt) => (
              <AttemptRow key={attempt.id}>
                <AttemptInfo>
                  <AttemptTitle>
                    {attempt.company + " " + attempt.title}
                  </AttemptTitle>
                  <AttemptDate>{attempt.date}</AttemptDate>
                </AttemptInfo>
                <Score>{attempt.score}</Score>
                <ActionButtons>
                  <IconButtonCross onClick={() => handleDelete(attempt.id)}>
                    <X color="black" />
                  </IconButtonCross>
                  <IconButton>
                    <Play />
                  </IconButton>
                </ActionButtons>
              </AttemptRow>
            ))}
          </AttemptsTable>
        </ModalContent>
      )}
    </Container>
  );
}

export default App;
