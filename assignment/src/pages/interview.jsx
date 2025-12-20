import React, { useState, useEffect, useRef, use } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(138, 43, 226, 0.8);
  }
`;

const FormContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h1`
  color: #764ba2;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #333;
  font-weight: 600;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #764ba2;
    box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #764ba2;
    box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #764ba2;
    box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
  }
`;

const SubmitButton = styled.button`
  padding: 14px 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(118, 75, 162, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const InterviewContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const InterviewCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(138, 43, 226, 0.3);
  border-radius: 20px;
  padding: 40px;
  max-width: 800px;
  width: 100%;
  backdrop-filter: blur(10px);
  animation: ${glow} 3s ease-in-out infinite;
`;

const InterviewTitle = styled.h2`
  color: #a78bfa;
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
`;

const TranscriptArea = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 20px;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  border: 1px solid rgba(138, 43, 226, 0.3);
  scroll: autoscroll bottom
`;

const Message = styled.div`
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 10px;
  background: ${props => props.isAi ? 'rgba(138, 43, 226, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  animation: ${fadeIn} 0.4s ease-out;
`;

const MessageLabel = styled.div`
  color: ${props => props.isAi ? '#a78bfa' : '#c084fc'};
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const MessageText = styled.div`
  color: #e0e0e0;
  line-height: 1.5;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const IconButton = styled.button`
  padding: 16px 24px;
  background: ${props => props.active ? 'rgba(138, 43, 226, 0.8)' : 'rgba(138, 43, 226, 0.3)'};
  color: white;
  border: 2px solid #a78bfa;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  animation: ${props => props.active ? pulse : 'none'} 1.5s ease-in-out infinite;

  &:hover {
    background: rgba(138, 43, 226, 0.6);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StatusText = styled.div`
  color: #a78bfa;
  text-align: center;
  margin-top: 20px;
  font-size: 0.95rem;
`;

const ErrorText = styled.div`
  color: #ff6b6b;
  text-align: center;
  margin-top: 10px;
  padding: 10px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
`;



function App() {
  const [stage, setStage] = useState('form');
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    jobRole: '',
    qualification: '',
    experience: '',
    skills: ''
  });
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const voiceRef = useRef(null);
  const[apiUrl,setApiUrl]=useState('');
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  
 useEffect(() => {
  
  const voices = window.speechSynthesis.getVoices();
  const softVoice =
    voices.find(v => v.name.includes("Google UK English Female")) ||
    voices.find(v => v.lang === "en-US");

  voiceRef.current = softVoice;
}, []);
useEffect(() => {
  setApiUrl(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.REACT_APP_MODEL_NAME}:generateContent?key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
},[]);
   

 useEffect(() => {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    
    let silenceTimer;
    let finalTranscript = '';

    recognitionRef.current.onresult = (event) => {
      // Get interim transcript
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');

      finalTranscript = transcript; // Store it

      setMessages(prev => {
        const lastUser = prev.filter(m => m.type === 'user');
        if (lastUser.length === 0 || prev[prev.length - 1].type !== 'user') {
          return [...prev, { type: 'user', text: transcript }];
        } else {
          // update last user message
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = transcript;
          return newMessages;
        }
      });

      // Reset silence timer on every new speech
      if (silenceTimer) clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => {
        recognitionRef.current.stop(); // stop mic after 2.5 sec of silence
      }, 1500); // 2.5 seconds
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      
      // Only send API if there is text
      if (finalTranscript.trim() !== '') {
        handleUserResponse(finalTranscript.trim());
        finalTranscript = ''; // Reset
      }
    };

    recognitionRef.current.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };
  }
}, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStage('interview');
    setStatus('Initializing interview...');
    
    await initializeInterview();
  };

  const initializeInterview = async () => {
    const systemPrompt = `You are conducting a technical interview for a ${formData.jobRole} position. 
    candidate's name is ${formData.name}.
    The candidate has ${formData.experience} years of experience and qualifications: ${formData.qualification}.
    Their key skills include: ${formData.skills}.
    
    Start by greeting the candidate warmly and asking them to introduce themselves. 
    Then conduct a professional technical interview with relevant questions for this role.
    Keep your questions focused and responses concise. Ask one question (ask questions related to only position for which interview is going on)at a time.
    Be encouraging and professional throughout the interview.keep level of technical questions very easy, stick to core cs conceps, oops, and skills`;

    try {
        const response = await fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    contents: [
      {
        role: "user",
        parts: [
          {
            text:
              systemPrompt +
              "\n\nStart the interview now with a warm greeting and your first question."
          }
        ]
      }
    ]
  })
});




      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      setMessages([{ type: 'ai', text: aiResponse }]);
      speakText(aiResponse);
      setStatus('Interview started. Click "Start Speaking" to answer.');
    } catch (err) {
      setError('Failed to initialize interview. Please check your API key and try again.');
      console.error(err);
    }
  };

  const handleUserResponse = async (userText) => {
    setStatus('Processing your response...');
    
    const conversationHistory = messages.map(msg => 
      msg.type === 'ai' 
        ? `Interviewer: ${msg.text}` 
        : `Candidate: ${msg.text}`
    ).join('\n');

    try {
          const key = process.env.REACT_APP_GOOGLE_API_KEY;
         const model = process.env.REACT_APP_MODEL_NAME || "gemini-2.5-flash-preview-09-2025";
     const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${conversationHistory}\nCandidate: ${userText}\n\nAs the interviewer, provide a brief response and ask the next relevant technical question for a ${formData.jobRole} position. Keep it concise.`
            }
          ]
        }
      ]
    })
  }
);
   console.log(response)
      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
      speakText(aiResponse);
      setStatus('AI is responding...');
    } catch (err) {
      setError('Failed to get AI response. Please try again.');
      console.error(err);
      setStatus('Ready to continue');
    }
  };
  

  const speakText = (text) => {
   
 const cleanText = text
  .replace(/[\*\(\)\[\]\{\}]/g, '')   // remove * ( ) [ ] { }
  .replace(/[.,;:!?]/g, '.')          // replace other punctuation with period/pause
  .replace(/\s+/g, ' ')
  .trim();
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
     utterance.voice = voiceRef.current;
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = .95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setStatus('Click "Start Speaking" when ready to answer.');
    };

    synthRef.current.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setError('');
      setStatus('Listening to your answer...');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setStatus('Stopped listening');
    }
  };

  const endInterview = () => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    setMessages(prev => [...prev, { 
      type: 'ai', 
      text: 'Thank you for participating in this interview. Best of luck with your application!' 
    }]);
    setStatus('Interview ended');
    setTimeout(()=>{
       navigate('/home')
    },2000)
  };

  if (stage === 'form') {
    return (
      <>
        <GlobalStyle />
        <FormContainer>
          <FormCard>
            <Title>AI Interview</Title>
            <Form onSubmit={handleFormSubmit}>
                
              <FormGroup>
                <Label htmlFor="Name">Name*</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Your full name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="jobRole">Job Role *</Label>
                <Select 
                  id="jobRole"
                  name="jobRole" 
                  value={formData.jobRole} 
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="Tech Fresher">Tech Fresher</option>
                  <option value="Java Developer">Java Developer</option>
                  <option value="MERN Stack Developer">MERN Stack Developer</option>
                  <option value="Software Development Engineer">Software Development Engineer</option>
                  <option value="QA Tester">QA Tester</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="Data Engineer">Data Engineer</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="qualification">Qualification *</Label>
                <Input
                  id="qualification"
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleFormChange}
                  placeholder="e.g., B.Tech in Computer Science"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleFormChange}
                  placeholder="e.g., 2 years"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="skills">Key Skills *</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleFormChange}
                  placeholder="e.g., Java, Spring Boot, MySQL, REST APIs"
                  required
                />
              </FormGroup>

              <SubmitButton type="submit">Start Interview</SubmitButton>
            </Form>
          </FormCard>
        </FormContainer>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <InterviewContainer>
        <InterviewCard>
          <InterviewTitle>AI Interview in Progress</InterviewTitle>
          
          <TranscriptArea>
            {messages.map((msg, idx) => (
              <Message key={idx} isAi={msg.type === 'ai'}>
                <MessageLabel isAi={msg.type === 'ai'}>
                  {msg.type === 'ai' ? '🤖 AI Interviewer' : '👤 You'}
                </MessageLabel>
                <MessageText>{msg.text}</MessageText>
              </Message>
            ))}
          </TranscriptArea>

          <ControlsContainer>
            <IconButton 
              onClick={startListening} 
              disabled={isListening || isSpeaking}
              active={isListening}
            >
              {isListening ? '🎤 Listening...' : '🎤 Start Speaking'}
            </IconButton>
            
            <IconButton 
              onClick={stopListening} 
              disabled={!isListening}
            >
              ⏹ Stop Speaking
            </IconButton>
            
            <IconButton onClick={endInterview}>
              🏁 End Interview
            </IconButton>
          </ControlsContainer>

          {status && <StatusText>{status}</StatusText>}
          {error && <ErrorText>{error}</ErrorText>}
        </InterviewCard>
      </InterviewContainer>
    </>
  );
}

export default App;