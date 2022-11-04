import { KandyKorner } from "./components/KandyKorner";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { createContext } from "react";

const CartContext = createContext();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <KandyKorner />
  </BrowserRouter>
);
