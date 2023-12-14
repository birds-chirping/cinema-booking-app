import React, { useEffect, useState } from "react";
import "./cart.css";
const Cart = () => {
  const [moviesInCart, setMoviesInCart] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem("moviecart")) {
      setMoviesInCart(JSON.parse(window.localStorage.getItem("moviecart")));
    }

    console.log(moviesInCart);
  }, []);

  return moviesInCart ? (
    <div className="cart-tickets">
      {moviesInCart.map((movieString) => {
        const movie = movieString.split("_");
        const date = new Date(movie[1] * 1000);
        const data = {
          movietitle: movie[0],
          date: date,
          row: movie[2],
          seat: movie[3],
          price: movie[4],
        };
        console.log(data);
        return (
          <div className="ticket-wrapper">
            <div className="left">
              <div className="cinema">
                <span>Imaginary</span> Cinema
              </div>
              <div className="content">
                <div className="title">
                  <div className="data">{data.movietitle}</div>
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
                    <div className="data">{data.row}</div>
                    <div className="tag">ROW</div>
                  </div>
                  <div className="seat">
                    <div className="data">{data.seat}</div>
                    <div className="tag">SEAT</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="logo">
                <i class="fa-solid fa-ticket"></i>
                {/* <i class="fa-solid fa-clapperboard"></i> */}
              </div>
              <div className="seat">
                <div>
                  {data.row}
                  {data.seat}
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
  );
};

export default Cart;
