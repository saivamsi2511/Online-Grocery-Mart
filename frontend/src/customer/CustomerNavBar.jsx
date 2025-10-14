import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './customer.css';
// REMOVED: import logo from '../assets/logo.png'; // This is incorrect for images in the /public folder

import { useAuth } from '../contextapi/AuthContext';
import { useCart } from '../contextapi/CartContext';

// Import Material-UI components for the cart popover
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Import page components
import CustomerHome from '../main/CustomerHome';
import CustomerProfile from './CustomerProfile';
import CustomerCart from './CustomerCart';
import CustomerWishlist from './CustomerWishlist';
import Customize from './Customize';
import Login from '../main/Login';

export default function CustomerNavBar() {
  const { user, setUser } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // State and handlers for the cart popover menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    setUser(null); // Clears the user from context and localStorage
    navigate('/login');
  };

  // Calculate total items and amount for the cart summary
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => total + item.cost * item.quantity, 0);

  return (
    <div>
      <nav className="navbar">
        {/* CORRECTED: The logo is now a Link component that navigates to the homepage */}
        <Link to="/" className="logo">
          <img src="/assets/logo.png" alt="Trend Mart Logo" className="logo-img" />
          <span>TREND MART</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {user && user.role === 'customer' ? (
            <>
              <li><Link to="/customerprofile">Profile</Link></li>
              <li><Link to="/customerwishlist">Wishlist</Link></li>
              <li><Link to="/customize">Customize</Link></li>
              
              {/* This is the interactive cart icon button */}
              <li>
                <IconButton aria-label="cart" color="inherit" onClick={handleCartClick}>
                  <Badge badgeContent={totalItemsInCart} color="error">
                    <ShoppingCartIcon style={{ color: 'white' }} />
                  </Badge>
                </IconButton>
              </li>

              <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>

      {/* This is the popover menu that opens when the cart icon is clicked */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, width: '300px' }}>
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            Shopping Cart
          </Typography>
          {cartItems.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            <>
              {cartItems.map((item) => (
                <Box key={item.id} className="cart-popover-item">
                  <Typography variant="body2">{item.name} (x{item.quantity})</Typography>
                  <Typography variant="body2">₹{item.cost * item.quantity}</Typography>
                </Box>
              ))}
              <Box className="cart-summary">
                <Typography variant="subtitle1">Total: ₹{totalAmount.toFixed(2)}</Typography>
                <Button 
                  component={Link} 
                  to="/cart" 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 1 }}
                  onClick={handleClose}
                >
                  View Cart
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Popover>

      {/* NOTE: This <Routes> block is likely redundant. */}
      {/* Your main routing should be handled in your top-level App.jsx file. */}
      <Routes>
        <Route path="/customerhome" element={<CustomerHome />} />
        {/* ... other customer routes */}
      </Routes>
    </div>
  );
}

