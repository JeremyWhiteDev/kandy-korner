export const ProductCard = ({ card, getProductLocations, searchCard }) => {
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
                  <li>{x}</li>
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
      </section>
    </>
  );
};
