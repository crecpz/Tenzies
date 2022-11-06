# Demo
https://crecpz.github.io/Tenzies-Dice-Game/

# 玩法
<img src="https://user-images.githubusercontent.com/81663340/200179650-5078d1a1-f186-4400-ac9d-89e949e1e11f.gif" width="30%" />

- 用盡可能短的時間讓所有骰子顯示相同數目。
- 點擊骰子來凍結骰子數目。
- 底部的「Roll」按鈕可擲出新的一批骰子。
- 被凍結的骰子數目將不會被更換。
- 保留最佳紀錄(保留通關花費時間最短的一次)。


# 說明 
- 使用 React 製作，此為學習 React 過程中做的小練習。
- 使用 [react-confetti](https://www.npmjs.com/package/react-confetti) 套件加入五彩紙屑效果，並搭配 [@react-hook/window-size](https://www.npmjs.com/package/@react-hook/window-size) 套件來偵測目前瀏覽器視窗，使其能夠在整個視窗中撒下五彩紙屑。
- 最佳紀錄將會存至 localStorage 中。
