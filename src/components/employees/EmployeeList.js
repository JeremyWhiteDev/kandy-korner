import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal/Modal";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [locations, setLocations] = useState([]);
  const [modalIsActive, setModalIsActive] = useState(false);
  const navigate = useNavigate();

  const localUserData = localStorage.getItem("kandy_user");
  const localUser = JSON.parse(localUserData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/employees?_expand=user&_expand=location`
      );
      const data = await response.json();
      setEmployees(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8088/locations`);
      const data = await response.json();
      setLocations(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="section-header">
        <p className="emoji">💪</p>
        <div className="section-info">
          <h1 className="section-title">Team Members</h1>

          <h6 className="section-caption">The list of current employees</h6>
        </div>
        <p className="emoji">💪</p>
      </div>

      <div>
        {localUser.staff ? (
          <button onClick={() => setModalIsActive(true)}>Add Empoyee</button>
        ) : (
          ""
        )}
      </div>
      <section className="card-list">
        {employees.map((employee) => {
          return (
            <section className="card">
              <h4>Name: {employee.user?.fullName}</h4>
              <p>Start Date: {employee.startDate}</p>
              <p>Location: {employee.location?.city}</p>
            </section>
          );
        })}
      </section>
      <Modal isActive={modalIsActive} setModalIsActive={setModalIsActive} />
    </>
  );
};
