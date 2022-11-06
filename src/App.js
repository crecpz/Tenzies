import "./App.css";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size";
import Play from "./components/Play";
import { useState } from "react";
import Confetti from "react-confetti";
import ScoreBar from "./components/ScoreBar";
import Intro from "./components/Intro";
import { useEffect } from "react";
import { convertTime } from "./function";
import Modal from "./components/Modal";
import Countdown from "./components/Countdown";

function App() {
  const [width, height] = useWindowSize();
  // 儲存目前是否是介紹頁面狀態，一旦按下 Start 按鈕後，intro 將變為 false，除非重新整理，否則將一直維持 false
  const [intro, setIntro] = useState(true);
  // 計時器狀態，按下 Start 後開始計時，直到 tenzies === true 的時候才停止
  const [timerOn, setTimerOn] = useState(false);
  // 計時器數值
  const [time, setTime] = useState(0);
  // 最快紀錄
  const [highScore, setHighScore] = useState(0);
  // 用於儲存目前是否全部數字皆相同
  const [tenzies, setTenzies] = useState(false);
  // 用於儲存目前是否為創新紀錄的狀態
  const [newRecord, setNewRecord] = useState(false);
  // 計時器
  let stopWatch;
  // 倒數計時 3 秒
  let countdown;
  const [isCountdowning, setIsCountdowning] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);

  // 當前計時時間(此為換算後的結果)
  const { minute: currentMinute, second: currentSecond } = convertTime(time);

  useEffect(() => {
    const highScore =
      JSON.parse(window.localStorage.getItem("tenziesHighScore")) || 0;
    setHighScore(highScore);
  }, []);

  useEffect(() => {
    countdown = null;

    if (isCountdowning) {
      countdown = setInterval(() => {
        setCountdownValue((prevCountdownValue) => prevCountdownValue - 1);
        if (countdownValue === 0) {
          // setCountdownValue("Go!")
        }
      }, 1000);
    } else {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [isCountdowning]);

  if (countdownValue === 0) {
    setCountdownValue("Go!");
    setIsCountdowning(false);
    setTimerOn(true);
  }

  useEffect(() => {
    stopWatch = null;
    if (timerOn) {
      stopWatch = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(stopWatch);
    }
    return () => clearInterval(stopWatch);
  }, [timerOn]);

  useEffect(() => {
    // tenzies 一旦變成 true，則將 timerOn 設為 false
    if (tenzies) {
      setTimerOn(false);

      if (highScore === 0 || (highScore !== 0 && time < highScore)) {
        setHighScore(time);
        window.localStorage.setItem("tenziesHighScore", JSON.stringify(time));
      }

      if (time < highScore) {
        setNewRecord(true);
      }
    }
  }, [tenzies]);

  return (
    <div className="app">
      <Modal tenzies={tenzies} highScore={highScore} time={time} />
      {newRecord && <Confetti width={width} height={height} gravity={0.1} />}
      <div className="container">
        <div className="tenzies">
          <div className="tenzies__timer">
            {!intro && isCountdowning && (
              <Countdown countdownValue={countdownValue} />
            )}
            {!intro && !isCountdowning && (
              <>
                <span>{currentMinute}</span>
                <span>:</span>
                <span>{currentSecond}</span>
              </>
            )}
          </div>

          {intro ? (
            <Intro
              setIntro={setIntro}
              setTimerOn={setTimerOn}
              setIsCountdowning={setIsCountdowning}
            />
          ) : (
            <>
              <Play
                tenzies={tenzies}
                setTenzies={setTenzies}
                setTime={setTime}
                setTimerOn={setTimerOn}
                setNewRecord={setNewRecord}
                time={time}
                isCountdowning={isCountdowning}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
