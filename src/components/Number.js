const Number = ({ value, handleClick, numberStyle }) => {
  let dice;
  switch (value) {
    case 1:
      dice = <i className="fa-solid fa-dice-one"></i>;
      break;
    case 2:
      dice = <i className="fa-solid fa-dice-two"></i>;
      break;
    case 3:
      dice = <i className="fa-solid fa-dice-three"></i>;
      break;
    case 4:
      dice = <i className="fa-solid fa-dice-four"></i>;
      break;
    case 5:
      dice = <i className="fa-solid fa-dice-five"></i>;
      break;
    case 6:
      dice = <i className="fa-solid fa-dice-six"></i>;
      break;
  }

  return (
    <button className="number" onClick={handleClick} style={numberStyle}>
      {dice}
    </button>
  );
};

export default Number;
