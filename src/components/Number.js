import React from "react";

const Number = ({ value, handleClick }) => {
  return (
    <button className="number" onClick={handleClick} >
      {value}
    </button>
  );
};

export default Number;
