import "./App.css";
import { useWindowSize } from "@react-hook/window-size";
import Play from "./components/Play";
import { useState,useEffect } from "react";
import Confetti from "react-confetti";
import Intro from "./components/Intro";

function App() {
  // * 當前螢幕寬高
  const [width, height] = useWindowSize();
  // * 儲存目前是否是介紹頁面狀態
  const [intro, setIntro] = useState(true);
  // * 計時器狀態，按下 Start 後開始計時，直到 tenzies === true 的時候才停止
  const [stopWatchOn, setStopWatchOn] = useState(false);
  // * 計時器數值
  const [stopWatchValue, setStopWatchValue] = useState(0);
  // * 最快紀錄
  const [highScore, setHighScore] = useState(0);
  // * 用於儲存目前是否為創新紀錄的狀態
  const [hasNewHeightScore, setHasNewHightScore] = useState(false);
  // * 儲存目前是否已開始倒數
  const [isCountdowning, setIsCountdowning] = useState(false);
  // * 倒數數值
  const [countdownValue, setCountdownValue] = useState(3);

  useEffect(() => {
    // * 倒數計時 3 秒
    let countdownTimer;
    if (isCountdowning) {
      countdownTimer = setInterval(() => {
        setCountdownValue((prevCountdownValue) => prevCountdownValue - 1);
      }, 1000);
    } else {
      clearInterval(countdownTimer);
    }
    return () => clearInterval(countdownTimer);
  }, [isCountdowning]);

  useEffect(() => {
    // 倒數 3 秒到 0 的時候
    if (countdownValue === 0) {
      // 停止倒數
      setIsCountdowning(false);
      // 開始計時
      setStopWatchOn(true);
    }
  }, [countdownValue]);

  useEffect(() => {
    // * 計時器
    let stopWatch;
    if (stopWatchOn) {
      stopWatch = setInterval(() => {
        setStopWatchValue((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(stopWatch);
    }
    return () => clearInterval(stopWatch);
  }, [stopWatchOn]);

  return (
    <div className="app">
      {hasNewHeightScore && (
        <Confetti width={width} height={height} gravity={0.1} />
      )}
      <div className="container">
        <div className="tenzies">
          {intro ? (
            <Intro
              setIntro={setIntro}
              setStopWatchOn={setStopWatchOn}
              setIsCountdowning={setIsCountdowning}
            />
          ) : (
            <Play
              setIntro={setIntro}
              stopWatchValue={stopWatchValue}
              setTime={setStopWatchValue}
              setStopWatchOn={setStopWatchOn}
              highScore={highScore}
              setHighScore={setHighScore}
              hasNewHeightScore={hasNewHeightScore}
              setHasNewHightScore={setHasNewHightScore}
              countdownValue={countdownValue}
              setCountdownValue={setCountdownValue}
              isCountdowning={isCountdowning}
              setIsCountdowning={setIsCountdowning}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
