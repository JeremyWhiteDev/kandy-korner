import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../KandyKorner";

export const CartItem = ({
  productId,
  cartItemsArr,
  allProducts,
  getAllCustomersCarts,
  currentCustomerId,
}) => {
  const [cartQuantity, setCartQuantity] = useState([]);
  //find product
  const foundProduct = allProducts.find((product) => product.id === productId);
  //   console.log(foundProduct);

  const [customer, getGlobalCustomer] = useContext(CustomerContext);

  useEffect(() => {
    setCartQuantity(cartItemsArr.length);
  }, []);

  const handleDecrement = async (click) => {
    click.preventDefault();
    setCartQuantity((prevQty) => prevQty - 1);
    const deleteData = async (data) => {
      //declare fetchOptions
      const fetchOptions = {
        method: "DELETE",
      };
      //fetch stringified entry obj
      const response = await fetch(
        `http://localhost:8088/shoppingCartItems/${cartItemsArr[0].id}`,
        { method: "DELETE" }
      );
      //handle response
    };
    await deleteData();
    getAllCustomersCarts();
    getGlobalCustomer();
  };
  const handleIncrement = async (click) => {
    click.preventDefault();
    setCartQuantity((prevQty) => prevQty + 1);
    const postData = async (data) => {
      //declare fetchOptions
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      //fetch stringified entry obj
      const response = await fetch(
        `http://localhost:8088/shoppingCartItems`,
        fetchOptions
      );
    };
    const productCopy = {
      customerId: currentCustomerId,
      productId: productId,
    };
    await postData(productCopy);
    getAllCustomersCarts();
    getGlobalCustomer();
  };

  const handleRemoveAll = async (click) => {
    click.preventDefault();
    for (const item of cartItemsArr) {
      const response = await fetch(
        `http://localhost:8088/shoppingCartItems/${item.id}`,
        { method: "DELETE" }
      );
      await response.json();
    }
    getAllCustomersCarts();
    getGlobalCustomer();
  };

  return (
    <>
      <section className="card">
        <h4>Name of Product: {foundProduct?.name}</h4>
        <p>Qty in Cart: {cartQuantity}</p>
        <p>
          <button onClick={(click) => handleDecrement(click)}>-</button>{" "}
          {cartQuantity}{" "}
          <button onClick={(click) => handleIncrement(click)}>+</button>
        </p>
        <button onClick={(click) => handleRemoveAll(click)}>Remove All</button>
      </section>
    </>
  );
};
