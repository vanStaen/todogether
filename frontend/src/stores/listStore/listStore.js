import { action, makeObservable, observable } from "mobx";

import { getLists } from "./getLists";
import { getTasks } from "./getTasks";
import { archiveTaskInBulk } from "./archiveTaskInBulk";
export class ListStore {
  showCompleted = true;
  displayAslist = true;
  selectedTasks = [];
  selectedList = null;
  taskInEditMode = null;
  listInEditMode = null;
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
      listInEditMode: observable,
      setListInEditMode: action,
      showPictureGallery: observable,
      setShowPictureGallery: action,
      showActionBar: observable,
      setShowActionBar: action,
      myLists: observable,
      fetchMyLists: action,
      myTasks: observable,
      setMyTasks: observable,
      selectedList: observable,
      setSelectedList: action,
      setTasksArchived: action,
    });
  }

  setShowCompleted = (showCompleted) => {
    this.showCompleted = showCompleted;
  };

  setDisplayAslist = (displayAslist) => {
    this.displayAslist = displayAslist;
  };

  selectTask = (task) => {
    const index = this.selectedTasks.indexOf(task);
    if (index > -1) {
      console.log("Error", "the task was already in the 'selectedTasks'-array");
    } else {
      this.selectedTasks.push(task);
    }
  };

  unselectTask = (task) => {
    const index = this.selectedTasks.indexOf(task);
    if (index > -1) {
      this.selectedTasks.splice(index, 1);
    } else {
      console.log("Error", "the task was not in the 'selectedTasks'-array");
    }
  };

  setTaskInEditMode = (taskInEditMode) => {
    this.taskInEditMode = taskInEditMode;
  };

  setListInEditMode = (listInEditMode) => {
    this.listInEditMode = listInEditMode;
  };


  setShowPictureGallery = (showPictureGallery) => {
    this.showPictureGallery = showPictureGallery;
  };

  setShowActionBar = (showActionBar) => {
    this.showActionBar = showActionBar;
  };

  fetchMyLists = async () => {
    const listData = await getLists();
    if (listData) {
      this.myLists = listData;
      if (!this.selectedList) {
        this.setSelectedList(listData[0]);
      }
    }
  };

  setMyTasks = (myTasks) => {
    this.myTasks = myTasks;
  };

  setSelectedList = async (selectedList) => {
    this.selectedList = selectedList;
    const taskData = await getTasks(selectedList._id);
    if (taskData) {
      this.setMyTasks(taskData);
    }
    console.log("myTasks", taskData);
  };

  setTasksArchived = async (archived) => {
    try {
      await archiveTaskInBulk(this.selectedTasks, archived);
      const taskData = await getTasks(this.selectedList._id);
      if (taskData) {
        this.setMyTasks(taskData);
      }
    } catch (e) {
      console.log("error", e);
    }
  };
}

export const listStore = new ListStore();
