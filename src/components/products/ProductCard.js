export const ProductCard = ({ card, getProductLocations }) => {
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
        <p>Category: {card.productType.type}</p>
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
      </section>
    </>
  );
};
