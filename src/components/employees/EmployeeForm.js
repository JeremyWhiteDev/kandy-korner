import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AddEmployee = () => {
  const [employeeInfo, updateEmployeeInfo] = useState({
    locationId: "",
    startDate: "",
    payRate: 0,
    userId: 0,
  });

  const [userInfo, updateUserInfo] = useState({
    fullName: "",
    email: "",
  });

  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8088/locations`);
      const data = await response.json();
      setLocations(data);
    };
    fetchData();
  }, []);

  const handleSubmit = (event, user, employee) => {
    //prefent default form submit
    event.preventDefault();
    //create one function for both POST requests
    const postUserandEmployee = async (userParam, employeeParam) => {
      //declare fetchOptions for user Obj
      const fetchOptionsUser = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userParam),
      };

      //form fields are split into two different states, the fields for user data object are handlded by userInfo state, the fields for employee data object are stored in seperate employeeInfo state...

      //post first stringified user obj and store response in responseUser variable
      const responseUser = await fetch(
        `http://localhost:8088/users`,
        fetchOptionsUser
      );

      //make json object from response payload which contains fullName, email, and json-server created id
      const jsonNewUserObj = await responseUser.json();
      const newUserId = jsonNewUserObj.id;

      //grab current formState for employee sections of form and update userId with newUserId from json-server
      const employeeInfoCopy = { ...employeeParam };
      employeeInfoCopy.userId = newUserId;

      // Another fetchOptions for f......
      const fetchOptionsEmployee = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeInfoCopy),
      };
      const responseEmployee = await fetch(
        `http://localhost:8088/employees`,
        fetchOptionsEmployee
      );
    };
    postUserandEmployee(user, employee);
    navigate("/employees");
  };

  return (
    <>
      <h2>Please fill out and submit the form below</h2>

      <button onClick={() => navigate("/employees")}>
        Return to all employees
      </button>
      <form>
        <fieldset>
          <label htmlFor="employeeName">Employee Name</label>
          <input
            name="employeeName"
            onChange={(event) => {
              const formCopy = { ...userInfo };
              formCopy.fullName = event.target.value;
              updateUserInfo(formCopy);
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            name="emai"
            onChange={(event) => {
              const formCopy = { ...userInfo };
              formCopy.email = event.target.value;
              updateUserInfo(formCopy);
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="startDate">Employee Start Date</label>
          <input
            type="date"
            name="startDate"
            onChange={(event) => {
              const formCopy = { ...employeeInfo };
              formCopy.startDate = event.target.value;
              updateEmployeeInfo(formCopy);
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="employeeLocation">Employee Location</label>
          <select
            name="employeeLocation"
            onChange={(event) => {
              const formCopy = { ...employeeInfo };

              formCopy.locationId = parseInt(event.target.value);
              updateEmployeeInfo(formCopy);
            }}
          >
            <option id="employeeLocation--default" value={0}>
              Choose the Employee's Location
            </option>
            {locations.map((location) => {
              return (
                <option
                  key={location.id}
                  id={"productType--" + location.id}
                  value={location.id}
                >
                  {location.city}
                </option>
              );
            })}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="employeePay">Employee Pay Rate</label>
          <input
            name="employeePay"
            onChange={(event) => {
              const formCopy = { ...employeeInfo };
              formCopy.payRate = parseInt(event.target.value);
              updateEmployeeInfo(formCopy);
            }}
          />
        </fieldset>

        <button
          onClick={(eventClick) => {
            handleSubmit(eventClick, userInfo, employeeInfo);
          }}
        >
          Submit me!
        </button>
      </form>
    </>
  );
};
