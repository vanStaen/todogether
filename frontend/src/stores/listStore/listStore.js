import { action, makeObservable, observable } from "mobx";

export class ListStore {
  showCompleted = false;
  displayAslist = true;
  selectedTasks = [];
  taskInEditMode = null;

  constructor() {
    makeObservable(this, {
      showCompleted: observable,
      setShowCompleted: action,
      displayAslist: observable,
      setDisplayAslist: action,
      selectedTasks: observable,
      selectTask: action,
      unselectTask: action,
      taskInEditMode: observable,
      setTaskInEditMode: action,
    });
  }

  setShowCompleted = (showCompleted) => {
    this.showCompleted = showCompleted;
  };

  setDisplayAslist = (displayAslist) => {
    this.displayAslist = displayAslist;
  };

  selectTask = (task) => {
    this.selectedTasks.push(task);
  }

  unselectTask = (task) => {
    const index = this.selectedTasks.indexOf(task)
    if (index > 0) {
      this.selectedTasks.splice(index, 1);
    }
    else {
      console.log("Error", "the task was not in the 'selectedTasks'-array")
    }
  }

  setTaskInEditMode = (taskInEditMode) => {
    this.taskInEditMode = (taskInEditMode);
  }

}

export const listStore = new ListStore();
