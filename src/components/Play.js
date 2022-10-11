import React, { useEffect, useState } from "react";
import Number from "./Number";
import { v4 } from "uuid";

const Play = () => {
  const [numbers, setNumbers] = useState(getNewNumbers());

  const numbersContent = numbers.map(({ key, value, active }) => {
    const numberStyle = {
      backgroundColor: active ? "#59E391" : "#fff",
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

  // console.log(numbers);

  useEffect(() => {
    // if(numbers.every(({active})=> active)){

    // }

    // @ 達成的條件:
    //   1. 所有的按鈕都已被按上
    //   2. 所有被按上的按鈕數字皆相同
    // @ 達成後要做什麼?
    //  - 更換 Roll 按紐變成 Reset Game
    // ! 以下未完成

    // const isAllActive = numbers.every((i) => i.active === true);
    // console.log()
    const values = numbers.map(({ value }) => value);
    // const
    let win = false;
    for (let i = 0; i < values.length; i++) {
      if (values[i + 1] === values[i] && values[i].active === true) {
        win = false;
      }
    }
    if (win) console.log("win");
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
      <button className="roll" onClick={roll}>
        Roll
      </button>
    </div>
  );
};

export default Play;
