import React, { useState, useEffect } from 'react';
import { productsByCategory } from '../api/mockData.js';
import './HomePage.css';
import { useCart } from '../contextapi/CartContext.jsx';
import config from "../config";
 // Import the useCart hook

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart(); // Get the addToCart function

  useEffect(() => {
    const keys = Object.keys(productsByCategory);
    const allWithCat = keys.flatMap(cat =>
      productsByCategory[cat].map(product => ({ ...product, category: cat }))
    );
    setCategories(['All', ...keys]);
    setAllProducts(allWithCat);
    setFilteredProducts(allWithCat);
  }, []);

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
    setFilteredProducts(category === 'All' ? allProducts : allProducts.filter(p => p.category === category));
  };

  return (
    <div className="modern-main">
      <aside className="modern-sidebar">
        <h3>Categories</h3>
        <ul>
          {categories.map(cat => (
            <li
              key={cat}
              className={selectedCategory === cat ? 'active' : ''}
              onClick={() => handleFilterClick(cat)}
            >{cat}</li>
          ))}
        </ul>
      </aside>
      <main className="modern-product-list">
        <h2>All Products</h2>
        <div className="modern-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="modern-card">
              <img src={product.url} alt={product.name} />
              <div className="card-title">{product.name}</div>
              <div className="card-price">₹{product.cost}</div>
              {/* This now correctly uses the CartContext */}
              <button className="add-cart" onClick={() => addToCart(product)}>+ Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;