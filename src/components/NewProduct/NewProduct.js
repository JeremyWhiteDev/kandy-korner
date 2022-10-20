import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NewProduct = () => {
  const [formValue, updateFormValue] = useState({
    name: "",
    productTypeId: 0,
    price: "",
    locations: [],
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formCopy = { ...formValue };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formCopy),
    };
    const response = await fetch(
      "http://localhost:8088/products",
      fetchOptions
    );
    await response.json();
    navigate("/products");
  };
};

//create html form
//input field for name
//select (dropdown) for productTypeId
//checkbox for locations.
//submit btn
