import React, { useState, useEffect } from 'react';
import { FaStore, FaBoxOpen, FaUserCheck, FaServer } from 'react-icons/fa';
import axios from 'axios';
import config from '../config';
import './admin.css';

const AdminHome = () => {
  const [totalSellers, setTotalSellers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pendingSellerApprovals, setPendingSellerApprovals] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // In a real application, you would fetch this data from your backend.
      // For now, we can use mock data to ensure the component displays correctly.
      setTotalSellers(58);
      setTotalProducts(753);
      setPendingSellerApprovals(12);

      // Example of real API calls (currently commented out):
      /*
      const sellersResponse = await axios.get(`${config.url}/admin/totalSellers`);
      setTotalSellers(sellersResponse.data);

      const productsResponse = await axios.get(`${config.url}/admin/totalProducts`);
      setTotalProducts(productsResponse.data);

      const pendingSellersResponse = await axios.get(`${config.url}/admin/pendingSellerApprovals`);
      setPendingSellerApprovals(pendingSellersResponse.data);
      */
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="dashboard">
      {/* This className is now unique to the admin dashboard */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">Admin Panel</div>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li>Manage Sellers</li>
          <li>Manage Products</li>
          <li>Customer Support</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Welcome, Admin 👋</h1>
          <p>Overview of your platform's performance</p>
        </header>

        <section className="cards-grid">
          <div className="card">
            <FaStore className="card-icon" />
            <h3>Total Sellers</h3>
            <p>{totalSellers}</p>
          </div>

          <div className="card">
            <FaBoxOpen className="card-icon" />
            <h3>Total Products</h3>
            <p>{totalProducts}</p>
          </div>

          <div className="card">
            <FaUserCheck className="card-icon" />
            <h3>Pending Approvals</h3>
            <p>{pendingSellerApprovals}</p>
          </div>

          <div className="card">
            <FaServer className="card-icon" />
            <h3>System Health</h3>
            <p>Operational</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminHome;