import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setResult } from "../store/resultSlice";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';

// Step transition variants
const stepVariants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -50,
  }
};

const stepTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};

const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
    align-items: flex-start;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 60px 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 30px 20px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 60px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 30px;
  }
`;

const DifficultyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const DifficultyCard = styled.button`
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 40px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  &:hover {
    border-color: #4caf50;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 30px 15px;
    gap: 15px;
  }

  @media (max-width: 480px) {
    padding: 25px 15px;
  }

  &:active {
    transform: translateY(0);
  }
`;

const BarChart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 40px;

  @media (max-width: 480px) {
    height: 35px;
    gap: 3px;
  }
`;

const Bar = styled.div`
  width: 8px;
  background: ${(props) => props.color};
  height: ${(props) => props.height}%;
  border-radius: 2px;

  @media (max-width: 480px) {
    width: 6px;
  }
`;

const DifficultyLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const TestContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1400px;
  width: 100%;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const LeftPanel = styled.div`
  padding: 40px;

  @media (max-width: 968px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const RightPanel = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;

  @media (max-width: 968px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 8px;
  }
`;

const TestTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 26px;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 20px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  color: #666;

  @media (max-width: 480px) {
    font-size: 14px;
    gap: 8px;
    margin-bottom: 12px;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #333;
`;

const GuidelinesTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;

  &:before {
    content: "💡";
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

const GuidelinesList = styled.ul`
  list-style: none;
  padding-left: 0;

  @media (max-width: 480px) {
    padding-left: 0;
  }
`;

const GuidelineItem = styled.li`
  margin-bottom: 15px;
  padding-left: 30px;
  position: relative;
  color: #555;
  line-height: 1.6;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    font-weight: bold;
  }

  @media (max-width: 480px) {
    margin-bottom: 12px;
    padding-left: 20px;
    font-size: 14px;
    line-height: 1.5;
  }
`;

const StartInput = styled.input`
  width: 100%;
  padding: 14px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  margin-top: 20px;
  transition: border-color 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 14px;
  }
`;

const StartButton = styled.button`
  background: ${(props) => (props.disabled ? "#e0e0e0" : "#4CAF50")};
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin: 20px 0 0 0;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;

  &:hover {
    background: ${(props) => (props.disabled ? "#e0e0e0" : "#45a049")};
  }

  &:after {
    content: "→";
    font-size: 20px;
  }

  @media (max-width: 480px) {
    padding: 12px 30px;
    font-size: 14px;
    margin-top: 15px;
  }
`;

const QuestionContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;

  @media (max-width: 768px) {
    margin-bottom: 25px;
    padding-bottom: 15px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 20px;
  }
`;

const QuestionNumber = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #666;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Timer = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #4caf50;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const QuestionText = styled.h3`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 30px;
  color: #333;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 20px;
    line-height: 1.5;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 25px;
  }
