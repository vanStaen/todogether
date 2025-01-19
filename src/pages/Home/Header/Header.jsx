import React, { useState } from "react";
import { observer } from "mobx-react";
import { SettingOutlined, LoadingOutlined, UndoOutlined } from '@ant-design/icons';
import { Dropdown, Tag, Space } from "antd";

import Logo from "../../../img/todogetherLogo.png";
import { SettingsModal } from "./Settings/SettingsModal";
import { userStore } from "../../../stores/userStore/userStore";
import { getMenuCategories } from "../../../pages/Home/ListRow/Categories";

import "./Header.less";
import { settingsStore } from "../../../stores/settingsStore/settingsStore";

export const Header = observer(() => {
  const [ settingsCatOpened, setSettingsCatOpened] = useState(false);

  const items = getMenuCategories("filter");

  const handleDeleteCategorieFilter = (e) => {
    e.stopPropagation();
    settingsStore.setCategorieFilter(null);
  }

  return (
    <>
      <SettingsModal settingsCatOpened={settingsCatOpened} setSettingsCatOpened={setSettingsCatOpened} />
      <div className="header">
        <img className="header__logo" src={Logo} alt="logo" />
        <span className="header__title">Todogether</span>{" "}
        <span className="header__motto"> | multiplayer-todolists</span>
        <div className="header__rightSection">
          <Space>
            <Dropdown
              menu={{
                items,
              }}
              trigger={['click']}
            >
              <div onClick={(e) => e.stopPropagation()}>
                { 
                  settingsStore.categorieFilter ? 
                    <Space>
                      <Tag color="#e6e4dd" onClick={handleDeleteCategorieFilter}><UndoOutlined style={{color: 'rgba(0,0,0,.25)'}}/></Tag>
                      <Tag color={settingsStore.categorieFilter.color}>{settingsStore.categorieFilter.title}</Tag>
                    </ Space>
                    :
                    <Tag color="#e6e4dd" className={"header__noSelectionTag"}>All lists</Tag>
                }
              </div>
            </Dropdown>
            {
            userStore.categories.length ? 
              <div className="header__settings" onClick={() => setSettingsCatOpened(true)}><SettingOutlined /></div> 
              :<div className="header__settings"><LoadingOutlined /></div>  
            }
          </Space>
        </div>
       
      </div>
    </>
  );
});
