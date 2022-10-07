import React from "react";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">Tenzies</h1>
      <p className="header__description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
    </header>
  );
};

export default Header;