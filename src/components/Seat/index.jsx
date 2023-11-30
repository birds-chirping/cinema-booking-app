import React from "react";
import "./style.css";

const Seat = ({ row, seat }) => {
  return <div className="seat">{row + seat}</div>;
};

export default Seat;
