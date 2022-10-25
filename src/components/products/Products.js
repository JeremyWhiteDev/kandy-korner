import "./Products.css";
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const [products, setProduct] = useState([]);
  const [filteredProducts, setFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState(false);

  const navigate = useNavigate();

  const localUserData = localStorage.getItem("kandy_user");
  const localUser = JSON.parse(localUserData);

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
        {localUser ? (
          <button
            onClick={() => {
              navigate("/add-product");
            }}
            className=""
          >
            Create new Product
          </button>
        ) : (
          ""
        )}
      </div>
      <section className="card-list">
        {filteredProducts.map((product) => {
          return (
            <>
              <ProductCard card={product} />;
            </>
          );
        })}
      </section>
    </>
  );
};
