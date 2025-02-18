import { action, makeObservable, observable } from "mobx";

import { getTasks } from "./getTasks.js";
import { archiveTask } from "./archiveTask.js";
import { deleteTask } from "./deleteTask.js";
import { userStore } from "../userStore/userStore.js";

export class TaskStore {
  tasks = [];
  taskAreLoading = true;

  constructor() {
    makeObservable(this, {
      tasks: observable,
      setTasks: action,
      fetchTasks: action,
      archiveTask: action,
      deleteTask: action,
      taskAreLoading: observable,
      setTaskAreLoading: action,
    });
  }

  setTasks = (tasks) => {
    this.tasks = tasks;
  };

  setTaskAreLoading = (taskAreLoading) => {
    this.taskAreLoading = taskAreLoading;
  };

  fetchTasks = async (userCategories) => {
    if (userCategories) {
      const taskData = await getTasks(userCategories);
      if (taskData) {
        this.setTasks(taskData);
        this.setTaskAreLoading(false);
      }
    }
  };

  archiveTask = async (id, archived) => {
    try {
      await archiveTask(id, archived);
      const taskData = await getTasks(userStore.categoriesId);
      if (taskData) {
        this.setTasks(taskData);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  deleteTask = async (id) => {
    try {
      await deleteTask(id);
      const taskData = await getTasks();
      if (taskData) {
        this.setTasks(taskData);
      }
    } catch (e) {
      console.log("error", e);
    }
  }
}

export const taskStore = new TaskStore();
