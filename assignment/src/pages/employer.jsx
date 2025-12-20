import React from 'react';
import styled from 'styled-components';
import { Code, HelpCircle, Briefcase, FileText, Globe, Building2, Sparkles, Users, CreditCard, RotateCw, Monitor, Shield, Mic, XSquare, FileCheck, Calendar, Video } from 'lucide-react';
import { keyframes } from 'styled-components';
const Container = styled.div`
  min-height: 100vh;
  background: #ffffffff;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: Inter, sans-serif;
  font-style: normal;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const MainWrapper = styled.div`
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GridWithDecorationsWrapper = styled.div`
  position: relative;
`;

const HeaderWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 150px;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

const DecorativeBoxesWrapper = styled.div`
  position: absolute;
  top: -140px;
  left: -140px;
  right: -140px;
  bottom: -140px;
  pointer-events: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DecorativeRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
  &.top {
    top: 0;
  }
  
  &.bottom {
    bottom: 0;
  }
`;

const DecorativeColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 140px;
  bottom: 140px;
  justify-content: center;

  &.left {
    left: 0;
  }
  
  &.right {
    right: 0;
  }
`;

const DecorativeBox = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 24px;
  background: #ffffffff;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: ${({ keyDirection }) => {
      switch (keyDirection) {
        case 'top':
          return 'linear-gradient(to top, rgb(191, 220, 249), white)';
        case 'bottom':
          return 'linear-gradient(to bottom, rgb(191, 220, 249), white)';
        case 'left':
          return 'linear-gradient(to left, rgba(191, 220, 249), white)';
        case 'right':
          return 'linear-gradient(to right, rgb(191, 220, 249), white)';
        default:
          return 'linear-gradient(to right, rgb(191, 220, 249), white)';
      }
    }};
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 1;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 143px 10px 296px 10px 296px 10px 296px 10px 143px;
  grid-template-rows: 130px 10px 417px 10px 130px;
  position: relative;
  width: fit-content;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
  }
`;

const Heading = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 8px;
  }
`;

const Subheading = styled.p`
  font-size: 18px;
  color: #4b5563;
  text-align: center;
  margin-bottom: 64px;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const SmallCard = styled.div`
  background: #ffffffff;
  border-radius: 24px;
  padding: 20px;
  display: flex;
  color: rgba(8, 8, 8, 1);
  font-weight: 900;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgb(191, 220, 249);
  box-sizing: border-box;
  width: 143px;
  height: 130px;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: rgb(0, 115, 230);
    background: rgb(242, 248, 254);
  }

  @media (max-width: 768px) {
    width: 112px;
    height: 96px;
    padding: 10px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
  }
`;


const scroll = keyframes`
  0% { transform: translateX(0); }
  /* We move it by 50% of its total width. Since the track is doubled,
     this is the width of the original set of cards. */
  100% { transform: translateX(-50%); }
`;

export const SliderWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: relative;
    width: 100%;
    margin-bottom: 24px;
    
    &:last-of-type {
      margin-top: 24px;
    }

    /* Pause the animation on hover */
    &:hover > div > div {
      animation-play-state: paused;
    }
  }
`;
 const SliderContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;

 const SliderTrackTop = styled.div`
  display: flex;
  gap: 12px;

  width: max-content;
  
  animation: ${scroll} 70s linear infinite;
`;
 const SliderTrackBottom = styled.div`
  display: flex;
  gap: 12px;

  width: max-content;
  
  /* 3. APPLY the animation */
  animation: ${scroll} 70s linear infinite;
  animation-direction: reverse;
`;
const TopRow = styled.div`
  grid-column: 1 / 10;
  grid-row: 1;
  display: flex;
  gap: 10px;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const BottomRow = styled.div`
  grid-column: 1 / 10;
  grid-row: 5;
  display: flex;
  gap: 10px;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LeftColumn = styled.div`
  grid-column: 1;
  grid-row: 3;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightColumn = styled.div`
  grid-column: 9;
  grid-row: 3;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CenterContent = styled.div`
  grid-column: 3 / 8;
  grid-row: 3;
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 296px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 16px;
  }
