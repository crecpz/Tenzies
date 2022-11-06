import React, { useEffect, useState } from "react";
import Die from "./Die";
import { v4 } from "uuid";

const Play = ({
  tenzies,
  setTenzies,
  setTime,
  setNewRecord,
  setTimerOn,
  isCountdowning,
}) => {
  const [dice, setDice] = useState(getNewDice());

  const dieElements = dice.map(({ key, value, active }) => {
    const dieStyle = {
      color: active ? "rgb(121 130 125)" : "#0B2434",
    };
    return (
      <Die
        key={key}
        value={value}
        dieStyle={dieStyle}
        handleClick={() => dieActive(key)}
      />
    );
  });

  function dieActive(key) {
    setDice((prev) => {
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
    const activeElements = dice.filter(({ active }) => active === true);
    const activeLength = activeElements.length;

    // 檢查是否所有數字都相同(這邊假設所有數字都與第一顆骰子相同)
    let allSameNumber = activeElements.every(
      (i, index, arr) => i.value === arr[0].value
    );

    // 如果全部都相同:
    if (activeLength === dice.length && allSameNumber) {
      setTenzies(true);
    }
  }, [dice]);

  // * 初次載入時，給予 dice state 的初始值
  function getNewDice() {
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
    setDice(getNewDice());
    setNewRecord(false);
  }

  // * 換一批骰子
  function roll() {
    setDice((prevDice) => {
      return prevDice.map((num) => {
        if (num.active) {
          return num;
        } else {
          return { ...num, value: randomIntFromInterval(1, 6) };
        }
      });
    });
  }

  return (
    <>
      <div className={`play ${isCountdowning && "play--disabled"}`}>
        <div className="dice">{dieElements}</div>
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
