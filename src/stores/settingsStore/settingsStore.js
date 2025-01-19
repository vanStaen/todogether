import { action, makeObservable, observable } from "mobx";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class SettingsStore {
  showCompleted = cookies.get("showCompleted") || false;
  categorieFilter = cookies.get("categorieFilter") || null;

  constructor() {
    makeObservable(this, {
      showCompleted: observable,
      setShowCompleted: action,
      categorieFilter: observable,
      setCategorieFilter: action,
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

}

export const settingsStore = new SettingsStore();