`;

const OptionButton = styled.button`
  background: ${(props) => (props.selected ? "#e8f5e9" : "white")};
  border: 2px solid ${(props) => (props.selected ? "#4CAF50" : "#e0e0e0")};
  border-radius: 8px;
  padding: 18px 20px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;
  color: #333;
  position: relative;
  padding-right: 50px;

  &:hover {
    border-color: #4caf50;
    background: ${(props) =>
      props.selected ? "#e8f5e9" : "#f5f5f5"}; /* Modified */
  }

  /* Add this - checkmark styling */
  &::after {
    content: "✓";
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #4caf50;
    font-size: 24px;
    font-weight: bold;
    opacity: ${(props) => (props.selected ? "1" : "0")};
    transition: opacity 0.3s;
  }

  @media (max-width: 768px) {
    padding: 16px 18px;
    padding-right: 45px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    padding: 14px 16px;
    padding-right: 40px;
    font-size: 14px;
    border-radius: 6px;

    &::after {
      font-size: 20px;
      right: 16px;
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
`;

const NavButton = styled.button`
  background: ${(props) => (props.primary ? "#4CAF50" : "white")};
  color: ${(props) => (props.primary ? "white" : "#666")};
  border: 2px solid ${(props) => (props.primary ? "#4CAF50" : "#e0e0e0")};
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${(props) => (props.primary ? "#45a049" : "#f5f5f5")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 10px 25px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 6px;
  }
`;

const difficulties = [
  {
    id: "novice",
    label: "Novice",
    colors: ["#81C784", "#A5D6A7", "#C8E6C9", "#E8F5E9"],
    heights: [40, 60, 80, 100],
  },
  {
    id: "easy",
    label: "Easy",
    colors: ["#66BB6A", "#81C784", "#A5D6A7", "#C8E6C9"],
    heights: [50, 70, 85, 100],
  },
  {
    id: "intermediate",
    label: "Intermediate",
    colors: ["#FFA726", "#FFB74D", "#FFCC80", "#FFE0B2"],
    heights: [60, 75, 90, 100],
  },
  {
    id: "master",
    label: "Master",
    colors: ["#FF7043", "#FF8A65", "#FFAB91", "#FFCCBC"],
    heights: [70, 85, 95, 100],
  },
  {
    id: "expert",
    label: "Expert",
    colors: ["#E53935", "#EF5350", "#E57373", "#EF9A9A"],
    heights: [80, 90, 95, 100],
  },
];

export default function MockTest() {
  const [step, setStep] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [startInput, setStartInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds
  const navigate = useNavigate();
  const [isRestored, setIsRestored] = useState(false);
  const [mockQuestions, setMockQuestions] = useState(null);
  const { id, company, title } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fileName = title.replace(/\s+/g, "_");
    import(`../Data/mockTestQA/${fileName}.json`)
      .then((module) => {
        setMockQuestions(module.default);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
      });
  }, [title]);

  useEffect(() => {
    if (step == null) return;
    const data = {
      step,
      selectedDifficulty,
      currentQuestionIndex,
      answers,
      timeRemaining,
    };
    if (!null) {
      localStorage.setItem("mockTestState", JSON.stringify(data));
    }
  }, [step, selectedDifficulty, currentQuestionIndex, answers, timeRemaining]);
 

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mockTestState"));
  
    if (saved) {
      setStep(saved.step);
      setSelectedDifficulty(saved.selectedDifficulty);
      setCurrentQuestionIndex(saved.currentQuestionIndex);
      setAnswers(saved.answers);
      setTimeRemaining(saved.timeRemaining);
    } else {
      setStep("difficulty");

      console.log("id,company,title", id, company, title);
    }
    setIsRestored(true);
  }, []);
  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setStep("guidelines");
  };

  const handleStartTest = () => {
    if (startInput.toLowerCase() === "start") {
      setStep("test");
      // Start timer
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };
  

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentQuestions = selectedDifficulty
    ? mockQuestions[selectedDifficulty]
    : [];
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const handleOptionSelect = (index, questionId) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = { questionId, selectedIndex: index };
    setAnswers(newAnswers);
  };
  console.log("mockQuestions", mockQuestions);
  console.log("currentQuestions", currentQuestions);
  const calculateScore = () => {
    console.log(answers);
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < answers.length; i++) {
      const userAnswer = answers[i];
      const question = currentQuestions[i];
      if (userAnswer && userAnswer.selectedIndex === question.correctAnswer) {
        correct++;
      } else if (
        userAnswer &&
        userAnswer.selectedIndex !== question.correctAnswer
      ) {
        incorrect++;
      }
    }
    return { correct, incorrect };
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const { correct, incorrect } = calculateScore();
      console.log("✅ correct:", correct);
      console.log("❌ incorrect:", incorrect);
      console.log("📋 totalQuestions:", currentQuestions.length);
      console.log("📋 answers:", answers);
      console.log("📋 answers.length:", answers.length);
      const result = {
        // Basic scores
        score: correct,
        totalQuestions: currentQuestions.length,
        correctAnswers: correct,
        incorrectAnswers: incorrect,
        unattempted: currentQuestions.length - (correct + incorrect),
        testName: title + " -Mock Test",
        answerPair: answers,
        selectedDifficulty,
        completedAt: new Date().toISOString(),
      };
      dispatch(setResult(result));
      localStorage.removeItem("mockTestData");
      navigate(`/result/${id}/${company}/${title}`, { replace: true });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!isRestored) {
    return <div>Loading..</div>;
  }

  if (step === "difficulty") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="difficulty"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={stepVariants}
          transition={stepTransition}
        >
          <Container>
            <Card>
              <Title>Select difficulty level</Title>
              <DifficultyGrid>
                {difficulties.map((diff) => (
                  <DifficultyCard
                    key={diff.id}
                    onClick={() => handleDifficultySelect(diff.id)}
                  >
                    <BarChart>
                      {diff.colors.map((color, i) => (
                        <Bar key={i} color={color} height={diff.heights[i]} />
                      ))}
                    </BarChart>
                    <DifficultyLabel>{diff.label}</DifficultyLabel>
                  </DifficultyCard>
                ))}
              </DifficultyGrid>
            </Card>
          </Container>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (step === "guidelines") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="guidelines"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={stepVariants}
          transition={stepTransition}
        >
          <Container>
            <TestContainer>
              <LeftPanel>
                <TestTitle>AI Engineer - Mock Test</TestTitle>
                <InfoRow>
                  <span>❓</span>
                  <InfoLabel>Questions</InfoLabel>
                  <span>{currentQuestions.length}</span>
                </InfoRow>
                <InfoRow>
                  <span>📄</span>
                  <InfoLabel>Marks</InfoLabel>
                  <span>{currentQuestions.length * 1}</span>
                </InfoRow>
              </LeftPanel>

              <RightPanel style={{ padding: "20px" }}>
                <GuidelinesTitle>Guidelines</GuidelinesTitle>

                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "15px",
                    color: "#333",
                  }}
                >
                  Timelines & Questions
                </h4>

                <GuidelinesList>
                  <GuidelineItem>
                    <strong>Assessment Duration:</strong> 00:15:00 (hh:mm:ss)
                  </GuidelineItem>
                  <GuidelineItem>
                    <strong>Total Questions to be answered:</strong>{" "}
                    {currentQuestions.length}
                  </GuidelineItem>
                  <GuidelineItem>
                    Do not close the window or tab if you wish to continue the
                    application.
                  </GuidelineItem>
                  <GuidelineItem>
                    Please ensure that you attempt the assessment in one sitting as
                    once you start the assessment, the timer won't stop.
                  </GuidelineItem>
                </GuidelinesList>

                <StartInput
                  type="text"
                  placeholder='Type "start" to Start'
                  value={startInput}
                  onChange={(e) => setStartInput(e.target.value)}
                />

                <StartButton
                  disabled={startInput.toLowerCase() !== "start"}
                  onClick={handleStartTest}
                >
                  Start
                </StartButton>
              </RightPanel>
            </TestContainer>
          </Container>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Questions step
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="questions"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={stepVariants}
        transition={stepTransition}
      >
        <Container>
          <Card>
            <QuestionContainer>
              <QuestionHeader>
                <QuestionNumber>
                  Question {currentQuestionIndex + 1} of {currentQuestions.length}
                </QuestionNumber>
                <Timer>⏱️ {formatTime(timeRemaining)}</Timer>
              </QuestionHeader>

              <QuestionText>{currentQuestion?.question}</QuestionText>

              <OptionsContainer>
                {currentQuestion?.options.map((option, index) => (
                  <OptionButton
                    key={index}
                    selected={
                      answers[currentQuestionIndex]?.selectedIndex === index
                    }
                    onClick={() => handleOptionSelect(index, currentQuestion.id)}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </OptionButton>
                ))}
              </OptionsContainer>

              <NavigationButtons>
                <NavButton
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  ← Previous
                </NavButton>
                <NavButton
                  primary
                  onClick={handleNext}
                >
                  Next →
                </NavButton>
              </NavigationButtons>
            </QuestionContainer>
          </Card>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
}
