import React, { useState, useEffect } from 'react';

function CartItems({ item, productData, onIncrement, onDecrement }) {
  return (
    <div className='cart-item-container'>
      <img className='shopping-cart-img' src={productData[item.product].images[0]} alt={productData[item.product].title} />
      <p>Product Name: {productData[item.product].title}</p>
      <button onClick={() => onDecrement(item.product)}>-</button>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => onIncrement(item.product)}>+</button>
      <p>Price: ${item.price.toFixed(2)}</p>
    </div>
  );
}

export default CartItems;
