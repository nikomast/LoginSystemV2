// File: src/components/TwoFactorAuthentication.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import { verify2FACode } from '../services/authservice';

function TwoFactorAuthentication() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIs2FAVerified } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await verify2FACode(code);
      if (data.message === '2FA Verified') {
        localStorage.setItem('is2FAVerified', 'true'); // Persist the verification status
        setIs2FAVerified(true);
        navigate('/user-profile'); // Navigate to the user profile or dashboard
      } else {
        setError('2FA code verification failed. Please try again.');
      }
    } catch (error) {
      setError('2FA verification failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Two-Factor Authentication</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter 2FA code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default TwoFactorAuthentication;
