import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./cart.css";
import happy_people from "../assets/img/2151024819.jpg";
import daydreaming from "../assets/img/9930998_4286861.jpg";
import popcorn from "../assets/img/9551249.jpg";
import Mock from "../api/MockAPI/mock";

const Cart = ({ ticketsInCart, setTicketsInCart }) => {
  const discountCode = useRef();
  const [total, setTotal] = useState(null);
  const [thankYou, setThankYou] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (discountCode.current) {
      calculateTotal();
    }
  }, [ticketsInCart]);

  const updateShowtimes = async (newShowtimeData) => {
    const url = `${Mock.BASE_URL}showtimes/1`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShowtimeData),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      setThankYou(true);
      setTicketsInCart(null);
      window.localStorage.removeItem("moviecart");

      timeoutRef.current = setTimeout(() => {
        setThankYou(false);
      }, 5000);
    }
    return false;
  };

  const buyTickets = async () => {
    await addBookedSeatsToTheater();
  };

  const addBookedSeatsToTheater = async () => {
    const response = await fetch(`${Mock.BASE_URL}showtimes/1`);
    const theater = await response.json();

    for (const ticket of ticketsInCart) {
      const index = theater.showtimes.findIndex((showtime) => showtime.timestamp === ticket.timestamp);
      const rows = theater.showtimes[index].theaterLayout;
      for (const row of rows) {
        if (row.row === ticket.row) {
          row.seats[ticket.index] = false;
        }
      }
    }
    updateShowtimes(theater);
  };

  const handleDeleteTicket = (id) => {
    const updatedCart = ticketsInCart.filter((ticket) => {
      return ticket.seatID != id;
    });

    updatedCart.length > 0
      ? window.localStorage.setItem("moviecart", JSON.stringify(updatedCart))
      : window.localStorage.removeItem("moviecart");

    setTicketsInCart(updatedCart);
  };

  const validateDiscountCode = () => {
    return discountCode.current.value === "movieweek" ? 40 : 0;
  };

  const calculateSubtotal = (arr) => {
    return arr.reduce((a, b) => a + Number(b.price), 0);
  };

  const calculateTotal = () => {
    const discount = validateDiscountCode();
    setTotal(ticketsInCart.reduce((a, b) => a + Number((b.price * (100 - discount)) / 100), 0).toFixed(2));
  };

  // console.log(ticketsInCart);

  return (
    <div className="cart-page">
      <div className="cart-cover">
        <img src={happy_people} alt="" />
      </div>
      <div className="cart">
        {ticketsInCart && ticketsInCart.length > 0 ? (
          <>
            <div className="cart-title">Tickets in cart</div>
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
            <div className="cart-info">
              <div className="discount">
                <label htmlFor="discount-code">If you have a coupon code, please enter it here</label>
                <input ref={discountCode} type="text" id="discount-code" />
                <button onClick={calculateTotal}>Apply</button>
              </div>
              <div className="subtotal">Subtotal: {calculateSubtotal(ticketsInCart).toFixed(2)} RON</div>
              <div className="discount-sum">
                Discount: {total > 0 ? (total - calculateSubtotal(ticketsInCart)).toFixed(2) : "0.00"} RON
              </div>
              <div className="total">Total: {total} RON</div>
            </div>
            <div className="cart-buttons">
              <div className="continue-shopping">
                <Link to="/">
                  <button className="continue-shopping-button">Continue Shopping</button>
                </Link>
              </div>
              <div className="checkout">
                <button onClick={buyTickets} className="checkout-button">
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          !thankYou && (
            <div className="empty-cart">
              <div>
                The cart is <span>empty</span>...{" "}
              </div>
              <img style={{ width: "70%" }} src={popcorn} alt="" />
              <div>
                ...the <span>popcorn</span> is waiting!{" "}
              </div>
              {/* <i className="fa-regular fa-face-laugh-beam"></i> */}
              <Link to="/">
                <button className="continue-shopping-empty-button">Continue Shopping</button>
              </Link>
            </div>
          )
        )}
        {thankYou && (
          <div className="thank-you">
            <div>
              This is a <span>fictional</span> service...{" "}
            </div>
            <img style={{ width: "70%" }} src={daydreaming} alt="" />
            <div>
              ...but I <span>saved you the seats</span> anyway!{" "}
            </div>
            <i className="fa-regular fa-face-laugh-beam"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
