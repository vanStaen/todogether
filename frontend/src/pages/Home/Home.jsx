import React from "react";
import { authStore } from "../../stores/authStore/authStore";

import "./Home.css";

export const Home = () => {
  return (
    <div>
      <div className="thumbsup">U did it</div>
      <div className="home__logout" onClick={authStore.logout}>
        logout
      </div>
    </div>
  );
};
