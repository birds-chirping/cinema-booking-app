import React, { useRef, useState } from "react";
import Seat from "../Seat";
import "./style.css";

const Theater = ({ showtime }) => {
  const selectedSeatsDiv = useRef();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, index, checked) => {
    const seat = { row: row, index: index };
    if (checked) {
      setSelectedSeats((prev) => [...prev, seat]);
    } else {
      setSelectedSeats((prev) => prev.filter((prevSeat) => prevSeat.index != seat.index || prevSeat.row != seat.row));
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
                    onSeatClick={(row, index, checked) => handleSeatClick(row, index, checked)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div ref={selectedSeatsDiv} className="selected-seats-wrapper">
        {selectedSeats.map((seat) => (
          <div key={`${seat.row}${seat.index}`} className="selected-seats">{`Row: ${seat.row} Seat: ${
            seat.index + 1
          }`}</div>
        ))}
      </div>
      {selectedSeats.length > 0 && <button>Add tickets to cart</button>}
    </div>
  );
};

export default Theater;
