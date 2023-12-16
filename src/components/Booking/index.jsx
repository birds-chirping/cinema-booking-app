import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Theater from "../Theater";

const Booking = ({ setAddedTickets, showtime, movie, setTicketsInCart }) => {
  const selectedSeatsDiv = useRef();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reselectedSeats, setReselectedSeats] = useState([]);

  useEffect(() => {
    setSelectedSeats([]);
  }, [showtime]);

  const handleSeatClick = (row, index, checked) => {
    const seat = {
      seatID: `${showtime.timestamp}_${movie.id}_${row}${index}`,
      row: row,
      index: index,
      price: movie.price,
      timestamp: showtime.timestamp,
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
    } else if (movieTickets.length > 0) {
      window.localStorage.setItem("moviecart", JSON.stringify(movieTickets));
      setAddedTickets((prev) => prev + 1);
      setTicketsInCart(movieTickets);
    }
  };

  return (
    <div className="theater-wrapper">
      <Theater showtime={showtime} editMode={false} callback={handleSeatClick} />

      <div ref={selectedSeatsDiv} className="selected-seats-wrapper">
        {selectedSeats.map((seat) => (
          <div key={`${seat.row}${seat.index}`} className="selected-seats">
            {`Row: ${seat.row} Seat: ${seat.index + 1} - ${seat.price} RON`}
          </div>
        ))}
        {selectedSeats.length > 0 && (
          <div>
            Total:{" "}
            {selectedSeats
              .reduce(function (acc, obj) {
                return acc + Number(obj.price);
              }, 0)
              .toFixed(2)}{" "}
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

export default Booking;