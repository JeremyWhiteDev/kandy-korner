export const CartItem = ({ productId, numberOfItems, allProducts }) => {
  //find product
  const foundProduct = allProducts.find((product) => product.id === productId);
  //   console.log(foundProduct);
  console.log(productId);
  return (
    <>
      <section className="card">
        <h4>Name of Product: {foundProduct?.name}</h4>
        <p>Qty in Cart: {numberOfItems}</p>
      </section>
    </>
  );
};
