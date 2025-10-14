// File: ShopPage.jsx

import React, { useState, useEffect } from 'react';
import { productsByCategory } from '../api/mockData.js';
import './ShopPage.css';
import config from "../config";


const ShopPage = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const categoryNames = Object.keys(productsByCategory);
    const allProductsWithCategory = categoryNames.flatMap(category =>
      productsByCategory[category].map(product => ({
        ...product,
        category: category
      }))
    );

    setCategories(['All', ...categoryNames]);
    setAllProducts(allProductsWithCategory);
    setFilteredProducts(allProductsWithCategory);
  }, []);

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="shop-layout">
      <aside className="shop-sidebar">
        <h3>Categories</h3>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      <main className="product-grid-container">
        <h2>{selectedCategory} Products</h2>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.url} alt={product.name} className="product-image" />
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">₹{product.cost}</p>
              <button className="add-to-cart-btn">+ Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
