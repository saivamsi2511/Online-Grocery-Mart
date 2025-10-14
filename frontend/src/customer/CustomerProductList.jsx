import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './customer.css';

const CustomerProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get("http://localhost:2004/product/viewallproducts")

      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert("Added to cart!");
  };

  const filteredProducts = category
    ? products.filter(p => p.category === category)
    : products;

  return (
    <div className="product-list-container">
      <h2>Grocery Products</h2>

      <div className="category-filter">
        <label htmlFor="category">Filter by Category: </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((prod) => (
          <div key={prod.id} className="product-card">
            <img src={prod.url} alt={prod.name} className="product-image" />
            <h3>{prod.name}</h3>
            <p>{prod.description}</p>
            <p>Weight: {prod.weight}</p>
            <p>Expiry Date: {prod.expiryDate}</p>
            <p>₹{prod.cost}</p>
            <button onClick={() => addToCart(prod)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerProductList;
