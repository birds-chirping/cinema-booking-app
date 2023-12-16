import { Link } from "react-router-dom";
import "./style.css";
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import CartPreview from "../CartPreview";

export const Navbar = ({ ticketsInCart, setTicketsInCart }) => {
  const [showCartPreview, setShowCartPreview] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowCartPreview(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowCartPreview(false);
    }, 500);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSetTicketsInCart = (count) => {
    setTicketsInCart(count);
  };

  return (
    <div
      className="navbar"
      // style={{
      //   backgroundColor: props.color ?? "transparent",
      //   color: props.textColor ?? "black",
      // }}
    >
      <div className="logo">
        <Link to="/">
          <span>Imaginary</span>
          <span>Cinema</span>
        </Link>
      </div>
      <div className="menu">
        <div className="nav-admin">
          <Link to="/admin">
            <i className="fa-solid fa-user-tie"></i>
          </Link>
        </div>
        <div className="nav-cart">
          <Link className="cart-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} to="/cart">
            <div className="cart-icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            {ticketsInCart && ticketsInCart.length > 0 && (
              <div className="cart-counter">{`${ticketsInCart.length}`}</div>
            )}
          </Link>
          {showCartPreview && (
            <CartPreview
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onGoToCartClick={() => setShowCartPreview(false)}
              setTicketsInCart={handleSetTicketsInCart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Navbar.propTypes = {
//   color: PropTypes.string,
//   textColor: PropTypes.string,
// };
