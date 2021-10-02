import { action, makeObservable, observable } from "mobx";

import { getUserInfo } from "./getUserInfo";

export class UserStore {
  email = null;
  userName = null;
  avatar = null;
  categories = [];
  emailSettings = [];
  profilSettings = [];

  constructor() {
    makeObservable(this, {
      email: observable,
      userName: observable,
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

  setUserName = (userName) => {
    this.userName = userName;
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
      this.setUserName(userData.userName);
      this.setAvatar(userData.avatar);
      this.setCategories(userData.categories);
      this.setEmailSettings(userData.emailSettings);
      this.setProfilSettings(userData.profilSettings);
    }
  };
}

export const userStore = new UserStore();
