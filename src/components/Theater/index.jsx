import React from "react";
import Seat from "../Seat";
import "./style.css";

const Theater = ({ data }) => {
  return (
    <>
      <div>Interval: {data.interval}</div>
      <div className="screen">Screen</div>
      <div className="theater">
        {data.theaterLayout.map((row) => {
          return (
            <div className="theater-row" key={row.row}>
              <div className="row-tag">{row.row}</div>
              {row.seats.map((seat, index) => {
                return <Seat key={index} row={row.row} seat={index + 1} />;
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Theater;
