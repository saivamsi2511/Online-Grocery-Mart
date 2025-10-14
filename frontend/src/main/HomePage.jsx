import React, { useState, useEffect } from 'react';
import { productsByCategory } from '../api/mockData.js';
import './HomePage.css';
import { useCart } from '../contextapi/CartContext';
import config from "../config";
 // CHANGED: Import the useCart hook

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart(); // CHANGED: Get the addToCart function from the context

  useEffect(() => {
    const keys = Object.keys(productsByCategory);
    // This logic to take a maximum of 4 products per category is preserved
    const limitedProducts = keys.flatMap(cat =>
      productsByCategory[cat].slice(0, 4).map(product => ({ ...product, category: cat }))
    ); // 
    setCategories(['All', ...keys]);
    setAllProducts(limitedProducts);
    setFilteredProducts(limitedProducts);
  }, []);

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
    setFilteredProducts(category === 'All'
      ? allProducts
      : allProducts.filter(p => p.category === category));
  };

  return (
    <div className="modern-bg">
      <div className="modern-main">
        <aside className="modern-sidebar">
          <h3>Categories</h3>
          <ul>
            {categories.map(cat => (
              <li
                key={cat}
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => handleFilterClick(cat)}
              >
                {cat}
              </li>
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
                {/* CHANGED: The onClick handler now adds the product to the cart */}
                <button className="add-cart" onClick={() => addToCart(product)}>
                  + Add to Cart
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;