import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get the JWT token from storage
  const isAuthenticated = token !== null;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;
