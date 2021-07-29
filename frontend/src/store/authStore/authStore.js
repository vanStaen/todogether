import { action, makeObservable, observable } from "mobx";

import { deleteLogout } from "./deleteLogout";
import { postLogin } from "./postLogin";

export class AuthStore {
  hasAccess = false;

  constructor() {
    makeObservable(this, {
      login: action,
      logout: action,
      hasAccess: observable,
      setHasAccess: action,
    });
  }

  login = async (email, username, password, remind) => {
    // Call login endpoint
    const resultLogIn = await postLogin(email, username, password, remind);
    if (resultLogIn) {
      this.hasAccess = true;
    }
  };

  logout = async () => {
    // Call logout endpoint
    const resultLogOut = await deleteLogout();
    if (resultLogOut) {
      this.hasAccess = false;
    }
  };

  setHasAccess = (hasAccess) => {
    this.hasAccess = hasAccess;
  };
}

export const authStore = new AuthStore();
