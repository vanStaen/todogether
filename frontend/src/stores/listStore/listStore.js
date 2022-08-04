import { action, makeObservable, observable } from "mobx";

import { getLists } from "./getLists";
import { getTasks } from "./getTasks";
export class ListStore {
  showCompleted = false;
  displayAslist = true;
  selectedTasks = [];
  selectedList = null;
  taskInEditMode = null;
  showPictureGallery = false;
  showActionBar = null;
  myLists = [];
  myTasks = [];

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
      showPictureGallery: observable,
      setShowPictureGallery: action,
      showActionBar: observable,
      setShowActionBar: action, 
      myLists: observable,
      fetchMyLists: action,
      myTasks: observable,
      selectedList: observable,
      setSelectedList: action,
    });
  }

  setShowCompleted = (showCompleted) => {
    this.showCompleted = showCompleted;
  };

  setDisplayAslist = (displayAslist) => {
    this.displayAslist = displayAslist;
  };

  selectTask = (task) => {
    const index = this.selectedTasks.indexOf(task)
    if (index > -1) {      
      console.log("Error", "the task was already in the 'selectedTasks'-array")
    }
    else {
      this.selectedTasks.push(task);
    }
  }

  unselectTask = (task) => {
    const index = this.selectedTasks.indexOf(task)
    if (index > -1) {
      this.selectedTasks.splice(index, 1);
    }
    else {
      console.log("Error", "the task was not in the 'selectedTasks'-array")
    }
  }

  setTaskInEditMode = (taskInEditMode) => {
    this.taskInEditMode = (taskInEditMode);
  }

  setShowPictureGallery = (showPictureGallery) => {
    this.showPictureGallery = (showPictureGallery);
  }

  setShowActionBar = (showActionBar) => {
    this.showActionBar = (showActionBar);
  }

  fetchMyLists = async () => {
    const listData = await getLists();
    if (listData) {
      this.myLists = listData;
      if (!this.selectedList) {
        this.setSelectedList(listData[0])
      }
    }
  };

  setSelectedList = async (selectedList) => {
    this.selectedList = (selectedList);
    const taskData = await getTasks(selectedList._id);
    if (taskData) {
      this.myTasks = taskData;
    }
    console.log("myTasks", taskData)
  }

}

export const listStore = new ListStore();
