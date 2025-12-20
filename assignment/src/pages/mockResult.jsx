import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Circle,
  Target,
  Lightbulb,
  BookOpen,
  Download,
  Home,
} from "lucide-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearResult } from "../store/resultSlice";
import { useParams } from "react-router-dom";
import mockQuestions from "../Data/mockTestQA/questions.json";

import allRoles from "../Data/tests/tests.json";
import html2pdf from "html2pdf.js";
const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;

const MaxWidth = styled.div`
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 1280px) {
    max-width: 100%;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f3f4f6;

  @media (max-width: 768px) {
    gap: 1.25rem;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem;
  }
`;

const CompanyLogoContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    align-self: center;
  }
`;

const CompanyLogo = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
  padding: 7px;

  @media (max-width: 768px) {
    height: 40px;
  }

  @media (max-width: 480px) {
    height: 50px;
  }
`;

const HeaderContent = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CompanyTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9375rem;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.25rem;
    border-radius: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 1.25rem 1rem;
  background-color: #f9fafb;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background-color: #f3f4f6;
    border-color: #e5e7eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem 0.5rem;
    border-radius: 0.5rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;

  svg {
    transition: transform 0.3s ease;
  }

  ${StatCard}:hover & svg {
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    margin-bottom: 0.375rem;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.8125rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 0.1875rem;
  }
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.color || "#111827"};

  @media (max-width: 768px) {
    font-size: 1.375rem;
  }

  @media (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

const ButtonGroupHome = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.625rem;
    margin-bottom: 1rem;
  }
`;
const ButtonGroupDownload = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: flex-end; /* Align to right on desktop */

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    justify-content: flex-start; /* Reset to left on tablet */
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.625rem;
    margin-bottom: 1rem;
    justify-content: stretch; /* Full width on mobile */
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);

  &:hover {
    background-color: #1d4ed8;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(37, 99, 235, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.875rem 1.25rem;
    font-size: 0.875rem;
  }
`;

const TabContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 0.5rem;
  }
`;

const TabHeader = styled.div`
  border-bottom: 2px solid #e5e7eb;
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f4f6;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }

  @media (max-width: 480px) {
    border-bottom-width: 1px;
  }
`;

const Tab = styled.button`
  padding: 1.125rem 1.75rem;
  font-weight: 600;
  font-size: 0.9375rem;
  color: ${(props) => (props.$active ? "#2563eb" : "#6b7280")};
  border: none;
  background: none;
  border-bottom: ${(props) =>
    props.$active ? "3px solid #2563eb" : "3px solid transparent"};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: ${(props) => (props.$active ? "#2563eb" : "#111827")};
    background-color: ${(props) => (props.$active ? "transparent" : "#f9fafb")};
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem 1.25rem;
    font-size: 0.8125rem;
    border-bottom-width: 2px;
  }
`;

const TabContent = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const ContentSection = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.75rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d1d5db;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.25rem;
    border-radius: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: start;
  gap: 0.875rem;
  margin-bottom: 1.125rem;

  @media (max-width: 480px) {
    gap: 0.625rem;
    margin-bottom: 0.875rem;

    svg {
      width: 20px;
      height: 20px;
      margin-top: 0.125rem;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.375rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

const ContentBox = styled.div`
  background-color: ${(props) => props.bgColor || "#eff6ff"};
  border-radius: 0.625rem;
  padding: 1.25rem;
  border: 1px solid
    ${(props) => {
      if (props.bgColor === "#fff7ed") return "#fed7aa";
      if (props.bgColor === "#eff6ff") return "#bfdbfe";
      return "#e0e7ff";
    }};

  @media (max-width: 768px) {
    padding: 1.125rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 0.5rem;
  }
`;

const ContentText = styled.div`
  color: #374151;
  line-height: 1.7;
  font-size: 0.9375rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    line-height: 1.65;
  }

  @media (max-width: 480px) {
    font-size: 0.8125rem;
    line-height: 1.6;
  }
