import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Details from "./pages/Details";

import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
  const [ticketsInCart, setTicketsInCart] = useState(null);
  const [navbarStyle, setNavbarStyle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storage = window.localStorage.getItem("moviecart");

    if (storage) {
      setTicketsInCart(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/details/")) {
      setNavbarStyle("transparent");
    } else {
      setNavbarStyle(null);
    }
  }, [location]);

  const handleSetTicketsInCart = (tickets) => {
    setTicketsInCart(tickets);
  };

  return (
    <>
      <Navbar navbarStyle={navbarStyle} ticketsInCart={ticketsInCart} setTicketsInCart={handleSetTicketsInCart} />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/cart"
          element={<Cart ticketsInCart={ticketsInCart} setTicketsInCart={handleSetTicketsInCart} />}
        />
        <Route path="/details/:movieId" element={<Details setTicketsInCart={handleSetTicketsInCart} />} />
      </Routes>
    </>
  );
};

export default App;
