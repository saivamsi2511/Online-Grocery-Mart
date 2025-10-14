import { Routes, Route, Link } from 'react-router-dom';
import './admin.css';
import AdminHome from './AdminHome';
import Addseller from './AddSeller';
import Viewsellers from './ViewSellers';
import ViewCustomers from './ViewCustomers';
import logo from '../assets/logo.jpg'; // Make sure this path and filename are correct
import AdminCustomizationPage from './AdminCustomizationPage';
import { useAuth } from '../contextapi/AuthContext';
import Login from '../main/Login';

export default function AdminNavBar() {
  const { setIsAdminLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          {/* This is the single, correct way to display the logo */}
          <img src="/assets/logo.jpg" alt="Trend Mart Logo" className="logo-img" />
          TREND MART
        </div>
        <ul className="nav-links">
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/additemseller">Add Item Sellers</Link></li>
          <li><Link to="/viewsellers">View Item Sellers</Link></li>
          <li><Link to="/viewallcustomers">View All Customers</Link></li>
          <li><Link to="/admin/customizations">Customizations</Link></li>
          <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact />
        <Route path="/additemseller" element={<Addseller />} exact />
        <Route path="/viewsellers" element={<Viewsellers />} exact />
        <Route path="/viewallcustomers" element={<ViewCustomers />} exact />
        <Route path="/admin/customizations" element={<AdminCustomizationPage />} exact />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}