`;

const RecommendationCard = styled.div`
  background-color: #f9fafb;
  border-radius: 0.625rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
    transform: translateX(4px);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 1.125rem;
    margin-bottom: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-bottom: 0.75rem;
    border-radius: 0.5rem;
  }
`;

const RecommendationTitle = styled.h3`
  font-weight: 700;
  font-size: 1.0625rem;
  color: #111827;
  margin-bottom: 0.625rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9375rem;
  }
`;

const RecommendationDescription = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 0.875rem;
  line-height: 1.6;
  margin: 0 0 0.875rem 0;

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8125rem;
    line-height: 1.5;
    margin-bottom: 0.625rem;
  }
`;

const ResourceTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 480px) {
    gap: 0.375rem;
  }
`;

const ResourceTag = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #dbeafe;
  color: #1e40af;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  transition: all 0.2s ease;
  border: 1px solid #bfdbfe;

  &:hover {
    background-color: #bfdbfe;
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    font-size: 0.6875rem;
    padding: 0.3125rem 0.75rem;
  }
`;

const ReviewContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const QuestionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const QuestionHeader = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
`;

const QuestionText = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const OptionItem = styled.div`
  padding: 1rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.2s ease;

  ${(props) => {
    if (props.isSelected && props.isCorrect) {
      return `
        background-color: #d1fae5;
        border: 2px solid #10b981;
        color: #065f46;
      `;
    }
    if (props.isSelected && !props.isCorrect) {
      return `
        background-color: #fee2e2;
        border: 2px solid #ef4444;
        color: #991b1b;
      `;
    }
    if (!props.isSelected && props.isCorrect) {
      return `
        background-color: #f0fdf4;
        border: 2px solid #86efac;
        color: #166534;
      `;
    }
    return `
      background-color: #f9fafb;
      border: 2px solid #e5e7eb;
      color: #4b5563;
    `;
  }}

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    font-size: 0.875rem;
  }
`;

const AnswerExplanation = styled.div`
  padding: 1rem 1.25rem;
  background-color: #eff6ff;
  border-left: 4px solid #3b82f6;
  border-radius: 6px;
  font-size: 0.9375rem;
  color: #1e40af;

  strong {
    font-weight: 600;
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    font-size: 0.875rem;
  }
