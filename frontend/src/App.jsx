import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contextapi/AuthContext';
import { CartProvider } from './contextapi/CartContext';

// --- Import ALL Your Components ---
// (Your imports are correct)

// Main / Public Components
import MainNavBar from './main/MainNavBar';
import HomePage from './main/HomePage';
import About from './main/About';
import Contact from './main/Contact';
import Login from './main/Login';
import SignUp from './main/SignUp';
import NotFound from './main/NotFound';

// Customer Components
import CustomerNavBar from './customer/CustomerNavBar';
import CustomerProfile from './customer/CustomerProfile';
import CustomerCart from './customer/CustomerCart';
import CustomerWishlist from './customer/CustomerWishlist';
import PaymentPage from './customer/PaymentPage';
import CardPayment from './customer/CardPayment';
import UPIPayment from './customer/UPIPayment';
import NetBankingPayment from './customer/NetBankingPayment';

// Seller Components
import SellerNavBar from './seller/SellerNavBar';
import SellerHome from './seller/SellerHome';
import SellerProfile from './seller/SellerProfile';
import SellerAddProduct from './seller/SellerAddProduct';
import ViewAllProducts from './seller/ViewAllProducts';

// Admin Components
import AdminNavBar from './admin/AdminNavBar';
import AdminHome from './admin/AdminHome';
import AddSeller from './admin/AddSeller';
import ViewSellers from './admin/ViewSellers';
import ViewCustomers from './admin/ViewCustomers';

// Helper component to protect routes
import ProtectedRoute from './main/ProtectedRoute';

// --- Layout Component to Render the Correct NavBar ---
const AppLayout = () => {
  const { user } = useAuth(); // This now correctly gets the user object

  let NavBar;
  if (user?.role === 'admin') {
    NavBar = <AdminNavBar />;
  } else if (user?.role === 'seller') {
    NavBar = <SellerNavBar />;
  } else if (user?.role === 'customer') {
    NavBar = <CustomerNavBar />;
  } else {
    NavBar = <MainNavBar />; // Default NavBar for logged-out users
  }

  return (
    <>
      {NavBar}
      <Outlet /> {/* This renders the matched child route component */}
    </>
  );
};

// --- Main App Component with All Routes and Providers ---
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              
              {/* Public Routes */}
              <Route index element={<HomePage />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />

              {/* Customer Protected Routes */}
              <Route path="profile" element={<ProtectedRoute role="customer"><CustomerProfile /></ProtectedRoute>} />
              <Route path="cart" element={<ProtectedRoute role="customer"><CustomerCart /></ProtectedRoute>} />
              <Route path="wishlist" element={<ProtectedRoute role="customer"><CustomerWishlist /></ProtectedRoute>} />
              <Route path="payment" element={<ProtectedRoute role="customer"><PaymentPage /></ProtectedRoute>} />
              <Route path="card-payment" element={<ProtectedRoute role="customer"><CardPayment /></ProtectedRoute>} />
              <Route path="upi-payment" element={<ProtectedRoute role="customer"><UPIPayment /></ProtectedRoute>} />
              <Route path="netbanking-payment" element={<ProtectedRoute role="customer"><NetBankingPayment /></ProtectedRoute>} />

              {/* Seller Protected Routes */}
              <Route path="seller/dashboard" element={<ProtectedRoute role="seller"><SellerHome /></ProtectedRoute>} />
              <Route path="seller/profile" element={<ProtectedRoute role="seller"><SellerProfile /></ProtectedRoute>} />
              <Route path="seller/add-product" element={<ProtectedRoute role="seller"><SellerAddProduct /></ProtectedRoute>} />
              <Route path="seller/products" element={<ProtectedRoute role="seller"><ViewAllProducts /></ProtectedRoute>} />

              {/* Admin Protected Routes */}
              <Route path="admin/dashboard" element={<ProtectedRoute role="admin"><AdminHome /></ProtectedRoute>} />
              <Route path="admin/add-seller" element={<ProtectedRoute role="admin"><AddSeller /></ProtectedRoute>} />
              <Route path="admin/view-sellers" element={<ProtectedRoute role="admin"><ViewSellers /></ProtectedRoute>} />
              <Route path="admin/view-customers" element={<ProtectedRoute role="admin"><ViewCustomers /></ProtectedRoute>} />
              
              {/* Catch-all Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;