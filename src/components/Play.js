import React, { useEffect, useState } from "react";
import Number from "./Number";
import { v4 } from "uuid";

const Play = () => {
  const arr = [];
  const [numbers, setNumbers] = useState(arr);
  const numbersContent = numbers.map(({ value }) => <Number value={value} />);

  // ? 我要如何才能在最初載入的時候就讓 state 保有 10 個數字呢

  // useEffect(() => {
  // }, []);


  for (let i = 1; i <= 10; i++) {
    arr.push({ key: v4(), value: randomIntFromInterval(1, 6), active: false });
  }
  function changeNumber() {
    console.log(1);
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="play">
      <div className="numbers">{numbersContent}</div>
      <button className="roll" onClick={changeNumber}>
        Roll
      </button>
    </div>
  );
};

export default Play;
