import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart from backend on initial load
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cart`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch cart: ${response.statusText}`);
        }
        const data = await response.json();
        setCartItems(data.cartItems || []);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    }
    fetchCart();
  }, []);

  // Add a product to the cart or increase its quantity
  const addToCart = async (product) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      if (!response.ok) {
        throw new Error(`Add to cart failed: ${response.statusText}`);
      }
      const data = await response.json();
      setCartItems(data.cartItems || []);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/remove/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`Remove from cart failed: ${response.statusText}`);
      }
      const data = await response.json();
      setCartItems(data.cartItems || []);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  // Update quantity of an item (+1 or -1)
  const updateQuantity = async (productId, quantityChange) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId, quantityChange }),
      });
      if (!response.ok) {
        throw new Error(`Update quantity failed: ${response.statusText}`);
      }
      const data = await response.json();
      setCartItems(data.cartItems || []);
    } catch (error) {
      console.error(`Failed to update quantity:`, error);
    }
  };

  const increaseQuantity = (productId) => updateQuantity(productId, 1);
  const decreaseQuantity = (productId) => updateQuantity(productId, -1);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
