import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../KandyKorner";

export const ProductCard = ({
  card,
  getProductLocations,
  searchCard,
  user,
}) => {
  //   console.log(taco);
  //   const foundLocations = [];
  //   const foundLocations = getProductLocations.filter(
  //     (x) => x.productId === card.id
  //   );

  //   const findLocationName = (locationObj) => {
  //     const foundLocationObj = getLocations.find(
  //       (location) => location.id === locationObj.locationId
  //     );
  //     return foundLocationObj.city;
  //   };

  const [currentCustomer, setCurrentCustomer] = useState({});

  const [customer, getGlobalCustomer] = useContext(CustomerContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/customers?_expand=user&userId=${user.id}`
      );
      const data = await response.json();
      const singleUser = data[0];

      setCurrentCustomer(singleUser);
    };
    fetchData();
  }, []);

  const handleAddToCart = async (click) => {
    click.preventDefault();
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
      //handle response
    };
    const newCartItem = {
      customerId: currentCustomer.id,
      productId: card.id,
    };
    await postData(newCartItem);
    getGlobalCustomer();
  };

  return (
    <>
      <section key={card.id} className="card">
        <h4>{card.name}</h4>
        <p>${card.price}</p>
        {!searchCard ? <p>Category: {card.productType.type}</p> : ""}
        {!searchCard ? (
          <ul>
            Locations:
            {getProductLocations.map((x) => {
              return (
                <>
                  <li key={x}>{x}</li>
                </>
              );
            })}
          </ul>
        ) : (
          ""
        )}

        {searchCard ? (
          <button
            onClick={() => {
              window.alert(
                "This item can be purchased in the following locations: " +
                  getProductLocations.join(", ")
              );
            }}
          >
            Show me Where to purchase!
          </button>
        ) : (
          ""
        )}
        {!user.staff ? (
          <button
            id={`addProduct--${card.id}`}
            onClick={(click) => handleAddToCart(click)}
          >
            Add to Cart
          </button>
        ) : (
          ""
        )}
      </section>
    </>
  );
};
