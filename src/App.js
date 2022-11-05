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
  //
  const [newRecord, setNewRecord] = useState(false);
  // 計時器
  let intervalID;

  const { minute, second } = convertTime(time);
  // console.log(timeResult)

  useEffect(() => {
    const highScore =
      JSON.parse(window.localStorage.getItem("tenziesHighScore")) || 0;
    console.log("highScore in 37:", highScore);
    setHighScore(highScore);
  }, []);

  useEffect(() => {
    intervalID = null;
    if (timerOn) {
      intervalID = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalID);
    }
    return () => clearInterval(intervalID);
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
      {newRecord && <Confetti width={width} height={height} gravity={0.1} />}
      <div className="container">
        <div className="tenzies">
          {newRecord ? <h1 className="title">太棒了!創新紀錄!</h1> : ""}

          {/* {newRecord ? "太棒了!創新紀錄!" : ""} */}

          {tenzies ? `本次所花時間:${minute}:${second}` : ""}
          {intro ? (
            <Intro setIntro={setIntro} setTimerOn={setTimerOn} />
          ) : (
            <>
              <ScoreBar time={time} highScore={highScore} />
              <Play
                tenzies={tenzies}
                setTenzies={setTenzies}
                setTime={setTime}
                setTimerOn={setTimerOn}
                setNewRecord={setNewRecord}
                time={time}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
