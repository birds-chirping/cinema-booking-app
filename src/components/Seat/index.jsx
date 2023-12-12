import React from "react";
import "./style.css";

const Seat = ({ showtimeID, seat }) => {
  const locked = seat.available != true;

  return (
    <div className="seat">
      <input
        key={`${showtimeID}`}
        value={`seat_${seat.row}_${seat.index + 1}`}
        type="checkbox"
        name="seats"
        id={`seat_${seat.row}_${seat.index + 1}`}
        className={`seat-input ${showtimeID}`}
        disabled={locked}
        defaultChecked={locked}
      />
      <label className={`seat-label ${locked ? "locked" : "available"}`} htmlFor={`seat_${seat.row}_${seat.index + 1}`}>
        {seat.row + (seat.index + 1)}
      </label>
    </div>
  );
};

export default Seat;
