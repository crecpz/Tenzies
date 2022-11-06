import { convertTime } from "../function";

const Modal = ({ tenzies, highScore, time }) => {
  const { minute: currentMinute, second: currentSecond } = convertTime(time);
  const { minute: highScoreMinute, second: highScoreSecond } =
    convertTime(highScore);
  // console.log('highScore:', highScore)
  // console.log(first)

  return (
    // <div class="overlay overlay--active">
    <div className={`overlay ${tenzies ? "overlay--active" : ""}`}>
      <div className={`modal ${tenzies ? "modal--active" : ""}`}>
        <p className="modal__title title--md">通關！</p>
        <div className="modal__text-content">
          <p className="modal__text text">
            本次紀錄: <span>{currentMinute}</span>:<span>{currentSecond}</span>
          </p>
          {highScore && (
            <p className="modal__text text">
              最快紀錄: <span>{highScoreMinute}</span>:
              <span>{highScoreSecond}</span>
            </p>
          )}

          {/* <p className="modal__text">太棒了！你創了新紀錄！</p> */}
        </div>
        <button className="btn btn--blue">Play Again</button>
      </div>
    </div>
  );
};

export default Modal;
