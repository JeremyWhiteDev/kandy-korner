import { CustomerViews } from "./CustomerViews";
import { EmployeeViews } from "./EmployeeViews";

export const ApplicationViews = () => {
  const localUserData = localStorage.getItem("kandy_user");
  const localUser = JSON.parse(localUserData);

  if (localUser.staff) {
    return <EmployeeViews />;
  } else {
    return <CustomerViews />;
  }
};
