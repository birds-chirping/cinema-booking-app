import React, { useEffect, useState } from "react";
import "./cart.css";
const Cart = () => {
  const [moviesInCart, setMoviesInCart] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem("moviecart")) {
      setMoviesInCart(JSON.parse(window.localStorage.getItem("moviecart")));
    }
  }, []);

  return (
    <div className="cart-page">
      <div className="cart">
        <div className="cart title">Tickets in cart</div>
        {moviesInCart ? (
          <div className="cart-tickets">
            {moviesInCart.map((seat) => {
              const date = new Date(seat.timestamp * 1000);
              return (
                <div key={seat.seatID} className="ticket-wrapper">
                  <div className="left">
                    <div className="cinema">
                      <span>Imaginary</span> Cinema
                    </div>
                    <div className="content">
                      <div className="title">
                        <div className="data">{seat.movieTitle}</div>
                        <div className="tag">MOVIE</div>
                      </div>
                      <div className="ticket-details">
                        <div className="date">
                          <div className="data">
                            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                          </div>
                          <div className="tag">DATE</div>
                        </div>
                        <div className="time">
                          <div className="data">
                            {date.getHours()}:{date.getMinutes()}
                          </div>
                          <div className="tag">TIME</div>
                        </div>
                        <div className="row">
                          <div className="data">{seat.row}</div>
                          <div className="tag">ROW</div>
                        </div>
                        <div className="seat">
                          <div className="data">{seat.index + 1}</div>
                          <div className="tag">SEAT</div>
                        </div>
                        <div className="seat">
                          <div className="data">{seat.price}</div>
                          <div className="tag">RON</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="logo">
                      <i className="fa-solid fa-ticket"></i>
                    </div>
                    <div className="seat">
                      <div>
                        {seat.row}
                        {seat.index + 1}
                      </div>
                      <div className="tag">SEAT</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="checkout">
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
