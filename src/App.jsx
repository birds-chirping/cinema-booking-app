import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Details from "./pages/Details";

import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [moviesInCart, setMoviesInCart] = useState(0);

  useEffect(() => {
    const storage = window.localStorage.getItem("moviecart");

    if (storage) {
      setMoviesInCart(JSON.parse(storage).length);
    }
  }, []);

  const handleSetMoviesInCart = (count) => {
    setMoviesInCart(count);
  };

  return (
    <>
      <Navbar moviesInCart={moviesInCart} setMoviesInCart={handleSetMoviesInCart} />
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
