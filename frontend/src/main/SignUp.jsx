import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api"; // centralized axios instance with baseURL
import "./login.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    let endpoint;
    switch (formData.role.toLowerCase()) {
      case "admin":
        endpoint = "/admin/register";
        break;
      case "customer":
        endpoint = "/customer/register";
        break;
      case "seller":
        endpoint = "/seller/register";
        break;
      default:
        setError("Please select a valid role.");
        return;
    }

    try {
      const response = await api.post(endpoint, formData);
      if (response.status === 200) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(
          typeof response.data === "string"
            ? response.data
            : "Unexpected server response."
        );
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const errData = err.response.data;
        let errorMsg = "Something went wrong!";
        if (typeof errData === "string") errorMsg = errData;
        else if (errData.message) errorMsg = errData.message;
        else if (errData.error) errorMsg = errData.error;
        setError(errorMsg);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-side">
        <h2>Create Your Account</h2>
        <p>Join Grocery Mart and start shopping today.</p>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Choose a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            SIGN UP
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>

      <div className="login-image-side">
        <img src="/assets/signup-illustration.svg" alt="Signup Illustration" />
      </div>
    </div>
  );
}
