import React, { useEffect, useState } from "react";
import GrocerySidebar from "./GrocerySidebar";
import BannerCarousel from "./BannerCarousel";
import HorizontalCarousel from "./HorizontalCarousel";
import "../customer/customer.css";
import config from "../config";


// 1. Import the full product list from your mock data file
import { productsByCategory } from "../api/mockData.js";

const CustomerHome = () => {
  // 2. Use a single state to hold all of your product data
  const [productData, setProductData] = useState({});

  useEffect(() => {
    // 3. Load the full product list into the component's state when it mounts
    //    In a real app, this would be where you fetch data from a backend API.
    setProductData(productsByCategory);
  }, []);

  return (
    <div className="grocery-layout">
      <GrocerySidebar />
      <main>
        <BannerCarousel />

        {/* 4. Dynamically create a carousel for EVERY category in your data file */}
        {Object.keys(productData).map((categoryTitle) => (
          <HorizontalCarousel
            key={categoryTitle}
            title={categoryTitle}
            products={productData[categoryTitle]}
          />
        ))}
      </main>
    </div>
  );
};

export default CustomerHome;