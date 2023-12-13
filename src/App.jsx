import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Details from "./pages/Details";

import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [moviesInCart, setMoviesInCart] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("moviecart")) {
      setMoviesInCart(true);
    }
  }, []);

  const handleSetMoviesInCart = (bool) => {
    setMoviesInCart(bool);
  };

  return (
    <>
      <Navbar moviesInCart={moviesInCart} />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details/:movieId" element={<Details setMoviesInCart={handleSetMoviesInCart} />} />
      </Routes>
    </>
  );
};

export default App;
