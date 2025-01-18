import React, { useState } from "react";
import { SettingOutlined, LoadingOutlined } from '@ant-design/icons';

import Logo from "../../../img/todogetherLogo.png";
import { SettingsModal } from "./Settings/SettingsModal";
import { userStore } from "../../../stores/userStore/userStore";

import "./Header.less";

export const Header = () => {
  const [ settingsCatOpened, setSettingsCatOpened] = useState(false);

  return (
    <>
      <SettingsModal settingsCatOpened={settingsCatOpened} setSettingsCatOpened={setSettingsCatOpened} />
      <div className="header">
        <img className="header__logo" src={Logo} alt="logo" />
        <span className="header__title">Todogether</span>{" "}
        <span className="header__motto"> | multiplayer-todolists</span>
        {userStore.categories.length ? 
          <div className="header__settings" onClick={() => setSettingsCatOpened(true)}><SettingOutlined /></div> 
          :<div className="header__settings"><LoadingOutlined /></div>  
        }

      </div>
    </>
  );
};
