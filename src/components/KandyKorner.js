import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./KandyKorner.css";
import { createContext, useEffect, useState } from "react";
export const CustomerContext = createContext();

export const KandyKorner = () => {
  const [customer, setCustomer] = useState({});

  const localUserData = localStorage.getItem("kandy_user");
  const localUser = JSON.parse(localUserData);

  const getGlobalCustomer = async () => {
    const customerResponse = await fetch(
      `http://localhost:8088/customers?_expand=user&_embed=shoppingCartItems&userId=${localUser.id}`
    );
    const customerData = await customerResponse.json();
    const singleCustomer = customerData[0];
    setCustomer(singleCustomer);
  };

  useEffect(() => {
    getGlobalCustomer();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <>
              <CustomerContext.Provider value={[customer, getGlobalCustomer]}>
                <NavBar />
                <ApplicationViews />
              </CustomerContext.Provider>
            </>
          </Authorized>
        }
      />
    </Routes>
  );
};
