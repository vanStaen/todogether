import { action, makeObservable, observable } from "mobx";

import { getUserInfo } from "./getUserInfo.js";
import defaultEmailSettings from "./defaultEmailSettings.json";
import defaultProfilSettings from "./defaultProfilSettings.json";
import { getUserCategories } from "./getUserCategories.js";
import { taskStore } from "../taskStore/taskStore.js";

export class UserStore {
  email = null;
  username = null;
  avatar = null;
  categories = [];
  categoriesId = [];
  emailSettings = null;
  profilSettings = null;
  joinedDate = null;

  constructor() {
    makeObservable(this, {
      email: observable,
      username: observable,
      avatar: observable,
      categories: observable,
      categoriesId: observable,
      emailSettings: observable,
      profilSettings: observable,
      joinedDate: observable,
      setEmail: action,
      setUserName: action,
      setAvatar: action,
      setCategories: action,
      setCategoriesId: action,
      setEmailSettings: action,
      setProfilSettings: action,
      setJoinedDate: action,
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

  setCategoriesId = (categoriesId) => {
    this.categoriesId = categoriesId;
  };

  setEmailSettings = (emailSettings) => {
    this.emailSettings = emailSettings;
  };

  setProfilSettings = (profilSettings) => {
    this.profilSettings = profilSettings;
  };

  setJoinedDate = (joinedDate) => {
    this.joinedDate = joinedDate;
  };


  fetchuserData = async () => {
    const userData = await getUserInfo();
    const userCategories = await getUserCategories();
    if (userData) {
      this.setEmail(userData.email);
      this.setUserName(userData.username);
      this.setAvatar(userData.avatar);
      this.setJoinedDate(new Date(parseInt(userData.createdAt)));

      if (userData.emailSettings === null || userData.emailSettings === "{}") {
        this.setEmailSettings(defaultEmailSettings);
      } else {
        this.setEmailSettings(userData.emailSettings);
      }

      if (userData.profilSettings === null || userData.profilSettings === "{}") {
        this.setProfilSettings(defaultProfilSettings);
      } else {
        this.setProfilSettings(userData.profilSettings);
      }
    }
    if (userCategories) {
      this.setCategories(userCategories);
      const catIds = userCategories.map(cat => parseInt(cat.id));
      this.setCategoriesId(catIds);
      taskStore.fetchTasks(catIds);
    }
  };
}

export const userStore = new UserStore();
