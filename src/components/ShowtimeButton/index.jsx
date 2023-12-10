import React from "react";
import ShowtimeTag from "../ShowtimeTag";

const ShowtimeButton = ({ onClick, showtimeID }) => {
  function handleOnClick() {
    onClick(showtimeID);
  }
  // return <button onClick={handleOnClick}>click</button>;
  return (
    <button onClick={handleOnClick}>
      <ShowtimeTag id={showtimeID} />
    </button>
  );
};

export default ShowtimeButton;
