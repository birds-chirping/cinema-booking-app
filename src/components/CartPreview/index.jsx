import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const CartPreview = ({ onMouseEnter, onMouseLeave, onClick }) => {
  const [moviesInCart, setMoviesInCart] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem("moviecart")) {
      setMoviesInCart(JSON.parse(window.localStorage.getItem("moviecart")));
    }
  }, []);

  return (
    moviesInCart && (
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="cart-preview">
        <div className="preview-title">Latest tickets</div>
        <div className="movies-in-cart">
          {moviesInCart
            .toReversed()
            .slice(moviesInCart.length - 5)
            .map((seat) => {
              return (
                <div key={seat.seatID} className="cart-entry">
                  <div className="seat">
                    {seat.row}
                    {seat.index + 1}
                  </div>
                  <div className="movie-title">{seat.movieTitle}</div>
                  <div className="price">{seat.price} RON</div>
                  <button className="del-button">
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              );
            })}
        </div>
        {moviesInCart.length > 5 && <div className="and-x-more">( +{moviesInCart.length - 5} more)</div>}
        <Link onClick={onClick} to="/cart">
          <button className="cart-button">Go to cart</button>
        </Link>
        <div className="total">
          <div className="total-tickets">
            {moviesInCart.length} ticket{moviesInCart.length > 1 && "s"} booked
          </div>
          <div className="total-price">
            Total: {moviesInCart.reduce((a, b) => a + Number(b.price), 0).toFixed(2)} RON
          </div>
        </div>
      </div>
    )
  );
};

export default CartPreview;
