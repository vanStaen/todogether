import React from "react";
import { authStore } from "../../stores/authStore/authStore";

import "./Home.css";

export const Home = () => {
  return (
    <div>
      <div className="home__container">
        <div className="home__main">
          <div className="home__header">Todogether</div>
        </div>
      </div>
      <div className="home__logout" onClick={authStore.logout}>
        logout
      </div>
    </div>
  );
};
