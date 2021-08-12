import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { observer } from "mobx-react";

import { Welcome } from "./pages/Welcome/Welcome";
import { NewPassword } from "./pages/NewPassword/NewPassword";
import { authStore } from "./stores/authStore/authStore";
import { EmailVerified } from "./pages/EmailVerified/EmailVerified";

import './App.css';

const App = observer(() => {
  useEffect(() => {
    authStore.checkAccess();
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/recoverpwd/:key" component={NewPassword} />
          <Route path="/emailverify/:verifyCode" component={EmailVerified} />
          <Route path="/service">"service page"</Route>
          <Route path="/privacy">"privacy page"</Route>
          <Route path="/settings">"settings page"</Route>
          {/*authStore.hasAccess && <Route path="/profil" component={Profil} />*/}
          <Route path="/" exact>
            {authStore.hasAccess ? "YOU ARE IN" : <Welcome showLogin={true} />}
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
});

export default App;
