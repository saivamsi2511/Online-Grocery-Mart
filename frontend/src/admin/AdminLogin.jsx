import React, { useState } from "react";
import "./login.css";
import logo from "./assets/logo.png";       // place your logo inside src/assets/
import banner from "./assets/grocery-banner.png"; // optional banner

export default function Login() {
  const [category, setCategory] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { category, email, password });
    // TODO: send login request to backend
  };

  return (
    <div className="login-container">
      <div className="login-banner">
        <img src={banner} alt="banner" />
      </div>

      <div className="login-box">
        <img src={logo} alt="logo" className="login-logo" />
        <h2>Welcome Back!</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Select Role:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
