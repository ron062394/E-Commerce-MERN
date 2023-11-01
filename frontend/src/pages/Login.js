import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';



function Login() {


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setUsername } = useUser();
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsLoginSuccess(true);
      
        // Decode the token to access the user's role
        const tokenParts = data.token.split('.');
      
        if (tokenParts.length === 3) {
          const decodedPayload = JSON.parse(atob(tokenParts[1]));
          if (decodedPayload && decodedPayload.role) {
            const userRole = decodedPayload.role;
      
            // Set the username in the context
            setUsername(decodedPayload.username);
      
            // Redirect to the user's dashboard or protected route based on the role
            if (userRole === 'buyer') {
              navigate('/');
            } else if (userRole === 'seller') {
              navigate('/seller-dashboard');
            } else if (userRole === 'admin') {
              navigate('/admin-dashboard');
            }
          }
        }
      } else if (response.status === 401) {
        console.error('Login failed. Please check your credentials.');
      } else {
        console.error('Login failed');
      }
      
    } catch (error) {
      console.error(error);
    }

    
  }
  

  return (
    <div className='login-container'>
      <h2>Sign in</h2>
      {isLoginSuccess && (
        <p style={{ color: 'green' }}>Login successful! You are now logged in.</p>
      )}
      <div className='email-container'>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
      </div>
      <div className='password-container'>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p> Don't have an account?</p>
      <Link>Register here</Link>
    </div>
  );
}

export default Login;
