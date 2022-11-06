const Intro = ({ setIntro, setIsCountdowning }) => {
  function startGame() {
    setIntro(false);
    setIsCountdowning(true);
  }

  return (
    <>
      <h1 className="title">Tenzies</h1>
      <ul className="intro-list text">
        <li className="intro-list__item">
          用最短的時間讓所有骰子顯示相同數目。
        </li>
        <li className="intro-list__item">點擊骰子來凍結骰子數目。</li>
        <li className="intro-list__item">
          底部的「Roll」按鈕可擲出新的一批骰子。
        </li>
        <li className="intro-list__item">被凍結的骰子數目將不會被更換。</li>
        <li className="intro-list__item">現在就按下 Start 開始挑戰吧！</li>
      </ul>
      <button className="btn btn--normal btn--blue" onClick={() => startGame()}>
        Start
      </button>
    </>
  );
};

export default Intro;
