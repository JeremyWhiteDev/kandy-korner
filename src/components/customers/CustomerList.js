import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/customers?_expand=user`
      );
      const data = await response.json();
      setCustomers(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="section-header">
        <p className="emoji">💪</p>
        <div className="section-info">
          <h1 className="section-title">Customers</h1>

          <h6 className="section-caption">The list of current customers</h6>
        </div>
        <p className="emoji">💪</p>
      </div>

      {/* <div>
        <button onClick={() => navigate("/add-employee")}>Add Empoyee</button>
      </div> */}
      <section className="card-list">
        {customers.map((customer) => {
          return (
            <section className="card" key={`customer--${customer.id}`}>
              <Link to={`/customer/${customer.id}`}>
                <h4>Name: {customer.user?.fullName}</h4>
              </Link>
            </section>
          );
        })}
      </section>
    </>
  );
};
