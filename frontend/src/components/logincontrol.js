import React, { useState } from 'react';
import authService from '../services/authservice';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

function Logging() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { setIs2FAVerified } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To store login errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const data = await authService.login(username, password);
      setIsLoggedIn(true);
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userDetails', JSON.stringify(data.user));
      localStorage.setItem('username', username);
      setError('');
      navigate('/authentication');
    } catch (error) {
      setError('Login failed. Please check your credentials.'); // Update error message on failure
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout(); 
    setIsLoggedIn(false);
    setIs2FAVerified(false)
    localStorage.removeItem('is2FAVerified');
    localStorage.removeItem('userToken');
    navigate('/home');
  };

  // Use the form's onSubmit for the login process
  const loginForm = (
    <div style={{ position: 'absolute', top: '5px', right: '20px' }}>
      <form onSubmit={handleLogin}> 
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button> {/* Change to type="submit" */}
      </form>
      {error && <div className="error-messages">{error}</div>}
    </div>
  );

  const logoutButton = (
    <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
      <button onClick={handleLogout}>Logout</button> {/* Corrected for logout */}
    </div>
  );

  return isLoggedIn ? logoutButton : loginForm;
}

export default Logging;
