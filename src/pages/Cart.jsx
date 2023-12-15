import React, { useEffect, useState } from "react";
import "./cart.css";
import happy_people from "../assets/img/2151024819.jpg";

const Cart = ({ ticketsInCart, setTicketsInCart }) => {
  const handleDeleteTicket = (id) => {
    const updatedCart = ticketsInCart.filter((ticket) => {
      return ticket.seatID != id;
    });

    updatedCart.length > 0
      ? window.localStorage.setItem("moviecart", JSON.stringify(updatedCart))
      : window.localStorage.removeItem("moviecart");

    setTicketsInCart(updatedCart);
  };

  console.log(ticketsInCart);

  return (
    <div className="cart-page">
      <div className="cart-cover">
        <img src={happy_people} alt="" />
      </div>
      <div className="cart">
        <div className="cart-title">Tickets in cart</div>
        {ticketsInCart && ticketsInCart.length > 0 ? (
          <>
            <div className="cart-tickets">
              {ticketsInCart.map((seat) => {
                const date = new Date(seat.timestamp * 1000);
                return (
                  <div key={seat.seatID} className="ticket-row">
                    <div className="ticket-wrapper">
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
                    <div className="delete-wrapper">
                      <button onClick={() => handleDeleteTicket(seat.seatID)}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart-info">{/* <div className="subtotal">Subtotal: {}</div> */}</div>
            <div className="cart-buttons">
              <div className="continue-shopping">
                <button className="continue-shopping-button">Continue Shopping</button>
              </div>
              <div className="checkout">
                <button className="checkout-button">Checkout</button>
              </div>
            </div>
          </>
        ) : (
          <div>No tickets in cart</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
