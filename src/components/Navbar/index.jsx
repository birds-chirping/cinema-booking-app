import { Link } from "react-router-dom";
import "./style.css";
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import CartPreview from "../CartPreview";

export const Navbar = ({ moviesInCart }) => {
  const [showCartPreview, setShowCartPreview] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowCartPreview(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowCartPreview(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

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
          <span>Imaginary</span>Cinema
        </Link>
      </div>
      <div className="menu">
        <div className="nav-admin">
          <Link to="/admin">Admin</Link>
        </div>
        <div className="nav-cart">
          <Link onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} to="/cart">
            Cart {moviesInCart && "+"}
          </Link>
          {showCartPreview && (
            <CartPreview
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => setShowCartPreview(false)}
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
