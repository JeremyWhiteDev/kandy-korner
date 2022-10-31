export const ProductSearch = ({ searchSetter }) => {
  return (
    <>
      <label htmlFor="search">Search Products:</label>
      <input
        type="text"
        placeholder="Enter Search Terms"
        name="search"
        onChange={(event) => {
          searchSetter(event.target.value);
        }}
      />
    </>
  );
};
