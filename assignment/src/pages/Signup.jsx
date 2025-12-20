import React, { useState } from "react";
import styled, {keyframes} from 'styled-components';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #f9fafb;
  text-align: center;
  flex: 1;
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

const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.p`
  color: #22c55e;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  align-items: center;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  background-color: #1f2937;
  color: #f9fafb;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  margin-bottom: 1rem;
  align-items: center;
  font-size: 0.95rem;

  &:focus {
    border-color: #a78bfa;
    box-shadow: 0 0 0 1px #a78bfa;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #a78bfa, #8b5cf6);
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
    background: linear-gradient(90deg, #8b5cf6, #7c3aed);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Signup = ({ onClose }) => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsSubmitting(true);

  try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        setIsSubmitting(false);
        return;
      }
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    console.log('Signup success:', data);
    setSuccess(true);
    navigate('/');

    // Close modal after short delay
    setTimeout(onClose, 1500);
  } catch (err) {
    setError(err.message || 'Registration failed');
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <Overlay>
      <Modal>
        <Header>
          <Title>Sign Up</Title>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>Registration successful!</SuccessMessage>}

        {isSubmitting ? (
  <>
    <Shimmer height="40px" />
    <Shimmer height="40px" />
    <Shimmer height="40px" />
    <Shimmer height="40px" />
  </>
) : (
  <Form onSubmit={handleSubmit}>
    <Input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <Input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <Input
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
    />
          <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Shimmer width="100%" height="18px" /> : "Create Account"}
          </SubmitButton>

        </Form>
        )}
        
        <CancelButton onClick={onClose}>
          Cancel
        </CancelButton>
      </Modal>
    </Overlay>
  );
};

export default Signup;