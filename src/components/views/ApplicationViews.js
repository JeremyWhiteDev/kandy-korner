import { Routes, Route } from "react-router-dom";
import { Home } from "../home/Home";
import { Products } from "../products/Products";
import { Locations } from "../locations/Locations";
import { AboutUs } from "../aboutUs/aboutUs";

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </>
  );
};
