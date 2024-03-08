import React from 'react';

function Profile() {
    const userDetails = localStorage.getItem('userDetails');
    const user = userDetails ? JSON.parse(userDetails) : null;
  
    return (
      <div>
        <h1>Profile Page</h1>
        {user ? (
          <div>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Display more user details here */}
          </div>
        ) : (
          <p>Please log in to see the profile.</p>
        )}
      </div>
    );
  }
  

export default Profile;
