import { useEffect, useState } from "react";

export const CartItem = ({
  productId,
  arrOfItems,
  allProducts,
  getAllCustomersCarts,
  currentCustomerId,
}) => {
  const [cartQuantity, setCartQuantity] = useState([]);
  //find product
  const foundProduct = allProducts.find((product) => product.id === productId);
  //   console.log(foundProduct);

  useEffect(() => {
    setCartQuantity(arrOfItems.length);
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
        `http://localhost:8088/shoppingCartItems/${arrOfItems[0].id}`,
        { method: "DELETE" }
      );
      //handle response
    };
    await deleteData();
    getAllCustomersCarts();
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
      </section>
    </>
  );
};