`;

const MockTestResult = () => {
  const [activeTab, setActiveTab] = useState("performance");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const result = useSelector((state) => state.result.data);
  const selectedDifficulty = result?.selectedDifficulty;
  const[mockQuestions,setMockQuestions]=useState([]);
  const[mockRecommendations, setMockRecommendations] = useState([]);
  const { id, company, title } = useParams();
  const testID = id;
  const role = allRoles.find((r) => r.id.toString() === testID);
  const logoUrl = role.logo;

 useEffect(() => {
    const fileName = title.replace(/\s+/g, "_");
    import(`../Data/mockTestQA/${fileName}.json`)
      .then((module) => {
        setMockQuestions(module.default);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
      });
      import(`../Data/recommendations/${fileName}.json`)
      .then((module) => {
        setMockRecommendations(module.default);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
      });

  }, [title]);
 const allQuestions = mockQuestions[selectedDifficulty] || [];


  const resultData = {
    score: result.score,
    totalQuestions: result.totalQuestions,
    correctAnswers: result.correctAnswers,
    incorrectAnswers: result.incorrectAnswers,
    unattempted: result.unattempted,
    testName: title + " - Mock Test",
    recommendations:
      result.score < 10
        ? mockRecommendations[0]
        : result.score < 20
        ? mockRecommendations[1]
        : mockRecommendations[2],
  };
  

   useEffect(() => {
   if (submitted) return;
    if (!result || result.score === undefined) {
      return;
    }
    
  const user = localStorage.getItem('user');
  const userID = user ? JSON.parse(user).id : null;

  const alreadySubmitted = localStorage.getItem(`submitted_${testID}_${userID}`);
  if (alreadySubmitted) return;
  const addResult = async () => {
    const token = localStorage.getItem('token');
    try {
     const res= await fetch('https://hirenext-backend-pied.vercel.app/api/data/addresult', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ testID, userID, testScore: result.score })
      });
      if(!res.ok){
        console.log(res);
      }
      if(res.status===201){
        setSubmitted(true);
         console.log('Result api saved successfully');
         localStorage.setItem(`submitted_${testID}_${userID}`, 'true');
      }
     
    } catch (err) {
      console.error('Error saving result:', err);
    }
  };

  addResult();
}, [resultData.score]);

  const answerPairs = result?.answerPair || [];

  const getReviewData = () => {
    return allQuestions.reduce((acc, question) => {
      const validAnswers = answerPairs.filter(Boolean);
      const userAnswer = validAnswers.find(
        (pair) => pair.questionId === question.id
      );

      if (userAnswer && userAnswer.selectedIndex !== undefined) {
        acc.push({
          ...question,
          selectedIndex: userAnswer.selectedIndex,
          isCorrect: userAnswer.selectedIndex === question.correctAnswer,
        });
      }

      return acc;
    }, []);
  };
  
  


  const {
    score,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    unattempted,
    testName,
    recommendations,
  } = resultData;

  const downloadReport = () => {
    console.log("Downloading report...");
    const element = document.body;

    const options = {
      margin: 0.5,
      filename: "webpage.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  const goToHome = () => {
    console.log("Navigating to home...");
    navigate("/test");
  };

  return (
    <Container>
      <MaxWidth>
        {company && (
          <Card>
            <HeaderSection>
              <CompanyLogoContainer>
                <CompanyLogo
                  src={logoUrl}
                  alt={company}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </CompanyLogoContainer>
              <HeaderContent>
                <CompanyTitle>{company}</CompanyTitle>
                <Title>{testName}</Title>
              </HeaderContent>
            </HeaderSection>

            {/* Stats Grid */}
            <StatsGrid>
              <StatCard>
                <IconWrapper>
                  <Target size={24} color="#2563eb" />
                </IconWrapper>
                <StatLabel>Total Score</StatLabel>
                <StatValue>
                  {score}/{totalQuestions}
                </StatValue>
              </StatCard>

              <StatCard>
                <IconWrapper>
                  <Circle size={24} color="#6b7280" />
                </IconWrapper>
                <StatLabel>Questions</StatLabel>
                <StatValue>{totalQuestions}</StatValue>
              </StatCard>

              <StatCard>
                <IconWrapper>
                  <CheckCircle size={24} color="#16a34a" />
                </IconWrapper>
                <StatLabel>Correct</StatLabel>
                <StatValue color="#16a34a">{correctAnswers}</StatValue>
              </StatCard>

              <StatCard>
                <IconWrapper>
                  <XCircle size={24} color="#dc2626" />
                </IconWrapper>
                <StatLabel>Incorrect</StatLabel>
                <StatValue color="#dc2626">{incorrectAnswers}</StatValue>
              </StatCard>

              <StatCard>
                <IconWrapper>
                  <Circle size={24} color="#9ca3af" />
                </IconWrapper>
                <StatLabel>Unattempted</StatLabel>
                <StatValue color="#9ca3af">{unattempted}</StatValue>
              </StatCard>
            </StatsGrid>

            <ButtonGroupHome>
              <Button onClick={goToHome}>
                <Home size={20} />
                Go to Home
              </Button>
            </ButtonGroupHome>
          </Card>
        )}
        {/* Tabs */}
        <TabContainer>
          <TabHeader>
            <Tab
              $active={activeTab === "performance"}
              onClick={() => setActiveTab("performance")}
            >
              Performance Analysis
            </Tab>
            <Tab
              $active={activeTab === "review"}
              onClick={() => setActiveTab("review")}
            >
              Question Review
            </Tab>
          </TabHeader>

          <TabContent>
            {activeTab === "performance" && (
              <>
                <ButtonGroupDownload>
                  <Button onClick={downloadReport}>
                    <Download size={20} />
                    Download Performance
                  </Button>
                </ButtonGroupDownload>

                <ContentSection>
                  <SectionHeader>
                    <Lightbulb
                      size={24}
                      color="#2563eb"
                      style={{ flexShrink: 0, marginTop: "0.25rem" }}
                    />
                    <SectionTitle>Strengths</SectionTitle>
                  </SectionHeader>
                  <ContentBox bgColor="#eff6ff">
                    <ContentText>
                      {recommendations?.strengths &&
                      recommendations.strengths.length > 0 ? (
                        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                          {recommendations.strengths.map((strength, index) => (
                            <li key={index} style={{ marginBottom: "0.5rem" }}>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "No strengths data available."
                      )}
                    </ContentText>
                  </ContentBox>
                </ContentSection>

                <ContentSection>
                  <SectionHeader>
                    <Target
                      size={24}
                      color="#2563eb"
                      style={{ flexShrink: 0, marginTop: "0.25rem" }}
                    />
                    <SectionTitle>Areas for Improvement</SectionTitle>
                  </SectionHeader>
                  <ContentBox bgColor="#fff7ed">
                    <ContentText>
                      {recommendations?.areas_of_improvement &&
                      recommendations.areas_of_improvement.length > 0 ? (
                        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                          {recommendations.areas_of_improvement.map(
                            (area, index) => (
                              <li
                                key={index}
                                style={{ marginBottom: "0.5rem" }}
                              >
                                {area}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        "No areas for improvement data available."
                      )}
                    </ContentText>
                  </ContentBox>
                </ContentSection>

                <ContentSection>
                  <SectionHeader>
                    <BookOpen
                      size={24}
                      color="#2563eb"
                      style={{ flexShrink: 0, marginTop: "0.25rem" }}
                    />
                    <SectionTitle>Recommended Topics</SectionTitle>
                  </SectionHeader>
                  <div>
                    {recommendations?.recommendations &&
                    recommendations.recommendations.length > 0 ? (
                      recommendations.recommendations.map((rec, index) => (
                        <RecommendationCard key={index}>
                          <RecommendationTitle>{rec.topic}</RecommendationTitle>
                          <RecommendationDescription>
                            {rec.description}
                          </RecommendationDescription>
                          {rec.resources && rec.resources.length > 0 && (
                            <ResourceTags>
                              {rec.resources.map((resource, idx) => (
                                <ResourceTag key={idx}>{resource}</ResourceTag>
                              ))}
                            </ResourceTags>
                          )}
                        </RecommendationCard>
                      ))
                    ) : (
                      <ContentText>No recommendations available.</ContentText>
                    )}
                  </div>
                </ContentSection>
              </>
            )}

            {activeTab === "review" && (
              <ReviewContainer>
                <ButtonGroupDownload>
                  <Button onClick={downloadReport}>
                    <Download size={20} />
                    Download Review
                  </Button>
                </ButtonGroupDownload>

                {getReviewData().map((item, index) => (
                  <QuestionCard key={item.id}>
                    <QuestionHeader>Question {index + 1}</QuestionHeader>
                    <QuestionText>{item.question}</QuestionText>

                    <OptionsContainer>
                      {item.options.map((option, optIndex) => {
                        const isSelected = optIndex === item.selectedIndex;
                        const isCorrect = optIndex === item.correctAnswer;

                        return (
                          <OptionItem
                            key={optIndex}
                            isSelected={isSelected}
                            isCorrect={isCorrect}
                            showCorrect={isSelected || isCorrect}
                          >
                            {option}
                            {isSelected && (isCorrect ? " ✓" : " ✗")}
                            {!isSelected && isCorrect && " (Correct Answer)"}
                          </OptionItem>
                        );
                      })}
                    </OptionsContainer>

                    <AnswerExplanation>
                      <strong>Correct Answer:</strong>{" "}
                      {item.options[item.correctAnswer]}
                    </AnswerExplanation>
                  </QuestionCard>
                ))}
              </ReviewContainer>
            )}
          </TabContent>
        </TabContainer>
      </MaxWidth>
    </Container>
  );
};

export default MockTestResult;
