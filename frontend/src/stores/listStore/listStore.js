import { action, makeObservable, observable } from "mobx";

export class ListStore {
  showCompleted = false;
  displayAslist = true;

  constructor() {
    makeObservable(this, {
      showCompleted: observable,
      setShowCompleted: action,
      displayAslist: observable,
      setDisplayAslist: action,
    });
  }

  setShowCompleted = (showCompleted) => {
    this.showCompleted = showCompleted;
  };

  setDisplayAslist = (displayAslist) => {
    this.displayAslist = displayAslist;
  };
}

export const listStore = new ListStore();
