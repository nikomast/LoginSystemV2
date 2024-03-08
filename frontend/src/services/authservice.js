export const login = async (username, password) => {
  try {
    const response = await fetch('/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    return data; // Returns the response data, which should include the token
  } catch (error) {
    throw error; // Rethrows the error to be caught by the caller
  }
};

export const verify2FACode = async (twoFaCode) => {
  try {
    const username = localStorage.getItem('username'); 
    const response = await fetch('/verify_2fa/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, code: twoFaCode }),
    });
    if (!response.ok) throw new Error('2FA verification failed');
    const data = await response.json();
    return data; 
  } catch (error) {
    throw error; // Rethrows the error to be caught by the caller
  }
};


export const logout = async () => {
  try {
      const response = await fetch('/logout/', {
          method: 'POST',
          headers: {
              'Authorization': `Token ${localStorage.getItem('userToken')}`,
              'Content-Type': 'application/json',
          },
      });
      if (!response.ok) throw new Error('Logout failed');
  } catch (error) {
      console.error("Logout error:", error.message);
  }
  localStorage.removeItem('userToken');
  localStorage.removeItem('is2FAVerified');
};
  

const register = async (userData) => {
  const response = await fetch('/register/', { // Adjust the URL as necessary
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Registration failed');
  }
  return response.json(); // Assuming the backend returns a token upon successful registration
};

const authService = { login, logout, register};

export default authService;