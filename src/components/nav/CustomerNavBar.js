import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Form,
  Button,
} from "react-bootstrap";
import "./NavBar.css";
import "./NavBar.scss";

// define logic to find active link and change styling/addClassName
export const CustomerNavBar = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [cart, setCart] = useState([]);
  const [filteredCart, setFilteredCart] = useState([]);

  const localUserData = localStorage.getItem("kandy_user");
  const localUser = JSON.parse(localUserData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8088/customers`);
      const data = await response.json();
      setCustomers(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8088/shoppingCartItems`);
      const data = await response.json();
      setCart(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (customers && cart) {
      const foundCustomer = customers.find(
        (customer) => customer.userId === localUser.id
      );
      const filteredArray = cart.filter(
        (item) => item.customerId === foundCustomer.id
      );
      setFilteredCart(filteredArray);
    }
  }, [cart]);

  const [currentView, setCurrentView] = useState();

  //use effect and a state change for handling clicks?
  return (
    <>
      {["xxl"].map((expand) => (
        <Navbar
          key={expand}
          bg="light"
          expand={expand}
          variant="light"
          className="mb-3"
        >
          <Container fluid>
            <Navbar.Brand href="#">Kandy Korner</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              bg="party"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Where To?
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body variant="dark">
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <NavLink
                    to="/home"
                    className={({ isActive }) => {
                      //   console.log(isActive);
                      return "nav-link" + (isActive ? " activater" : "");
                    }}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/products"
                    className={({ isActive }) => {
                      //   console.log(isActive);
                      return "nav-link" + (isActive ? " activater" : "");
                    }}
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to="/find-products"
                    className={({ isActive }) => {
                      //   console.log(isActive);
                      return "nav-link" + (isActive ? " activater" : "");
                    }}
                  >
                    Find Products
                  </NavLink>
                  <NavLink
                    to="/locations"
                    className={({ isActive }) => {
                      //   console.log(isActive);
                      return "nav-link" + (isActive ? " activater" : "");
                    }}
                  >
                    Locations
                  </NavLink>
                  <NavLink
                    to="/about-us"
                    className={({ isActive }) => {
                      //   console.log(isActive);
                      return "nav-link" + (isActive ? " activater" : "");
                    }}
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    to="/employees"
                    className={({ isActive }) => {
                      //   console.log(isActive);
                      return "nav-link" + (isActive ? " activater" : "");
                    }}
                  >
                    Team
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) => {
                      //   console.log(isActive);
                      return "nav-link" + (isActive ? " activater" : "");
                    }}
                  >
                    Cart{" "}
                    <span className="cart-badge">
                      {filteredCart.length ? filteredCart.length : 0}
                    </span>
                  </NavLink>
                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                <Nav>
                  <NavLink
                    className="navbar__link"
                    to=""
                    onClick={() => {
                      localStorage.removeItem("kandy_user");
                      navigate("/", { replace: true });
                    }}
                  >
                    Logout
                  </NavLink>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button>Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

//TODO fix button background color
