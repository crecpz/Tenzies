const Number = ({ value, handleClick, numberStyle }) => {
  let diceType;
  
  switch (value) {
    case 1:
      diceType = "one";
      break;
    case 2:
      diceType = "two";
      break;
    case 3:
      diceType = "three";
      break;
    case 4:
      diceType = "four";
      break;
    case 5:
      diceType = "five";
      break;
    case 6:
      diceType = "six";
      break;
  }

  return (
    <button className="number" onClick={handleClick} style={numberStyle}>
      <i className={`fa-solid fa-dice-${diceType}`}></i>
    </button>
  );
};

export default Number;
