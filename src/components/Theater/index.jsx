import React from "react";
import Seat from "../Seat";
import "./style.css";

const Theater = ({ showtime }) => {
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
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Theater;
