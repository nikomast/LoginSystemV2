import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/mainpage'
import About from './pages/about'
import Create from './pages/createaccount'
import Profile from './pages/profile'
import TWOFA from './pages/twofactorverification'
import Header from './components/header';
import Footer from './components/footer';
import { AuthProvider } from './context/authcontext'; 
import './App.css';

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userToken = localStorage.getItem('userToken');
  if (!userToken) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const ProtectedRoute2 = ({ children }) => {
  const verified = localStorage.getItem('is2FAVerified');
  if (!verified) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-account" element={<Create />} />
          <Route path="/user-profile"  element={
        <ProtectedRoute2>
          <Profile />
        </ProtectedRoute2>
      } />
          <Route path="/authentication"  element={
        <ProtectedRoute>
          <TWOFA />
        </ProtectedRoute>
      } />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;
