import React, { useState } from 'react';

const CustomerRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform signup logic here
    console.log("Registering user", { name, email, password, phone });
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          placeholder="Enter your full name"
        />
        
        <label>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          placeholder="Enter your email"
        />
        
        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          placeholder="Choose a password"
        />

        <label>Phone Number</label>
        <input 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required 
          placeholder="Enter your phone number"
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default CustomerRegistration;
