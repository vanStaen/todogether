import React from "react";
import { UnorderedListOutlined, EditOutlined } from "@ant-design/icons";

import Logo from "../../../img/todogetherLogo.png";

import "./Header.css";

export const Header = () => {
  return (
      <div className="header">
          <img className="header__Logo" src={Logo} alt="logo" />
            Todogether.com <span className="header__motto"> | multiplayer-todolists</span>
      </div>
  );
};
