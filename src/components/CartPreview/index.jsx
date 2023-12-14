import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const CartPreview = ({ onMouseEnter, onMouseLeave, onGoToCartClick, updateCartCount }) => {
  const [moviesInCart, setMoviesInCart] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem("moviecart")) {
      setMoviesInCart(JSON.parse(window.localStorage.getItem("moviecart")));
    }
  }, []);

  const handleDeleteTicket = (id) => {
    const updatedCart = moviesInCart.filter((movie) => {
      return movie.seatID != id;
    });

    console.log(updatedCart);
    updatedCart.length > 0
      ? window.localStorage.setItem("moviecart", JSON.stringify(updatedCart))
      : window.localStorage.removeItem("moviecart");

    if (updatedCart.length > 0) {
      setMoviesInCart(updatedCart);
    } else {
      setMoviesInCart(null);
      onMouseLeave();
    }
    updateCartCount(updatedCart.length);
  };

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="cart-preview">
      {moviesInCart ? (
        <>
          <div className="preview-title">Latest tickets</div>
          <div className="movies-in-cart">
            {moviesInCart.toReversed().map((seat) => {
              return (
                <div key={seat.seatID} className="cart-entry">
                  <div className="seat">
                    {seat.row}
                    {seat.index + 1}
                  </div>
                  <div className="movie-title">{seat.movieTitle}</div>
                  <div className="price">{seat.price} RON</div>
                  <button onClick={() => handleDeleteTicket(seat.seatID)} className="delete-button">
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              );
            })}
          </div>

          <div className={`cart-button-wrapper ${moviesInCart.length > 5 ? "scroll-shadow" : ""}`}>
            <Link onClick={onGoToCartClick} to="/cart">
              <button className="cart-button">Go to cart</button>
            </Link>
          </div>

          <div className="total">
            <div className="total-tickets">
              {moviesInCart.length} ticket{moviesInCart.length > 1 && "s"} booked
            </div>
            <div className="total-price">
              Total: {moviesInCart.reduce((a, b) => a + Number(b.price), 0).toFixed(2)} RON
            </div>
          </div>
        </>
      ) : (
        <div className="empty-cart">No tickets booked</div>
      )}
    </div>
  );
};

export default CartPreview;
