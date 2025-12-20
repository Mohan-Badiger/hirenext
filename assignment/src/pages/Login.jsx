import React, { useState } from 'react';
import styled, {keyframes} from 'styled-components';
import { X } from 'lucide-react';
import Signup from './Signup';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

const shimmerAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const Shimmer = styled.div`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "20px"};
  border-radius: ${(props) => props.radius || "8px"};
  background: linear-gradient(
    90deg,
    #2a2a2a 25%,
    #3a3a3a 50%,
    #2a2a2a 75%
  );
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 1s linear;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const Modal = styled.div`
  background-color: #111827;
  border-radius: 1rem;
  padding: 2rem;
  width: 90%;
  max-width: 28rem;
  align-items: flex-start;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #f9fafb;
  text-align: left;
  flex: none;
  margin: 0;
  padding-left: 0.25rem;
`;

const CloseButton = styled.button`
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  align-items: center;
  text-align: left;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #e5e7eb;
  margin-bottom: 0.25rem;
  text-align: left;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  background-color: #1f2937;
  color: #f9fafb;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  align-items: center;

  &:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 1px #60a5fa;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(90deg, #2563eb, #1d4ed8);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SignupText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #d1d5db;
  font-size: 0.9rem;
`;

const SignupLink = styled.span`
  color: #60a5fa;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
  align-items: center;
  &:hover {
    color: #3b82f6;
  }
`;

export default function Login({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log('Login successful:', data);
      console.log('User data:', data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      navigate('/home');
    } 
    else if (response.status === 500) {
      alert('Server error, please try again later.');
    } 
    else {
  
      alert(data.error || 'Invalid email or password');
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert('Network error. Please check your connection.');
  } finally {
    setIsLoading(false);
  }
};


  if (showSignup) {
    return <Signup onClose={() => setShowSignup(false)} />;
  }

  return (
    <AnimatePresence>
    <Overlay
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Modal
        as={motion.div}
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Header>
          <Title>Login here</Title>
 
        </Header>

        {isLoading ? (
  <>
    <Shimmer height="40px" />
    <Shimmer height="40px" />
    <Shimmer height="40px" />
  </>
) : (
  <Form onSubmit={handleSubmit}>
      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />


    <SubmitButton type="submit" disabled={isLoading}>
      {isLoading ? <Shimmer width="100%" height="18px" /> : 'Login'}
    </SubmitButton>
  </Form>
        )}

        <SignupText>
          Don't have an account?{' '}
          <SignupLink onClick={() => navigate('/signup')}>
            Sign up here
          </SignupLink>
        </SignupText>
      </Modal>
    </Overlay>
    </AnimatePresence>
  );
}