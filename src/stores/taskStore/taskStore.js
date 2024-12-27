import { action, makeObservable, observable } from "mobx";
import Cookies from 'universal-cookie';

import { getTasks } from "./getTasks.js";
import { archiveTask } from "./archiveTask.js";
import { deleleTask } from "./deleteTask.js";

const cookies = new Cookies();

export class TaskStore {
  showCompleted = true;
  tasks = [];
  taskAreLoading = true;

  constructor() {
    makeObservable(this, {
      showCompleted: observable,
      setShowCompleted: action,
      tasks: observable,
      setTasks: action,
      fetchTasks: action,
      archiveTask: action,
      deleteTask: action,
      taskAreLoading: observable,
      setTaskAreLoading: action,
    });
  }

  setShowCompleted = (showCompleted) => {
    this.showCompleted = showCompleted;
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

  archiveTask = async (id, archived) => {
    try {
      await archiveTask(id, archived);
      const taskData = await getTasks();
      if (taskData) {
        this.setTasks(taskData);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  deleteTask = async (id) => {
    try {
      await deleleTask(id);
      const taskData = await getTasks();
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
