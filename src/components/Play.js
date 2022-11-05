import React, { useEffect, useState } from "react";
import Number from "./Number";
import { v4 } from "uuid";
import { convertTime } from "../function";

const Play = ({ tenzies, setTenzies, time, setTime, setNewRecord, setTimerOn }) => {
  const [numbers, setNumbers] = useState(getNewNumbers());

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

    // 檢查是否所有數字都相同(這邊假設所有數字都與第一顆骰子相同)
    let allSameNumber = activeElements.every(
      (i, index, arr) => i.value === arr[0].value
    );

    // 如果全部都相同:
    if (activeLength === numbers.length && allSameNumber) {
      setTenzies(true);
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

  // * 重啟遊戲
  function resetGame() {
    setTenzies(false);
    setTime(0);
    setTimerOn(true);
    setNumbers(getNewNumbers());
    setNewRecord(false);
  }

  // * 換一批骰子
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

  // const {minute, second} = convertTime(time);
  // console.log(timeResult)

  return (
    <>
      <div className="play">
        {/* {tenzies ? `本次所花時間:${1}`: ""} */}
        <div className="numbers">{numbersContent}</div>
        {tenzies ? (
          <button className="btn btn--blue" onClick={resetGame}>
            Play Again
            {/* Reset Game */}
          </button>
        ) : (
          <button className="btn btn--roll" onClick={roll}>
            <i className="fa-solid fa-rotate-right"></i> Roll
          </button>
        )}
      </div>
    </>
  );
};

export default Play;
