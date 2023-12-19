import React from "react";
import "./style.css";
import Seat from "../Seat";

const Theater = ({ showtime, editMode, callback }) => {
  return (
    showtime && (
      <div className="theater-wrapper">
        <div className="screen-wrapper">
          <div className="screen">SCREEN</div>
        </div>
        <div className="theater">
          {/* {showtime.id}  */}
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
                      onSeatClick={callback}
                      editMode={editMode}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Theater;
