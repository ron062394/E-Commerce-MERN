// SellerDashboard.js
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import MyCarousel from '../components/CarouselSection'
import ProductList from '../components/ProductList';
import { useEffect,useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Homepage() {
  const { cart, dispatch } = useContext(CartContext);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/cart/view', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.items) {
            const count = data.items.reduce((total, item) => total + item.quantity, 0);
            dispatch({ type: 'SET_CART_COUNT', count });
          }
        })
        .catch((error) => console.error(error));
    }
  }, [dispatch]);

  return (
    <div>
        <HeroBanner/>
        <MyCarousel/>
        <ProductList/>
    </div>
  );
}

export default Homepage;
