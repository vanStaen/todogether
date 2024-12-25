import { action, makeObservable, observable } from "mobx";

import { getUserInfo } from "./getUserInfo.js";
import defaultEmailSettings from "./defaultEmailSettings.json";
import defaultProfilSettings from "./defaultProfilSettings.json";

export class UserStore {
  email = null;
  username = null;
  avatar = null;
  categories = [];
  emailSettings = null;
  profilSettings = null;

  constructor() {
    makeObservable(this, {
      email: observable,
      username: observable,
      avatar: observable,
      categories: observable,
      emailSettings: observable,
      profilSettings: observable,
      setEmail: action,
      setUserName: action,
      setAvatar: action,
      setCategories: action,
      setEmailSettings: action,
      setProfilSettings: action,
      fetchuserData: action,
    });
  }

  setEmail = (email) => {
    this.email = email;
  };

  setUserName = (username) => {
    this.username = username;
  };

  setAvatar = (avatar) => {
    this.avatar = avatar;
  };

  setCategories = (categories) => {
    this.categories = categories;
  };
 
  setEmailSettings = (emailSettings) => {
    this.emailSettings = emailSettings;
  };

  setProfilSettings = (profilSettings) => {
    this.profilSettings = profilSettings;
  };

  fetchuserData = async () => {
    const userData = await getUserInfo();
    if (userData) {
      this.setEmail(userData.email);
      this.setUserName(userData.username);
      this.setAvatar(userData.avatar);
      this.setCategories(userData.categories);

      if (userData.emailSettings === null || userData.emailSettings === "{}") {
        this.setEmailSettings(defaultEmailSettings);
      } else {
        this.setEmailSettings(userData.emailSettings);
      }

      if (userData.profilSettings === null || userData.profilSettings === "{}") {
        this.setProfilSettings(defaultProfilSettings);
      } else {
        this.setProfilSettings(userData.profilSettings);
      }

    }
  };
}

export const userStore = new UserStore();
