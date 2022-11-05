import { convertTime } from "../function";

const ScoreBar = ({ time, highScore }) => {
  // 最高紀錄時間(此為換算後的結果)
  const { minute: highScoreMinute, second: highScoreSecond } = convertTime(highScore);
  // 當前時間(此為換算後的結果)
  const { minute: currentMinute, second: currentSecond } = convertTime(time);

  


  return (
    <div className="score-bar">
      <div className="score-bar__fastest">
        最快紀錄: <div>{highScoreMinute}</div>:<div>{highScoreSecond}</div>
      </div>
      <div className="score-bar__time">
        <div>{currentMinute}</div>:<div>{currentSecond}</div>
      </div>
    </div>
  );
};

export default ScoreBar;
