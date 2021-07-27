import { action, makeObservable, observable } from "mobx";

import { getUserInfo } from "./getUserInfo";

export class UserStore {
  email = null;
  infos = null;
  name = "there";
  username = null;
  isAdmin = false;

  constructor() {
    makeObservable(this, {
      fetchuserData: action,
      setEmail: action,
      email: observable,
      setInfos: action,
      infos: observable,
      setName: action,
      name: observable,
      setUsername: action,
      username: observable,
      isAdmin: observable,
      setIsAdmin: action,
    });
  }

  setEmail = (email) => {
    this.email = email;
  };

  setInfos = (infos) => {
    this.infos = infos;
  };

  setName = (name) => {
    this.name = name;
  };

  setUsername = (username) => {
    this.username = username;
  };

  setIsAdmin = (isAdmin) => {
    this.isAdmin = isAdmin;
  };

  fetchuserData = async () => {
    const userData = await getUserInfo();
    if (userData) {
      userStore.setEmail(userData.email);
      userStore.setInfos(userData.infos);
      userStore.setName(userData.name);
      userStore.setUsername(userData.username);
    }
  };
}

export const userStore = new UserStore();
