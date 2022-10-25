export const ProductCard = ({ card }) => {
  //   console.log(taco);

  return (
    <>
      <section key={card.id} className="card">
        <h4>{card.name}</h4>
        <p>${card.price}</p>
        <p>{card.productType.type}</p>
      </section>
    </>
  );
};
