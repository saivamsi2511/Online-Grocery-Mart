import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SellerHome from './SellerHome';
import SellerAddProduct from './SellerAddProduct';
import ViewAllProducts from './ViewAllProducts';
import Login from '../main/Login';
import logo from '../assets/logo.jpg';  // Make sure this is the correct path & name
import './seller.css';

export default function SellerNavBar() {
  return (
    <div>
      <nav className="seller-navbar">
        <div className="seller-logo">
          <img src={logo} alt="Seller Logo" className="logo-img" />
          Seller Panel
        </div>
        <ul className="seller-nav-links">
          <li><Link to="/sellerhome">Home</Link></li>
          <li><Link to="/selleraddproduct">Add Products</Link></li>
          <li><Link to="/viewallproducts">View Products</Link></li>
          <li><Link to="/login">Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/sellerhome" element={<SellerHome />} exact />
        <Route path="/selleraddproduct" element={<SellerAddProduct />} exact />
        <Route path="/viewallproducts" element={<ViewAllProducts />} exact />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
