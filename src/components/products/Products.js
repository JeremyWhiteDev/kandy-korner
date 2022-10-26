import "./Products.css";
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const [products, setProduct] = useState([]);
  const [filteredProducts, setFilter] = useState([]);
  //   const [locations, setLocations] = useState([]);
  const [productLocations, setProductLocations] = useState([]);
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
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/productLocations?_expand=product&_expand=location`
      );
      const data = await response.json();
      setProductLocations(data);
    };
    fetchData();
  }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetch(`http://localhost:8088/locations`);
  //       const data = await response.json();
  //       setLocations(data);
  //     };
  //     fetchData();
  //   }, []);

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

  const findProductLocationList = (product) => {
    const filteredProductLocations = productLocations.filter(
      (x) => x.productId === product.id
    );
    const currentProductLocations = filteredProductLocations.map(
      (x) => x.location.city
    );
    return currentProductLocations;
  };

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
              {products && productLocations ? (
                <ProductCard
                  card={product}
                  getProductLocations={findProductLocationList(product)}
                />
              ) : (
                ""
              )}
            </>
          );
        })}
      </section>
    </>
  );
};