`;

const MediumCard1 = styled.div`
  background: linear-gradient(140deg, rgba(208, 199, 244, 1), rgba(245, 241, 241, 0.2));
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgb(170, 154, 246);
  box-sizing: border-box;
  width: 296px;
  height: 130px;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: rgb(0, 115, 230);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const MediumCard2 = styled.div`
  background: linear-gradient(140deg, rgba(243, 211, 185, 1), rgba(230, 230, 230, 0.2));
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgb(252, 166, 96);
  box-sizing: border-box;
  width: 296px;
  height: 130px;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: rgb(0, 115, 230);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const MediumCard3 = styled.div`
  background: linear-gradient(140deg, rgba(179, 234, 207, 1), rgba(230, 230, 230, 0.2));
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgb(80, 212, 147);
  box-sizing: border-box;
  width: 296px;
  height: 130px;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: rgb(0, 115, 230);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const LargeCard1 = styled.div`
  background: linear-gradient(140deg, rgba(38, 142, 246, 0.4), rgba(230, 230, 230, 0.2));
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgb(115, 178, 241);
  box-sizing: border-box;
  width: 296px;
  height: 270px;
  position: relative;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: rgb(0, 115, 230);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const LargeCard2 = styled.div`
  background: linear-gradient(140deg, rgba(243, 146, 180, 1), rgba(241, 239, 239, 0.2));
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgb(240, 121, 162);
  box-sizing: border-box;
  width: 296px;
  height: 270px;
  position: relative;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: rgb(0, 115, 230);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const LargeCard3 = styled.div`
  background: linear-gradient(140deg, rgba(249, 229, 157, 1), rgba(230, 230, 230, 0.2));
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgb(255, 221, 102);
  box-sizing: border-box;
  width: 296px;
  height: 270px;
  position: relative;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: rgb(0, 115, 230);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #ffffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  
  svg {
    color: rgba(24, 23, 23, 1);
    width: 18px;
    height: 18px;
  }
`;

const CardTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: rgb(56, 56, 56);
  margin: 0;
  line-height: 1.3;
`;

const FeaturedImageArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const FeaturedContent = styled.div`
  padding: 16px 20px 20px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FeaturedTitle = styled.h2`
  font-size: ${props => props.large ? '18px' : '16px'};
  font-weight: 600;
  color: ${props => props.color || '#1f2937'};
  margin: 0 0 12px 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

const FeatureList = styled.ul`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const FeatureItem = styled.li`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  margin-bottom: 8px;
  padding-left: 24px;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.bulletColor || '#6b7280'};
    border: 2px solid white;
  }
`;

const ListIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const LinkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const TranslateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </svg>
);

const CardSliderTop = ({ cards }) => {


  return (
    <SliderWrapper>
      <SliderContainer>
        <SliderTrackTop>
          {cards}
          {cards}
          {cards}
        </SliderTrackTop>
      </SliderContainer>
    </SliderWrapper>
  );
};
const CardSliderBottom = ({ cards }) => {


  return (
    <SliderWrapper>
      <SliderContainer>
        <SliderTrackBottom>
          {cards}
          {cards}
          {cards}
        </SliderTrackBottom>
      </SliderContainer>
    </SliderWrapper>
  );
};


