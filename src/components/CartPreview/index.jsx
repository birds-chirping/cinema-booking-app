import React from "react";
import "./style.css";

const CartPreview = ({ onMouseEnter, onMouseLeave }) => {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="cart-preview">
      Cart Preview
    </div>
  );
};

export default CartPreview;
