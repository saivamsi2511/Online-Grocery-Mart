// In src/main/BannerCarousel.jsx
import React from "react";
import bannerImage from '../assets/banner.jpg'; // 👈 1. Import the image

const BannerCarousel = () => (
  <div className="banner-carousel">
    {/* 👇 2. Use the imported variable here */}
    <img src={bannerImage} alt="Grocery Banner" />
  </div>
);

export default BannerCarousel;