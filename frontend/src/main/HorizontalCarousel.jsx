import React from "react";

const HorizontalCarousel = ({ title, products }) => (
  <section className="horizontal-carousel">
    <h2>{title}</h2>
    <div className="carousel-wrapper">
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="carousel-card">
            <img src={product.url} alt={product.name} />
            <div>
              <p>₹{product.cost}</p>
              <p>{product.name}</p>
              <button>+ Add</button>
            </div>
          </div>
        ))
      )}
    </div>
  </section>
);

export default HorizontalCarousel;
