import React from "react";
import { UnorderedListOutlined, EditOutlined } from "@ant-design/icons";

import Logo from "../../img/todogetherLogo.png";

import "./Home.css";

export const Home = () => {
  return (
    <div>
      <div className="home__container">
      <div className="home__header">
          <img className="home__Logo" src={Logo} alt="logo" />
            Todogether.com 
      </div>
        <div className="home__main">
          <div className="home__listHeader home__rowNoBar">
            <div className="home__rowLogo">
              <UnorderedListOutlined />
            </div>
            My shared todolist
          </div>
          <div className="home__row home__rowNoBar">
            <div className="home__rowLogo">
              <input type="checkbox" checked className="home__checkbox" />
            </div>
            First row
          </div>
          <div className="home__row home__rowGoldBar">
            <div className="home__rowLogo">
              <input type="checkbox" className="home__checkbox" />
            </div>
            Second row
          </div>
          <div className="home__row home__rowGoldBar">
            <div className="home__rowLogo">
              <input type="checkbox" className="home__checkbox" />
            </div>
            Third row
          </div>
          <div className="home__row home__rowNoBar">
            <div className="home__rowLogo">
              <input type="checkbox" checked className="home__checkbox" />
            </div>
            fourth row
          </div><div className="home__row home__rowNoBar">
            <div className="home__rowLogo">
              <input type="checkbox" checked className="home__checkbox" />
            </div>
            fifth row
          </div>
        </div>
       {/*<div className="home__logout" onClick={authStore.logout}>
          logout
        </div>*/}
      </div>
    </div>
  );
};
