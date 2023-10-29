import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BuyerOrderHistory() {
  const [orders, setOrders] = useState([]);
  const { token } = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    if (token) {
      fetch('/api/orders/history', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setOrders(data);
          } else {
            console.error('Invalid data format:', data);
          }
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Order Date: {new Date(order.date).toLocaleString()}</p> {/* Update this line */}
            <p>Seller: {order.seller.username}</p>
            <ul>
              {order.products.map((product) => (
                <li className='order-item' key={product._id}>
                  <p>Product Name: {product.title}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <p>Quantity Ordered: {product.quantity}</p>

                </li>
              ))}
            </ul>
            <p>Shipping Address: {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.postalCode}</p>
            <p>Order Total: ${order.orderTotal.toFixed(2)}</p>
            <p>Order Status: {order.orderStatus}</p>
            <Link to={`/buyer-orders/${order._id}`}>View order</Link> {/* Link to the order details route */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BuyerOrderHistory;
