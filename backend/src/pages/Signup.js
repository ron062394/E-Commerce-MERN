import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';


function Signup() {
  const { setUsername } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'buyer',
  });
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSignup = async () => {

    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.status === 201) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsSignupSuccess(true);
  
        // Set the username in the context
        setUsername(formData.username);
  
        // Role-based redirection based on the user's input
        const userRole = formData.role;
        if (userRole === 'buyer') {
          navigate('/');
        } else if (userRole === 'seller') {
          navigate('/seller-dashboard');
        } else if (userRole === 'admin') {
          navigate('/admin-dashboard');
        }
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error('Signup failed. Error data:', errorData);
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h2>Signup</h2>
      {isSignupSuccess && (
        <p style={{ color: 'green' }}>Signup successful! You can now log in.</p>
      )}
      <label>Username:</label>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleInputChange}
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleInputChange}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputChange}
      />
      <label>
        Sign-up as:
        <select name="role" value={formData.role} onChange={handleInputChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
