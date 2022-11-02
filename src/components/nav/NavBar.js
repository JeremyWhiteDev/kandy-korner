import { CustomerNavBar } from "./CustomerNavBar";
import { EmployeeNavBar } from "./EmployeeNavBar";

export const NavBar = () => {
  const localUserData = localStorage.getItem("kandy_user");
  const localUser = JSON.parse(localUserData);

  if (localUser.staff) {
    return <EmployeeNavBar />;
  } else {
    return <CustomerNavBar />;
  }
};
