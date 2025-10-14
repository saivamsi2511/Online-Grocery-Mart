import { useEffect, useState } from 'react';
import axios from 'axios';
import './seller.css';

export default function SellerHome() {
  const [products, setProducts] = useState([]);
  const sellerId = localStorage.getItem("sellerId"); // ✅ You must store this at login

  useEffect(() => {
    if (sellerId) {
      axios.get(`http://localhost:2004/seller/products/${sellerId}`)
        .then(res => setProducts(res.data))
        .catch(err => console.error("Error fetching seller products:", err));
    }
  }, [sellerId]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Your Products</h2>
      <div className="product-container">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img
              src={`http://localhost:2004${product.imagePath}`}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