export default function DashboardLayout() {
  const allCards = [
    { icon: Code, title: "Hackathons & Case Challenges" },
    { icon: HelpCircle, title: "Innovation Challenges" },
    { icon: Briefcase, title: "Jobs Listings" },
    { icon: FileText, title: "Internship Listings" },
    { icon: Globe, title: "Branded Microsite" },
    { icon: Building2, title: "Resume Parsing" },
    { icon: Sparkles, title: "AI Compatibility Score" },
    { icon: Users, title: "Manage Candidates" },
    { icon: Monitor, title: "Skill-based Assessments" },
    { icon: ListIcon, title: "50,000+ Question Bank" },
    { icon: LinkIcon, title: "Assessment Unique Link" },
    { icon: TranslateIcon, title: "Multi-lingual AI Interviews" },
    { icon: Calendar, title: "Schedule Interview" },
    { icon: Video, title: "Coding Live Interview" },
    { icon: FileCheck, title: "Automated Evaluations" },
    { icon: RotateCw, title: "360° Proctoring" },
    { icon: CreditCard, title: "Aadhaar Verification" },
    { icon: Monitor, title: "Device Detection" },
    { icon: Shield, title: "Facial Verification" },
    { icon: Mic, title: "Voice Biometric" },
    { icon: XSquare, title: "Screen Share Blocking" },
    { icon: FileCheck, title: "Candidate Report" }
  ];

  const cardFeatures = {
    "Employer Branding": [
      "Hackathons, Case Competitions, Simulations, Challenges",
      "Internship & Job Listings",
      "Branded Employer Microsite"
    ],
    "Source": [
      "Aadhaar & Facial Scan Based Verification",
      "Automated Resume Parsing & Shortlisting",
      "AI-based Candidate Mapping & Scoring"
    ],
    "Screen": [
      "Versatile Assessments For All Roles & Skills",
      "50,000+ Question Bank",
      "360° Proctoring With Face Scan & Voice Biometrics"
    ],
    "Assess": [
      "Versatile Assessments For All Roles & Skills",
      "50,000+ Question Bank",
      "360° Proctoring With Face Scan & Voice Biometrics"
    ],
    "Interview": [
      "Multi-lingual AI Interviews",
      "Schedule Interviews Seamlessly",
      "Coding Live Interview Platform"
    ],
    "Recruitment Automation & AI-powered ATS": [
      "Automated Candidate Screening",
      "AI-Powered Shortlisting & Ranking",
      "End-to-End Recruitment Pipeline Management"
    ]
  };
  

  const renderSmallCard = (card, index) => {
    const Icon = card.icon;
    return (
      <SmallCard key={index}>
        <IconWrapper>
          <Icon />
        </IconWrapper>
        <CardTitle>{card.title}</CardTitle>
      </SmallCard>
    );
  };

  return (
    <Container>
      <MainWrapper>
        <HeaderWrapper>
          <Heading>What HireNext AI Talent Engine Really Means?</Heading>
          <Subheading>
            Full-stack Features/ AI Tools For Complete Recruitment Lifecycle
          </Subheading>
        </HeaderWrapper>

        <CardSliderTop cards={allCards.map(renderSmallCard)} />

        <GridWithDecorationsWrapper>
          <DecorativeBoxesWrapper>
            <DecorativeRow className="top">
              {[...Array(10)].map((_, i) => <DecorativeBox key={`top-${i}`} keyDirection="top" />)}
            </DecorativeRow>
            <DecorativeRow className="bottom">
              {[...Array(10)].map((_, i) => <DecorativeBox key={`bottom-${i}`} keyDirection="bottom" />)}
            </DecorativeRow>
            <DecorativeColumn className="left">
              {[...Array(5)].map((_, i) => <DecorativeBox key={`left-${i}`} keyDirection="left" />)}
            </DecorativeColumn>
            <DecorativeColumn className="right">
              {[...Array(5)].map((_, i) => <DecorativeBox key={`right-${i}`} keyDirection="right" />)}
            </DecorativeColumn>
          </DecorativeBoxesWrapper>

          <CardGrid>
            {/* TOP ROW - Desktop only */}
            <TopRow>
              {allCards.slice(0, 8).map(renderSmallCard)}
            </TopRow>

            {/* LEFT COLUMN - Desktop only */}
            <LeftColumn>
              {allCards.slice(8, 11).map(renderSmallCard)}
            </LeftColumn>

            {/* CENTER CONTENT */}
            <CenterContent>
              <CenterColumn>
                <LargeCard1>
                  <FeaturedImageArea />
                  <FeaturedContent>
                    <FeaturedTitle large color="rgba(38, 127, 228, 1)">Employer Branding</FeaturedTitle>
                    <FeatureList>
                      {cardFeatures["Employer Branding"].map((feature, idx) => (
                        <FeatureItem key={idx} bulletColor="rgba(38, 127, 228, 1)">{feature}</FeatureItem>
                      ))}
                    </FeatureList>
                  </FeaturedContent>
                </LargeCard1>
                <MediumCard1>
                  <FeaturedImageArea />
                  <FeaturedContent>
                    <FeaturedTitle color="rgb(101, 72, 238)">Screen</FeaturedTitle>
                    <FeatureList>
                      {cardFeatures["Screen"].map((feature, idx) => (
                        <FeatureItem key={idx} bulletColor="rgb(101, 72, 238)">{feature}</FeatureItem>
                      ))}
                    </FeatureList>
                  </FeaturedContent>
                </MediumCard1>
              </CenterColumn>

              <CenterColumn>
                <LargeCard2>
                  <FeaturedImageArea />
                  <FeaturedContent>
                    <FeaturedTitle large color="#c2185b">Source</FeaturedTitle>
                    <FeatureList>
                      {cardFeatures["Source"].map((feature, idx) => (
                        <FeatureItem key={idx} bulletColor="#c2185b">{feature}</FeatureItem>
                      ))}
                    </FeatureList>
                  </FeaturedContent>
                </LargeCard2>
                <MediumCard2>
                  <FeaturedImageArea />
                  <FeaturedContent>
                    <FeaturedTitle color="rgb(211, 101, 11)">Assess</FeaturedTitle>
                    <FeatureList>
                      {cardFeatures["Assess"].map((feature, idx) => (
                        <FeatureItem key={idx} bulletColor="rgb(211, 101, 11)">{feature}</FeatureItem>
                      ))}
                    </FeatureList>
                  </FeaturedContent>
                </MediumCard2>
              </CenterColumn>

              <CenterColumn>
                <MediumCard3>
                  <FeaturedImageArea />
                  <FeaturedContent>
                    <FeaturedTitle color="rgb(5, 193, 101)">Interview</FeaturedTitle>
                    <FeatureList>
                      {cardFeatures["Interview"].map((feature, idx) => (
                        <FeatureItem key={idx} bulletColor="rgb(5, 193, 101)">{feature}</FeatureItem>
                      ))}
                    </FeatureList>
                  </FeaturedContent>
                </MediumCard3>
                <LargeCard3>
                  <FeaturedImageArea />
                  <FeaturedContent>
                    <FeaturedTitle large color="rgb(153, 119, 0)">Recruitment Automation & AI-powered ATS</FeaturedTitle>
                    <FeatureList>
                      {cardFeatures["Recruitment Automation & AI-powered ATS"].map((feature, idx) => (
                        <FeatureItem key={idx} bulletColor="rgb(153, 119, 0)">{feature}</FeatureItem>
                      ))}
                    </FeatureList>
                  </FeaturedContent>
                </LargeCard3>
              </CenterColumn>
            </CenterContent>

            {/* RIGHT COLUMN - Desktop only */}
            <RightColumn>
              {allCards.slice(11, 14).map(renderSmallCard)}
            </RightColumn>

            {/* BOTTOM ROW - Desktop only */}
            <BottomRow>
              {allCards.slice(14).map(renderSmallCard)}
            </BottomRow>
          </CardGrid>
        </GridWithDecorationsWrapper>

        <CardSliderBottom cards={allCards.map(renderSmallCard)} />
      </MainWrapper>
    </Container>
  );
}