import React from "react";

const Intro = ({setIntro, setTimerOn}) => {

  function startPlay (){
    setIntro(false);
    setTimerOn(true);
  }

  return (
    <>
    <h1 className="title">Tenzies</h1>
      <ul className="intro-list description">
        <li className="intro-list__item">用最快速度讓所有骰子顯示相同數目。</li>
        <li className="intro-list__item">點擊骰子來凍結骰子數目，被凍結的骰子數目將會被固定。</li>
        <li className="intro-list__item">底部的「Roll」按鈕可以更換一批骰子。</li>
        <li className="intro-list__item">現在就按下 Start 開始挑戰吧！</li>
      </ul>

      <button className="btn btn--blue" onClick={()=> startPlay()}>Start</button>
    </>
  );
};

export default Intro;

// - 用最快的速度讓所有的骰子顯示相同數目
// - 透過底部的 「Roll」 按鈕來更換新的一批骰子
// - 點擊骰子來凍結骰子數目，被凍結的數目不會因為「Roll」而改變

// 按下 Start 開始挑戰!
