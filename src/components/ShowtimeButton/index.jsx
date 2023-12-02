import React from "react";

const ShowtimeButton = ({ onClick, showtimeID }) => {
  function handleOnClick() {
    onClick(showtimeID);
  }
  return <button onClick={handleOnClick}>click</button>;
};

export default ShowtimeButton;
