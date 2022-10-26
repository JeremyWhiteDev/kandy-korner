import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../products/Products";

export const NewProduct = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [checkedStatus, setCheckedStatus] = useState([]);
  const [formValue, updateFormValue] = useState({
    name: "",
    productTypeId: 0,
    price: "",
    locations: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8088/productTypes`);
      const data = await response.json();
      setProductTypes(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8088/locations`);
      const data = await response.json();
      setLocations(data);
      //set checked status to all false for empty array
      setCheckedStatus(new Array(data.length).fill(false));
    };
    fetchData();
  }, []);

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

  //handlePostTo ProductLocations
  //loop over the checked status array with .filter, return array of objects with locationId only. .map over that array to add current location to it.
  //at this point, I have an array of objects to post, so do a forEach and pass in the current abject as an anonymous function.

  const createArrayOfProductLocations = (currentProductId) => {
    const ojectifiedArray = checkedStatus.map((x, index) => {
      return {
        isChecked: x.id,
        productId: currentProductId,
        locationId: locations[index].locationId,
      };
    });
    return ojectifiedArray.filter((x) => x.isChecked);
  };

  //

  const handleChecked = (selected) => {
    const index = parseInt(selected) - 1;
    const checkedCopy = [...checkedStatus];
    checkedCopy[index] = !checkedCopy[index];
    setCheckedStatus(checkedCopy);
  };

  return (
    <>
      <h2>Please fill out and submit the form below</h2>

      <button onClick={() => navigate("/products")}>
        Return to all products
      </button>
      <form>
        <fieldset>
          <label htmlFor="productName">Product Name</label>
          <input
            name="productName"
            onChange={(event) => {
              const formCopy = { ...formValue };
              formCopy.name = event.target.value;
              updateFormValue(formCopy);
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="productType">Product Type</label>
          <select
            name="productType"
            onChange={(event) => {
              const formCopy = { ...formValue };

              formCopy.productTypeId = event.target.value;
              updateFormValue(formCopy);
            }}
          >
            <option id="procuctType--default" value={0}>
              Choose the Product Type
            </option>
            {productTypes.map((productType) => {
              return (
                <option
                  key={productType.id}
                  id={"productType--" + productType.id}
                  value={productType.id}
                >
                  {productType.type}
                </option>
              );
            })}
          </select>
        </fieldset>
        <fieldset>
          <ul>
            {locations.map((location) => {
              return (
                <li>
                  <input
                    id={"location--" + location.city}
                    name="location"
                    type="checkbox"
                    value={"location--" + location.id}
                    onChange={() => {
                      handleChecked(location.id);
                    }}
                  />
                  <label htmlFor={"location--" + location.id}>
                    {location.city}
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
        <button onClick={() => handleSubmit()}>Submit me!</button>
      </form>
    </>
  );
};

//create html form
//input field for name
//select (dropdown) for productTypeId
//checkbox for locations.
//submit btn
