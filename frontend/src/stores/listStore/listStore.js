import { action, makeObservable, observable } from "mobx";

export class ListStore {
  showCompleted = false;

  constructor() {
    makeObservable(this, {
      showCompleted: observable,
      setShowCompleted: action,
    });
  }

  setShowCompleted = (showCompleted) => {
    this.showCompleted = showCompleted;
  };
}

export const listStore = new ListStore();
