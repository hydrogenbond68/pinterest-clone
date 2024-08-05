import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [handsStyle, setHandsStyle] = useState({ marginTop: '110%' });
  const [animconStyle, setAnimconStyle] = useState({
    backgroundImage: 'url()',
  });

  const navigate = useNavigate();

  const closeEye = () => {
    setAnimconStyle({
      backgroundImage: 'url()',
    });
    setHandsStyle({ marginTop: '0%' });
  };

  const openEye = () => {
    setAnimconStyle({
      backgroundImage: 'url()',
    });
    setHandsStyle({ marginTop: '110%' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:5000/auth/login', { // Updated the URL to your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token); // Save the token
        onLogin(email);
        navigate('/'); 
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login');
    }
  };

  // Styles
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: 'url()',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
  };

  const monkeyLoginStyle = {
    width: '559px',
    height: '650px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    borderRadius: '40px',
  };

  const animconStyleCombined = {
    backgroundColor: 'rgb(32, 32, 32)',
    overflow: 'hidden',
    marginTop: '20px',
    height: '170px',
    width: '170px',
    borderRadius: '50%',
    backgroundSize: '90% 85%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    ...animconStyle,
  };

  const imgStyle = {
    marginTop: '110%',
    height: '170px',
    width: '170px',
    transition: '1s',
    ...handsStyle,
  };

  const formConStyle = {
    marginTop: '38px',
  };

  const inputStyle = {
    height: '40px',
    width: '300px',
    borderRadius: '20px',
    border: 'none',
    color: '#5a5449',
    textIndent: '15px',
    fontSize: '100%',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    outline: 'none',
  };

  const submitButtonStyle = {
    textIndent: '0px',
    height: '40px',
    width: '300px',
    marginTop: '10px',
    backgroundColor: '#1b8c1b99',
    transition: '2s',
    border: 'none',
    color: 'white',
    fontWeight: 'bolder',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    outline: 'none',
  };

  const registerButtonStyle = {
    textIndent: '0px',
    height: '40px',
    width: '300px',
    marginTop: '10px',
    backgroundColor: '#1b8c1b99',
    transition: '2s',
    border: 'none',
    color: 'white',
    fontWeight: 'bolder',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    outline: 'none',
    textAlign: 'center',
    display: 'block',
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={{ ...monkeyLoginStyle, ...contentStyle }}>
        <div id="animcon" style={animconStyleCombined}>
          <img id="hands" src="" style={imgStyle} alt="hands" />
        </div>
        <div style={formConStyle}>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" style={inputStyle} placeholder="Email" required />
            <br />
            <br />
            <input type="password" name="password" style={inputStyle} placeholder="Password" onFocus={closeEye} onBlur={openEye} required />
            <br />
            <br />
            <input type="submit" style={submitButtonStyle} value="L O G I N" />
          </form>
          <Link to="/register" style={registerButtonStyle}>R E G I S T E R</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;