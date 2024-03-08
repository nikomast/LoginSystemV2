import React, { useState } from 'react';
import authService from '../services/authservice'; // Adjust the path as necessary

function CreateAccount() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });

  const [errorMessages, setErrorMessages] = useState('');
  const [successMessages, setSuccessMessages] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages('');
    setSuccessMessages('')
    try {
      const response = await authService.register(formData);
      if (response.token) {
       setSuccessMessages('Registeration process was successful');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessages(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} />
        <input name="firstname" type="text" placeholder="First Name" onChange={handleChange} value={formData.firstname} />
        <input name="lastname" type="text" placeholder="Last Name" onChange={handleChange} value={formData.lastname} />
        <button type="submit">Register</button>
      </form>
      {errorMessages && <div className="error-messages">{errorMessages}</div>}
      {successMessages && <div className="success-messages">{successMessages}</div>}
    </div>
  );
}

export default CreateAccount;
