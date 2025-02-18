import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react";

import { Welcome } from "./pages/Welcome/Welcome";
import { Home } from "./pages/Home/Home";
import { NewPassword } from "./pages/NewPassword/NewPassword";
import { authStore } from "./stores/authStore/authStore";
import { userStore } from "./stores/userStore/userStore";
import { EmailVerified } from "./pages/EmailVerified/EmailVerified";
import { consoleGreetings } from "./helpers/consoleGreetings";

import "./App.css";

const App = observer(() => {
  useEffect(() => {
    consoleGreetings();
    authStore.checkAccess();
    authStore.hasAccess && userStore.fetchuserData();
  }, [authStore.hasAccess]);

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
