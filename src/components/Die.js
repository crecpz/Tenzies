const Die = ({ value, handleClick, dieStyle }) => {
  let dieType;

  switch (value) {
    case 1:
      dieType = "one";
      break;
    case 2:
      dieType = "two";
      break;
    case 3:
      dieType = "three";
      break;
    case 4:
      dieType = "four";
      break;
    case 5:
      dieType = "five";
      break;
    case 6:
      dieType = "six";
      break;
  }

  return (
    <button
      className="die"
      onClick={handleClick}
      onTouchEnd={handleClick}
      style={dieStyle}>
      <i className={`fa-solid fa-dice-${dieType}`}></i>
    </button>
  );
};

export default Die;
