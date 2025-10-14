import React from "react";
import { Link } from "react-router-dom";
import "./MainNavBar.css";
import { useCart } from "../contextapi/CartContext"; // import cart context hook
import config from "../config";


const MainNavBar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="main-navbar">
      <Link to="/" className="nav-logo">
        <img src="src/assets/logo.jpg" alt="GroceryGo Logo" className="logo-img" />
        <span>GroceryGo</span>
      </Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/deals">Deals</Link>
        <Link to="/about">About Us</Link>
      </nav>
      <div className="nav-auth">
        <Link to="/login" className="nav-btn plain">Login</Link>
        <Link to="/signup" className="nav-btn filled">Sign Up</Link>
        <Link to="/cart" className="nav-btn cart-btn">
          Cart ({totalItems})
        </Link>
      </div>
    </header>
  );
};

export default MainNavBar;
