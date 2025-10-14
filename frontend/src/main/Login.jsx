import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../contextapi/AuthContext.jsx";
import config from "../config.js";
import "./login.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "customer",
  });
  const [captchaToken, setCaptchaToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleCaptchaChange = (value) => setCaptchaToken(value);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!captchaToken) {
      setError("Please verify the CAPTCHA before submitting.");
      return;
    }

    let endpoint = "";
    let redirectUrl = "/";

    switch (formData.role.toLowerCase()) {
      case "admin":
        endpoint = `${config.API_BASE_URL}/admin/checkadminlogin`;
        redirectUrl = "/admin/dashboard";
        break;
      case "customer":
        endpoint = `${config.API_BASE_URL}/customer/checkcustomerlogin`;
        redirectUrl = "/";
        break;
      case "seller":
        endpoint = `${config.API_BASE_URL}/seller/checksellerlogin`;
        redirectUrl = "/seller/dashboard";
        break;
      default:
        setError("Please select a valid role.");
        return;
    }

    try {
      const response = await axios.post(endpoint, formData);

      if (response.status === 200) {
        const userData = { ...response.data, role: formData.role };
        setUser(userData);
        navigate(redirectUrl);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("An unexpected error occurred during login.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-side">
        <h2>Login to Grocery Mart</h2>
        <p>Your one-stop shop for fresh groceries.</p>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="role">Select Your Role</label>
          <select
            id="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Role --</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="captcha-box">
            <ReCAPTCHA
              sitekey="6Lc77zQrAAAAAKFf8qcpYh7_qLeZs8IQ8mDHQerV" // Update with your captcha key
              onChange={handleCaptchaChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            LOGIN
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      <div className="login-image-side">
        <img src="/assets/login-illustration.svg" alt="Login Illustration" />
      </div>
    </div>
  );
}
