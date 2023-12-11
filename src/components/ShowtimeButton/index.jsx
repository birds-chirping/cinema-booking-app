import React from "react";

const ShowtimeButton = ({ onClick, showtimeID, showtimeDate }) => {
  function handleOnClick() {
    onClick(showtimeID);
  }

  return (
    <button onClick={handleOnClick}>
      <div>
        <div>
          {showtimeDate.getDate()}.{showtimeDate.getMonth() + 1}
        </div>{" "}
        <div>
          {showtimeDate.getHours()}:{showtimeDate.getMinutes()}
        </div>
      </div>
    </button>
  );
};

export default ShowtimeButton;
