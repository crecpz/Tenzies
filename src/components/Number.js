import React from "react";

const Number = ({ value, handleClick, numberStyle }) => {
  return (
    <button className="number" onClick={handleClick} style={numberStyle}>
      {value}
    </button>
  );
};

export default Number;