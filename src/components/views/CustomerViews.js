import { Routes, Route } from "react-router-dom";
import { Home } from "../home/Home";
import { Products } from "../products/Products";
import { Locations } from "../locations/Locations";
import { AboutUs } from "../aboutUs/aboutUs";
import { NewProduct } from "../NewProduct/NewProduct";
import { FindProducts } from "../products/FindProducts";
import { EmployeeList } from "../employees/EmployeeList";
import { AddEmployee } from "../employees/EmployeeForm";
import { CustomerList } from "../customers/CustomerList";
import { CustomerDetails } from "../customers/CustomerDetails";
import { Cart } from "../order/Cart";

export const CustomerViews = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/find-products" element={<FindProducts />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};
