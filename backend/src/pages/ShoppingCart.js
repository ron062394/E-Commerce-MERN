import React, { useEffect, useState } from 'react';
import ShippingInfo from '../components/ShippingInfo';
import CartItem from '../components/CartItems';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { useAuthContext } from '../Hooks/useAuthContext';

function ShoppingCart() {
  const retrievedUser = localStorage.getItem('user');
  const user = JSON.parse(retrievedUser)
  
  const navigate = useNavigate()
  const [cartData, setCartData] = useState(null);
  const [productData, setProductData] = useState({});
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    contactNumber: '', // Add contactNumber field
    address: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    // Fetch cart data using a JWT token

    if (user) {
      fetch('/api/cart/view', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setCartData(data))
        .catch((error) => console.error(error));
    }
  }, []);

  useEffect(() => {
    // Fetch product data for each product in the cart
    if (cartData) {
      const promises = cartData.items.map((item) =>
        fetch(`/api/product/get/${item.product}`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((data) => {
            // Store the product information by its ID
            setProductData((prevProductData) => ({
              ...prevProductData,
              [item.product]: data,
            }));
          })
          .catch((error) => console.error(error))
      );

      Promise.all(promises).catch((error) => console.error(error));
    }
  }, [cartData]);

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    if (cartData) {
      return cartData.items.reduce((total, item) => total + item.quantity * item.price, 0);
    }
    return 0;
  };

  const handleCheckout = () => {
    if (!cartData) {
      console.error('Cannot place an empty order');
      return;
    }  
    const token = localStorage.getItem('token');
    if (!user.token) {
      console.error('Token is missing');
      return;
    }
    const orderData = {
      shippingInfo: {
        name: shippingInfo.name,
        contactNumber: shippingInfo.contactNumber,
        address: shippingInfo.address,
        city: shippingInfo.city,
        postalCode: shippingInfo.postalCode,
      },
    };
  
    fetch('api/orders/place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Order placed successfully') {
          console.log(data.message, data.orders);
          navigate('/order-history')
        } else {
          console.error('Order placement failed:', data.error);
        }
      })
      .catch((error) => {
        console.error('Checkout failed', error);
      });
  };
  

  return (
    <div className='shopping-cart-section'>
      <h1>Shopping Cart</h1>
      {cartData ? (
        <div>
          {cartData.items.map((item) => (
            <div key={item._id}>
              {productData[item.product] ? (
                <CartItem item={item} productData={productData} />
              ) : (
                <p>Loading product information...</p>
              )}
            </div>
          ))}
          <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
        </div>
      ) : (
        <p>Your shopping cart is empty.</p>
      )}
      <ShippingInfo
        onShippingChange={setShippingInfo} // Update the shipping info in the parent component
      />
      <button onClick={handleCheckout}>Checkout</button> {/* Checkout button */}
      <ProductList/>
    </div>
  );
}

export default ShoppingCart;
