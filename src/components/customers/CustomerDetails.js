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

  return (
    <>
      <h3>Name: {customer.user?.fullName}</h3>
      <p>Address: {customer?.address}</p>
      <p>Phone Number: {customer?.phoneNumber}</p>
      <p>Loyalty #: {customer?.loyalty}</p>
      <p>Email: {customer.user?.email}</p>
    </>
  );
};
