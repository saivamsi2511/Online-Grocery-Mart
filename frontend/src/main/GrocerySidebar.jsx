import React from 'react';
// Import the icons we need from the library
import { 
  LuApple, LuMilk, LuSandwich, LuCupSoda, LuFish, LuCandy, LuSnowflake, // ✅ LuIceCream replaced with LuSnowflake
  LuCakeSlice, LuWheat, LuContainer, LuSoup, LuCoffee 
} from "react-icons/lu";
import config from "../config";


// Create an array of objects to hold our category data
const categories = [
  { name: 'Produce', icon: <LuApple /> },
  { name: 'Dairy & Eggs', icon: <LuMilk /> },
  { name: 'Deli & Prepared Foods', icon: <LuSandwich /> },
  { name: 'Beverages', icon: <LuCupSoda /> },
  { name: 'Meat & Seafood', icon: <LuFish /> },
  { name: 'Snacks & Candy', icon: <LuCandy /> },
  { name: 'Frozen', icon: <LuSnowflake /> }, // ✅ Using the correct icon here
  { name: 'Bakery', icon: <LuCakeSlice /> },
  { name: 'Dry Goods & Pasta', icon: <LuWheat /> },
  { name: 'Condiments & Sauces', icon: <LuContainer /> },
  { name: 'Canned Goods & Soups', icon: <LuSoup /> },
  { name: 'Breakfast', icon: <LuCoffee /> }
];

const GrocerySidebar = () => (
  <aside className="grocery-sidebar">
    <ul>
      {/* Map over the array to create each list item dynamically */}
      {categories.map((category) => (
        <li key={category.name}>
          {category.icon}
          <span>{category.name}</span>
        </li>
      ))}
    </ul>
  </aside>
);

export default GrocerySidebar;