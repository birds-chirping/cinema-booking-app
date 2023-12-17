import React from "react";
import "./style.css";

const Seat = ({ showtimeID, seat, onSeatClick, editMode }) => {
  const booked = seat.available != true;

  return (
    <div className="seat">
      <input
        key={`${showtimeID}`}
        value={`seat_${seat.row}_${seat.index + 1}`}
        type="checkbox"
        name="seats"
        id={`seat_${seat.row}_${seat.index + 1}`}
        className={`seat-input ${showtimeID}`}
        disabled={editMode ? false : booked}
        defaultChecked={booked}
        onChange={(e) => onSeatClick(seat.row, seat.index, e.target.checked, booked)}
      />
      <label
        className={`seat-label ${booked ? (editMode ? "booked" : "locked") : "available"}`}
        htmlFor={`seat_${seat.row}_${seat.index + 1}`}
      >
        {seat.row + (seat.index + 1)}
      </label>
    </div>
  );
};

export default Seat;
