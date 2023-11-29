import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Details from "./pages/Details";

import React from "react";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/details/:movieId" element={<Details />} />
      </Routes>
    </>
  );
};

export default App;
