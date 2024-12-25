import { action, makeObservable, observable } from "mobx";
import Cookies from 'universal-cookie';

import { getLists } from "./getLists.js";
import { getTasks } from "./getTasks.js";
import { archiveTaskInBulk } from "./archiveTaskInBulk.js";
import { deleleTask } from "./deleteTask.js";

const cookies = new Cookies();
export class TaskStore {
  showCompleted = false;
  selectedTasks = [];
  taskInEditMode = null;
  showPictureGallery = false;
  showActionBar = null;
  tasks = [];
  taskAreLoading = true;

  constructor() {
    makeObservable(this, {
      showCompleted: observable,
      setShowCompleted: action,
      selectedTasks: observable,
      unselectAllTasks: action,
      selectTask: action,
      unselectTask: action,
      taskInEditMode: observable,
      setTaskInEditMode: action,
      showPictureGallery: observable,
      setShowPictureGallery: action,
      showActionBar: observable,
      setShowActionBar: action,
      tasks: observable,
      setTasks: action,
      fetchTasks: action,
      setTasksArchived: action,
      taskAreLoading: observable,
      setTaskAreLoading: action,
    });
  }

  setShowCompleted = (showCompleted) => {
    this.showCompleted = showCompleted;
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

  setTasks = (tasks) => {
    this.tasks = tasks;
  };

  setTaskAreLoading = (taskAreLoading) => {
    this.taskAreLoading = taskAreLoading;
  };

  fetchTasks = async () => {
    const taskData = await getTasks();
    if (taskData) {
      this.setTasks(taskData);
      this.setTaskAreLoading(false);
    }
  };

  setTasksArchived = async (archived) => {
    try {
      await archiveTaskInBulk(this.selectedTasks, archived);
      const taskData = await getTasks();
      if (taskData) {
        this.setTasks(taskData);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  deleteSelectedTask = async () => {
    try {
      await deleleTask(this.selectedTasks);
      const taskData = await getTasks(this.selectedList.id);
      if (taskData) {
        this.setTasks(taskData);
      }
      this.unselectAllTasks();
    } catch (e) {
      console.log("error", e);
    }
  }
}

export const taskStore = new TaskStore();
