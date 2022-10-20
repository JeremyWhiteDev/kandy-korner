import "./Products.css";
import { useState, useEffect } from "react";

export const Products = () => {
  const [products, setProduct] = useState([]);
  const [filteredProducts, setFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/products/?_expand=productType&sort=name&_order=asc`
      );
      const data = await response.json();
      setProduct(data);
      console.log(products);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (priceFilter === true) {
      const filteredArray = products.filter((product) => {
        return product.price > 7;
      });
      setFilter(filteredArray);
    } else {
      setFilter(products);
      console.log(products[0] + "yup");
    }
  }, [priceFilter, products]);

  return (
    <>
      <div className="section-header">
        <p className="emoji">🍬</p>
        <div className="section-info">
          <h1 className="section-title">HAVE SOME CANDY</h1>
          <h6 className="section-caption">
            Check out our list of ever growing projects!
          </h6>
        </div>
        <p className="emoji">🍭</p>
      </div>
      <div className="list-options">
        <button
          onClick={() => {
            setPriceFilter(!priceFilter);
          }}
          className=""
        >
          {!priceFilter ? "Filter by top Price" : "Show All"}
        </button>
      </div>
      <section className="card-list">
        {filteredProducts.map((product) => {
          return (
            <section key={product.id} className="card">
              <h4>{product.name}</h4>
              <p>${product.price}</p>
              <p>{product.productType.type}</p>
            </section>
          );
        })}
      </section>
    </>
  );
};
