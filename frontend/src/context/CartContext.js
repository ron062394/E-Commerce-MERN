import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create a cart context
export const CartContext = createContext();

// Define the initial state for the cart
const initialCart = { items: [], cartCount: 0 };

function cartReducer(state, action) {
    switch (action.type) {
      case 'ADD_TO_CART':
        // Add the product to the cart and increment the cartCount
        return {
          ...state,
          items: [...state.items, action.product],
          cartCount: state.cartCount + 1,
        };
      case 'SET_CART_COUNT':
        // Update the cart count
        return { ...state, cartCount: action.count };
      default:
        return state;
    }
  }
  

// Cart provider component
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Use localStorage to persist cart data
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    if (cartData) {
      dispatch({ type: 'SET_CART', cart: cartData });
    }
  }, []);

  // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to access the cart context
export function useCart() {
  return useContext(CartContext);
}
