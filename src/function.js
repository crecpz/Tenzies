  // * 轉換時間格式
  export function convertTime(sec) {
    let minute = Math.floor(sec / 60);
    let second = sec % 60;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return { minute, second };
  }