import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react";

import { Welcome } from "./pages/Welcome/Welcome";
import { Home } from "./pages/Home/Home";
import { NewPassword } from "./pages/NewPassword/NewPassword";
import { authStore } from "./stores/authStore/authStore";
import { EmailVerified } from "./pages/EmailVerified/EmailVerified";

import "./App.css";

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const defineVariableHeight = () => {
  /* Trick to get correct 100vh on mobile */
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

window.addEventListener("resize", defineVariableHeight);

const App = observer(() => {
  useEffect(() => {
    authStore.checkAccess();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/recoverpwd/:key" element={<NewPassword />} />
          <Route path="/emailverify/:verifyCode" element={<EmailVerified />} />
          <Route path="/service">"service page"</Route>
          <Route path="/privacy">"privacy page"</Route>
          <Route path="/settings">"settings page"</Route>
          {authStore.hasAccess ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Welcome showLogin={true} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
});

export default App;
