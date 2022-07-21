import React from "react";

import { Header } from "./Header/Header";
import { ListHeader } from "./ListHeader/ListHeader";
import { ListRow } from "./listRow/listRow";

import "./Home.css";

export const Home = () => {
  return (
    <div>
      <div className="home__container">
      <Header/>
        <div className="home__main">
          <ListHeader/>
          <ListRow name="fist row" completed={true} selected={true}/>
          <ListRow name="second row" completed={true} selected={false}/>
          <ListRow name="third row" completed={false} selected={true}/>
          <ListRow name="fourth row" completed={true} selected={false}/>
          <ListRow name="fifth row" completed={false} selected={false}/>
        </div>
      </div>
    </div>
  );
};
