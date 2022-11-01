import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CustomerDetails = () => {
  const [customer, setCustomer] = useState({});
  const { customerId } = useParams();
  console.log(customerId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/customers/${customerId}?_expand=user`
      );
      const data = await response.json();
      setCustomer(data);
    };
    fetchData();
  }, []);

  const handleSubmit = (click) => {
    click.preventDefault();
    const postData = async (data) => {
      //declare fetchOptions
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      //fetch stringified entry obj
      const response = await fetch(
        `http://localhost:8088/customers/${customerId}`,
        fetchOptions
      );
      //handle response
    };
    const customerCopy = {
      address: customer.address,
      phoneNumber: customer.phoneNumber,
      userId: customer.userId,
      loyalty: customer.loyalty,
    };

    postData(customerCopy);
  };

  return (
    <>
      <h3>Name: {customer.user?.fullName}</h3>
      <p>Address: {customer?.address}</p>
      <p>Phone Number: {customer?.phoneNumber}</p>
      <p>Email: {customer.user?.email}</p>

      {}
      <form>
        <fieldset>
          <label htmlFor="loyaltyNumber">Loyalty Number</label>
          <input
            required
            autoFocus
            type="number"
            className="form-control"
            value={customer.loyalty}
            onChange={(evt) => {
              const formCopy = { ...customer };
              formCopy.loyalty = evt.target.valueAsNumber;
              setCustomer(formCopy);
            }}
          />
        </fieldset>
        <button onClick={(click) => handleSubmit(click)}>
          Update Loyalty Number
        </button>
      </form>
    </>
  );
};
