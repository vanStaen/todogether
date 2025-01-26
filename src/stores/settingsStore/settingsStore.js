import { action, makeObservable, observable } from "mobx";
import Cookies from 'universal-cookie';
import { getAllUsers } from "./getAllUsers.js";

const cookies = new Cookies();

export class SettingsStore {
  showCompleted = cookies.get("showCompleted") || false;
  categorieFilter = cookies.get("categorieFilter") || null;
  allUsers = null;

  constructor() {
    makeObservable(this, {
      showCompleted: observable,
      setShowCompleted: action,
      categorieFilter: observable,
      setCategorieFilter: action,
      allUsers: observable,
      setAllUsers: action,
      fetchAllUsers: action,
    });
  }

  setShowCompleted = (showCompleted) => {
    this.showCompleted = showCompleted;
    cookies.set("showCompleted", showCompleted, { path: "/" });
  };

  setCategorieFilter = (categorieFilter) => {
    this.categorieFilter = categorieFilter;
    cookies.set("categorieFilter", categorieFilter, { path: "/" });
  };

  setAllUsers = (allUsers) => {
    this.allUsers = allUsers;
  };

  fetchAllUsers = async () => {
    const usersData = await getAllUsers();
    if (usersData) {
      this.setAllUsers(usersData);
    }
  };

}

export const settingsStore = new SettingsStore();
