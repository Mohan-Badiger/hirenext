import React, { useState } from 'react';

export default function Home() {
  
  const StyledLinkButton = ({ href, children }) => {

    const [isHovered, setIsHovered] = useState(false);

    const style = {
      display: 'inline-block',
      padding: '12px 24px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: '#0080a3ff', 
      border: 'none',
      borderRadius: '8px',
      textDecoration: 'none',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '200px',
 
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
    };

    return (
      <a
        href={href} 
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </a>
    );
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', 
    backgroundColor: '#282c34', 
    color: 'white',
    padding: '20px',
    gap: '30px',
    boxSizing: 'border-box',
  };

  return (
    <div style={containerStyle}>
      <h1>Welcome to the App</h1>
      <p>Please choose your path:</p>
      <StyledLinkButton href="/test">
        Go to Mock Test
      </StyledLinkButton>
    
      <StyledLinkButton href="/interview">
        Go to Interview
      </StyledLinkButton>
    </div>
  );
}

