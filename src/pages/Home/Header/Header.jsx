import React, { useState } from "react";
import { observer } from "mobx-react";
import { SettingOutlined, LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import { Dropdown, Tag, Space } from "antd";

import Logo from "../../../img/todogetherLogo.png";
import { SettingsModal } from "./Settings/SettingsModal";
import { userStore } from "../../../stores/userStore/userStore";
import { useMenuCategories } from "../../../pages/Home/ListRow/Categories";

import "./Header.less";
import { settingsStore } from "../../../stores/settingsStore/settingsStore";
import { CUR } from "aws-sdk";

export const Header = observer(() => {
  const [ settingsCatOpened, setSettingsCatOpened] = useState(false);

  const items = useMenuCategories("filter");

  if (settingsStore.categorieFilter) {
    items.push(
      {
        key: 'reset',
        label: (
            <div onClick={() => settingsStore.setCategorieFilter(null)} className="menuItemCategorie__container">
                <div className="menuItemCategorie__showAllCat">
                    Show all tasks
                </div>
            </div>
        ),
    }
    )
  }

  const tagStyling = {
    marginTop: 5,
    paddingTop: 2,
    paddingRight: 7,
    paddingBottom: 2,
    paddingLeft: 7,
    fontSize: 14,
    cursor: 'pointer',
  };

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
              placement="bottomRight"
              trigger={['click']}
            >
              <div onClick={(e) => e.stopPropagation()}>
                { 
                  settingsStore.categorieFilter ? 
                      <Tag style={tagStyling} color={settingsStore.categorieFilter.color}>{settingsStore.categorieFilter.title}</Tag>
                    :
                    <Tag style={tagStyling} color="#e6e4dd" className={"header__noSelectionTag"}>All lists</Tag>
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
