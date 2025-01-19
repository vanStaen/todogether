import { action, makeObservable, observable } from "mobx";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class SettingsStore {
  showCompleted = cookies.get("showCompleted") || false;

  constructor() {
    makeObservable(this, {
      showCompleted: observable,
      setShowCompleted: action,
    });
  }

  setShowCompleted = (showCompleted) => {
    this.showCompleted = showCompleted;
    cookies.set("showCompleted", showCompleted, { path: "/" });
  };
}

export const settingsStore = new SettingsStore();
