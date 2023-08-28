import { action, makeObservable, observable } from "mobx";
import Cookies from 'universal-cookie';

import { getLists } from "./getLists";
import { getTasks } from "./getTasks";
import { archiveTaskInBulk } from "./archiveTaskInBulk";
import { deleleTask } from "./deleteTask";

const cookies = new Cookies();
export class ListStore {
  showCompleted = false;
  displayAslist = true;
  selectedTasks = [];
  selectedList = cookies.get('lastSelectedList');
  taskInEditMode = null;
  listInEditMode = null;
  showPictureGallery = false;
  showActionBar = null;
  myLists = [];
  myTasks = [];
  taskAreLoading = true;

  constructor() {
    makeObservable(this, {
      showCompleted: observable,
      setShowCompleted: action,
      displayAslist: observable,
      setDisplayAslist: action,
      selectedTasks: observable,
      unselectAllTasks: action,
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
      setMyLists: action,
      fetchMyLists: action,
      myTasks: observable,
      setMyTasks: action,
      fetchMyTasks: action,
      selectedList: observable,
      setSelectedList: action,
      setTasksArchived: action,
      taskAreLoading: observable,
      setTaskAreLoading: action,
    });
  }

  setShowCompleted = (showCompleted) => {
    this.showCompleted = showCompleted;
  };

  setDisplayAslist = (displayAslist) => {
    this.displayAslist = displayAslist;
  };

  unselectAllTasks = () => {
    this.selectedTasks = [];
  };

  selectTask = (taskId) => {
    const index = this.selectedTasks.indexOf(taskId);
    if (index > -1) {
      console.log("Error", "the task was already in the 'selectedTasks'-array");
    } else {
      this.selectedTasks = [...this.selectedTasks, taskId]
    }
  };

  unselectTask = (taskId) => {
    const index = this.selectedTasks.indexOf(taskId);
    if (index === -1) {
      console.log("Error", "the task was not in the 'selectedTasks'-array");
    } else {
      this.selectedTasks = this.selectedTasks.filter((id) => id !== taskId);
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

  setMyLists = (myLists) => {
    this.myLists = myLists;
  };

  fetchMyLists = async () => {
    const listData = await getLists();
    if (listData) {
      this.setMyLists(listData);
      if (!this.selectedList) {
        this.setSelectedList(listData[0]);
      } else {
        this.setSelectedList(this.selectedList);
      }
    }
  };

  setMyTasks = (myTasks) => {
    this.myTasks = myTasks;
  };

  setSelectedList = (selectedList) => {
    this.selectedList = selectedList;
    this.selectedTasks = [];
    this.setTaskAreLoading(true);
    this.fetchMyTasks()
    cookies.set('lastSelectedList', selectedList, { path: '/' });
  };

  setTaskAreLoading = (taskAreLoading) => {
    this.taskAreLoading = taskAreLoading;
  };

  fetchMyTasks = async () => {
    const taskData = await getTasks(this.selectedList._id);
    if (taskData) {
      this.setMyTasks(taskData);
      this.setTaskAreLoading(false);
    }
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

  deleteSelectedTask = async () => {
    try {
      await deleleTask(this.selectedTasks);
      const taskData = await getTasks(this.selectedList._id);
      if (taskData) {
        this.setMyTasks(taskData);
      }
    } catch (e) {
      console.log("error", e);
    }
  }
}

export const listStore = new ListStore();
