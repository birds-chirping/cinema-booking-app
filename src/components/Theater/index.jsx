import React, { useEffect, useRef, useState } from "react";
import Seat from "../Seat";
import "./style.css";

const Theater = ({ setAddedTickets, showtime, movie, setMoviesInCart }) => {
  const selectedSeatsDiv = useRef();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reselectedSeats, setReselectedSeats] = useState([]);

  useEffect(() => {
    setSelectedSeats([]);
  }, [showtime]);

  const handleSeatClick = (row, index, checked, timestamp, movie) => {
    const seat = {
      seatID: `${timestamp}_${movie.id}_${row}${index}`,
      row: row,
      index: index,
      price: movie.price,
      timestamp: timestamp,
      movieTitle: movie.title,
      movieID: movie.id,
    };

    if (checked) {
      setSelectedSeats((prev) => [...prev, seat]);
    } else {
      setSelectedSeats((prev) => prev.filter((prevSeat) => prevSeat.index != seat.index || prevSeat.row != seat.row));
    }
  };

  const addTicketsToCart = (seats) => {
    let movieTickets = [];
    let alreadyBooked = [];
    if (window.localStorage.getItem("moviecart")) {
      movieTickets = JSON.parse(window.localStorage.getItem("moviecart"));
    }
    seats.forEach((seat) => {
      if (movieTickets.find((bookedSeat) => bookedSeat.seatID === seat.seatID)) {
        alreadyBooked.push(seat);
      } else {
        movieTickets.push(seat);
      }
    });

    if (alreadyBooked.length > 0) {
      setReselectedSeats(alreadyBooked);
    } else {
      window.localStorage.setItem("moviecart", JSON.stringify(movieTickets));
      setAddedTickets((prev) => prev + 1);
      setMoviesInCart(true);
    }
  };

  return (
    <div className="theater-wrapper">
      <div className="screen-wrapper">
        <div className="screen">SCREEN</div>
      </div>
      <div className="theater">
        {showtime.id} {/* temp */}
        {showtime.theaterLayout.map((rowData) => {
          return (
            <div className="theater-row" key={rowData.row}>
              <div className="row-tag">{rowData.row}</div>
              {rowData.seats.map((seat, index) => {
                return (
                  <Seat
                    key={index}
                    showtimeID={showtime.id}
                    seat={{ available: seat, row: rowData.row, index: index }}
                    onSeatClick={(row, index, checked) =>
                      handleSeatClick(row, index, checked, showtime.timestamp, movie)
                    }
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <div ref={selectedSeatsDiv} className="selected-seats-wrapper">
        {selectedSeats.map((seat) => (
          <div key={`${seat.row}${seat.index}`} className="selected-seats">
            {`Row: ${seat.row} Seat: ${seat.index + 1} - ${seat.price} RON`}
          </div>
        ))}
        {selectedSeats.length > 0 && (
          <div>
            Total:{" "}
            {selectedSeats.reduce(function (acc, obj) {
              return acc + Number(obj.price);
            }, 0)}{" "}
            RON
          </div>
        )}
      </div>

      {selectedSeats.length > 0 && <button onClick={() => addTicketsToCart(selectedSeats)}>Add tickets to cart</button>}
      {reselectedSeats.length > 0 && (
        <div className="double-alert">
          <div className="alert-content">
            {reselectedSeats.length === 1
              ? `The seat ${reselectedSeats[0].row}${reselectedSeats[0].index + 1} is already in your cart.`
              : `The seats ${reselectedSeats
                  .map((seat) => `${seat.row}${seat.index + 1}`)
                  .join(", ")} are already in your cart.`}
          </div>
          <button
            className="alert-button"
            onClick={() => {
              setReselectedSeats([]);
            }}
          >
            I understand
          </button>
        </div>
      )}
    </div>
  );
};

export default Theater;
