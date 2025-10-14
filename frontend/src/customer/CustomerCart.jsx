import React from 'react';
import './customer.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contextapi/CartContext';

const CustomerCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.cost * item.quantity),
    0
  );

  const handleContinueToPayment = () => {
    navigate('/payment');
  };

  const getImageUrl = (item) => {
    if (item.url) {
      return item.url;
    }
    return `http://localhost:2004/product/displayproductimage?id=${item.id}`;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        cartItems.map(item => (
          <div className="product-card" key={item.id}>
            <img src={getImageUrl(item)} alt={item.name} />
            <h5>{item.name}</h5>
            <p>₹{item.cost}</p>
            <div className="quantity-control">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <>
          <h4 className="text-center mt-3">Total: ₹{totalAmount.toFixed(2)}</h4>
          <div className="text-center">
            <button className="payment-btn" onClick={handleContinueToPayment}>Continue to Payment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerCart;