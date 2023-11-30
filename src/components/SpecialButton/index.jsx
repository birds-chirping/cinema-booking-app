import React from "react";

const SpecialButton = ({ onClick, interval, theaterLayout }) => {
  function handleOnClick() {
    onClick(interval, theaterLayout);
  }
  return <button onClick={handleOnClick}>click</button>;
};

export default SpecialButton;
