import React from "react";

import Logo from "../../../img/todogetherLogo.png";

import "./Header.css";

export const Header = () => {
  return (
    <div className="header">
      <img className="header__logo" src={Logo} alt="logo" />
      <span className="header__title">Todogether.com</span>{" "}
      <span className="header__motto"> | multiplayer-todolists</span>
    </div>
  );
};
