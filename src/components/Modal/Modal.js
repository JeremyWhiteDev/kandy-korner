import { AddEmployee } from "../employees/EmployeeForm";
import "./Modal.css";

export const Modal = ({ isActive, setModalIsActive }) => {
  if (isActive) {
    return (
      <>
        <div
          className="overlay--user "
          onClick={(click) => setModalIsActive(false)}
        ></div>
        <div className="modal--user">{<AddEmployee />}</div>
      </>
    );
  } else {
    return "";
  }
};
