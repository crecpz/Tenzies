import React, { useEffect, useState } from "react";
import Number from "./Number";
import { v4 } from "uuid";


// ! 至少先讓要 active 的對象先亮起來

const Play = () => {
  const [numbers, setNumbers] = useState(getNewNumbers());

  const numberStyle = {
    // backgroundColor:  active ? "#59E391" : "#fff",
    backgroundColor: "#59E391",
  };

  const numbersContent = numbers.map(({ key, value, active }) => (
    <Number
      value={value}
      style={numberStyle}
      handleClick={() => numberActive(key)}
    />
  ));

  function numberActive(key) {


    // setNumbers((prev) => {
    //   const activeTarget = prev.find((number) => number.key === key);
    //   activeTarget.active = !activeTarget.active;
    //   return activeTarget.active;
    // });
  }

  // useEffect(() => {
  // }, []);

  function getNewNumbers() {
    const arr = [];
    for (let i = 1; i <= 10; i++) {
      arr.push({
        key: v4(),
        value: randomIntFromInterval(1, 6),
        active: false,
      });
    }
    return arr;
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="play">
      <div className="numbers">{numbersContent}</div>
      <button className="roll" onClick={getNewNumbers}>
        Roll
      </button>
    </div>
  );
};

export default Play;
