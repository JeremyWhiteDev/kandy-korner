import { useState } from "react";
import { Products } from "./Products";
import { ProductSearch } from "./ProductSearch";

export const FindProducts = () => {
  const [searchTerms, setSearchTerms] = useState("");

  return (
    <>
      <ProductSearch searchSetter={setSearchTerms} />
      <Products searchGetter={searchTerms} searchCard={true} />
    </>
  );
};
