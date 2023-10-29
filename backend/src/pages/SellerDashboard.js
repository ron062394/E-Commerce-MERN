// SellerDashboard.js
import React from 'react';
import ProductPostingForm from '../components/CreateProductForm';
import SellerOrderHistory from '../components/SellerOrderHistory'
function SellerDashboard() {
  return (
    <div className='seller-dashboard'>
      <div className='section-title'>
        <span className='span-divider'></span>
          <h3 className='seller-db-title'>Welcome to the Seller Dashboard</h3>
        <span className='span-divider'></span>
      </div>
      <ProductPostingForm/>
      <SellerOrderHistory/>
    </div>
  );
}

export default SellerDashboard;
