import React, { useEffect, useState } from "react";
import Die from "./Die";
import { v4 } from "uuid";
import { convertTime } from "../function";

const Play = ({
  setIntro,
  stopWatchValue,
  setTime,
  setStopWatchOn,
  highScore,
  setHighScore,
  hasNewHeightScore,
  setHasNewHightScore,
  countdownValue,
  setCountdownValue,
  isCountdowning,
  setIsCountdowning,
}) => {
  // * 用來表示是否通關
  const [tenzies, setTenzies] = useState(false);
  // * 表示 modal 是否為開啟狀態
  const [modalOpen, setModalOpen] = useState(false);
  // * 計時器轉換成分與秒
  const { minute: currentMinute, second: currentSecond } =
    convertTime(stopWatchValue);
  // * 倒數計時器(3 秒)，轉換成分與秒
  const { minute: highScoreMinute, second: highScoreSecond } =
    convertTime(highScore);

  // * 10 顆骰子資料
  const [dice, setDice] = useState(getNewDice());
  const dieElements = dice.map(({ key, value, active }) => {
    const dieStyle = {
      color: active ? "#5fc0ff" : "#0B2434",
    };
    return (
      <Die
        key={key}
        value={value}
        dieStyle={dieStyle}
        handleClick={(e) => dieActive(e, key)}
      />
    );
  });

  // * 處理骰子按下後的 active
  function dieActive(e, key) {
    e.preventDefault();
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
    const activedDice = dice.filter(({ active }) => active === true);
    const activedLength = activedDice.length;

    // 檢查是否所有骰子都相同(這邊假設所有數字都與第一顆骰子相同)
    let allSameNumber = activedDice.every(
      (i, idx, arr) => i.value === arr[0].value
    );

    // 如果所有骰子都相同，且已經 active 的骰子數量為 10
    if (activedLength === dice.length && allSameNumber) {
      // 通關
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

  // * 回到介紹區
  function backToIntro() {
    resetGame();
    setIntro(true);
    setIsCountdowning(false);
  }

  // * restart
  function handleRestartBtnClick() {
    resetGame();
    // 開始倒數
    setIsCountdowning(true);
  }

  // * playAgain 按鈕
  function handlePlayAgainBtnClick() {
    resetGame();
    // 開始倒數
    setIsCountdowning(true);
    setModalOpen(false);
  }

  // * 重設遊戲
  function resetGame() {
    // 停止計時，目前計時時間恢復成 0
    setTime(0);
    setStopWatchOn(false);
    // countdownValue 恢復成 3
    setCountdownValue(3);
    // tenzies 恢復成 false
    setTenzies(false);
    // 重製 dice active 狀態、重換一批 dice
    resetDice();
    roll();
    // 將新紀錄狀態恢復成 false
    setHasNewHightScore(false);
  }

  // * 重設骰子 active 狀態
  function resetDice() {
    setDice((prevDice) => prevDice.map((die) => ({ ...die, active: false })));
  }

  // * 換一批骰子(數目)
  function roll() {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        if (die.active) {
          return die;
        } else {
          return { ...die, value: randomIntFromInterval(1, 6) };
        }
      });
    });
  }

  // * 獲得 1~6 數字
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    if (tenzies) {
      const highScore =
        JSON.parse(window.localStorage.getItem("tenziesHighScore")) || 0;
      setHighScore(highScore);

      if (highScore === 0 || stopWatchValue < highScore) {
        window.localStorage.setItem(
          "tenziesHighScore",
          JSON.stringify(stopWatchValue)
        );
      }

      if (stopWatchValue < highScore) {
        setHasNewHightScore(true);
      }

      // 開啟 modal
      setModalOpen(true);
      // 停止計時
      setStopWatchOn(false);
    }
  }, [tenzies]);

  return (
    <>
      <div className="tenzies__head">
        <button
          className="btn btn--icon btn--transparent"
          onClick={backToIntro}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <div className="tenzies__timer title--md">
          {isCountdowning && <p className="countdown">{countdownValue}</p>}
          {!isCountdowning && (
            <>
              <span>{currentMinute}</span>
              <span>:</span>
              <span>{currentSecond}</span>
            </>
          )}
        </div>
        <button
          className="btn btn--icon btn--transparent"
          onClick={handleRestartBtnClick}
          disabled={isCountdowning}>
          <i className="fa-solid fa-rotate-right"></i>
        </button>
      </div>
      <div className={`play ${isCountdowning ? "play--disabled" : ""}`}>
        <div className="dice">{dieElements}</div>
        <button
          className="btn btn--normal btn--blue"
          onClick={roll}
          onTouchEnd={(e) => {
            e.preventDefault();
            roll();
          }}>
          Roll
        </button>
        <div className={`overlay ${modalOpen ? "overlay--active" : ""}`}>
          <div className={`modal ${modalOpen ? "modal--active" : ""}`}>
            {hasNewHeightScore ? (
              <p className="modal__title title--md">新紀錄！</p>
            ) : (
              <p className="modal__title title--md">通關！</p>
            )}
            <div className="modal__text-content">
              <p
                className={`modal__text text ${
                  hasNewHeightScore ? "text--red" : ""
                }`}>
                本次紀錄: <span>{currentMinute}</span>:
                <span>{currentSecond}</span>
              </p>
              {highScore !== 0 && (
                <p className="modal__text text">
                  最佳紀錄: <span>{highScoreMinute}</span>:
                  <span>{highScoreSecond}</span>
                </p>
              )}
            </div>
            <button
              className="btn btn--normal btn--blue"
              onClick={handlePlayAgainBtnClick}>
              Play Again!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Play;
