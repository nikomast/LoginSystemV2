import React from 'react';
import { Link } from 'react-router-dom';
import LoginControl from './logincontrol';
import { useAuth } from '../context/authcontext';



function Header() {
  const { is2FAVerified } = useAuth();

  return (
    <header>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/create-account">Register</Link>
        {is2FAVerified && <Link to="/user-profile">Profile</Link>}
        <LoginControl />
      </nav>
    </header>
  );
}

export default Header;
