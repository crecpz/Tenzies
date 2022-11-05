import React, { useEffect, useState } from "react";
import Number from "./Number";
import { v4 } from "uuid";

const Play = () => {
  const [numbers, setNumbers] = useState(getNewNumbers());
  const [reset, setReset] = useState(false);

  const numbersContent = numbers.map(({ key, value, active }) => {
    const numberStyle = {
      color: active ? "rgb(121 130 125)" : "#0B2434",
    };

    return (
      <Number
        key={key}
        value={value}
        numberStyle={numberStyle}
        handleClick={() => numberActive(key)}
      />
    );
  });

  function numberActive(key) {
    setNumbers((prev) => {
      return prev.map((num) => {
        if (num.key === key) {
          return { ...num, active: !num.active };
        } else {
          return num;
        }
      });
    });
  }

  useEffect(() => {
    const activeElements = numbers.filter(({ active }) => active === true);
    const activeLength = activeElements.length;
    let allSameNumber = activeElements.every(
      (i, index, arr) => i.value === arr[0].value
    );

    if (activeLength === numbers.length && allSameNumber) {
      setReset(true);
    }
  }, [numbers]);

  // * 初次載入時，給予 numbers state 的初始值
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

  // * 獲得 1~6 數字
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function resetGame() {
    setReset(false);
    setNumbers(getNewNumbers());
  }

  function roll() {
    setNumbers((prevNumbers) => {
      return prevNumbers.map((num) => {
        if (num.active) {
          return num;
        } else {
          return { ...num, value: randomIntFromInterval(1, 6) };
        }
      });
    });
  }

  return (
    <div className="play">
      <div className="numbers">{numbersContent}</div>

      {reset ? (
        <button className="btn" onClick={resetGame}>
          Reset Game
        </button>
      ) : (
        <button className="btn" onClick={roll}>
          Roll
        </button>
      )}
    </div>
  );
};

export default Play;
