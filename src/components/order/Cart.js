import { useEffect, useState } from "react";
import { CartItem } from "./CartItem.js";

export const Cart = () => {
  const [customer, setCustomer] = useState({});
  const [currentCart, setCurrentCart] = useState([]);
  const [reducedCart, setReducedCart] = useState([]);
  const [products, setProducts] = useState([]);
  const localUserData = localStorage.getItem("kandy_user");
  const localUser = JSON.parse(localUserData);

  const getAllCustomersCarts = async () => {
    const customerResponse = await fetch(
      `http://localhost:8088/customers?_expand=user&_embed=shoppingCartItems&userId=${localUser.id}`
    );
    const customerData = await customerResponse.json();
    const singleCustomer = customerData[0];
    setCustomer(singleCustomer);
    setCurrentCart(singleCustomer.shoppingCartItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      const productResponse = await fetch(`http://localhost:8088/products`);
      const productData = await productResponse.json();

      setProducts(productData);
    };
    getAllCustomersCarts();
    fetchData();
  }, []);

  //change shopping cart array and transform into reduced array, use reduced array to display each product component by looping through reduced array and referencing product Ids of reduced array to build out product cards. include button for editing number of products. figure out how to delete an unspecified id?

  useEffect(() => {
    const reducedArray = currentCart.reduce((groupedItems, item) => {
      const product = item.productId;
      if (groupedItems[product] == null) {
        groupedItems[product] = [];
      }
      groupedItems[product].push(item);
      return groupedItems;
    }, {});
    setReducedCart(reducedArray);
  }, [currentCart]);

  return (
    <>
      <div className="section-header">
        <p className="emoji">🛒</p>
        <div className="section-info">
          <h1 className="section-title">Your Cart</h1>

          <h6 className="section-caption">
            Edit your cart or submit your order below
          </h6>
        </div>
        <p className="emoji">🛒</p>
      </div>
      {currentCart.length ? (
        <section className="card-list">
          {Object.entries(reducedCart).map(([key, value]) => {
            return (
              <CartItem
                key={`cartItemProduct--${key}`}
                productId={parseInt(key)}
                cartItemsArr={value}
                allProducts={products}
                getAllCustomersCarts={getAllCustomersCarts}
                currentCustomerId={customer.id}
              />
            );
          })}
        </section>
      ) : (
        <section className="section-info">Empty Cart</section>
      )}

      <section className="checkout">
        <button disabled={!currentCart.length}>Proceed to Checkout</button>
      </section>
    </>
  );
};
