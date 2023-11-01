import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//Import component
import Header from './pages/Header';
import ShoppingCart from './pages/ShoppingCart';


//Import pages
import Login from './pages/Login';
import Loginv2 from './pages/Loginv2';
import Signup from './pages/Signup';
import Signupv2 from './pages/Signupv2';
import Homepage from './pages/Homepage';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProductPage from './pages/ProductPage';
import BuyerOrderHistory from './components/BuyerOrderHistory';
import SellerOrderDetails from './components/SellerOrderDetails';
import BuyerOrderDetails from './components/BuyerOrderDetails';


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginv2" element={<Loginv2 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupv2" element={<Signupv2 />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/order-history" element={<BuyerOrderHistory />} />
        <Route path="/seller-orders/:orderId" element={<SellerOrderDetails/>} />
        <Route path="/buyer-orders/:orderId" element={<BuyerOrderDetails/>} />
        </Routes>
    </Router>
  );
}

export default App;


