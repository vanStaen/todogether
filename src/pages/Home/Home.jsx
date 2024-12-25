import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { LoadingOutlined } from "@ant-design/icons";

import { Header } from "./Header/Header";
import { ListRow } from "./ListRow/ListRow";
import { ListFooter } from "./ListFooter/ListFooter";
import { TaskEdit } from "./TaskEdit/TaskEdit";
import { taskStore } from "../../stores/taskStore/taskStore";

import "./Home.css";

export const Home = observer(() => {
  const date = new Date();
  const year = date.getFullYear();
  const [windowInnerHeight, setWindowInnerHeight] = useState(
    window.innerHeight
  );
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    taskStore.fetchTasks();
  }, []);

  const resetWindowInners = () => {
    setWindowInnerHeight(window.innerHeight);
    setWindowInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resetWindowInners);
    return () => {
      window.removeEventListener("resize", resetWindowInners);
    };
  }, [resetWindowInners]);

  const tasksRow = taskStore.tasks.map((task) => {
    const isTaskSelected = taskStore.selectedTasks.includes(task.id);
    if (taskStore.showCompleted === false && task.archived && !isTaskSelected) {
      return null;
    }
    return (
      <ListRow
        key={task.id}
        task={task} 
      />
    );
  });

  return (
    <div>
      <div className="home__container" style={{ height: windowInnerHeight }}>
        <Header />
        <div
          className="home__main"
          style={{
            height: `calc(${
              windowInnerHeight + (windowInnerWidth > 600 ? -5 : 5)
            }px - ${windowInnerWidth > 600 ? "10rem" : "7rem"}`,
          }}
        >
          {taskStore.taskAreLoading ? (
            <>
              <div
                className="home__taskCenterContainer"
                style={{
                  height: `calc(${windowInnerHeight}px - ${
                    windowInnerWidth > 600 ? 70 : 60
                  }px - ${windowInnerWidth > 600 ? "10rem" : "7rem"}`,
                }}
              >
                <LoadingOutlined className="home__taskLoadingLogo" />
                <div className="home__taskLoading">Task are loading</div>
              </div>
            </>
          ) : taskStore.taskInEditMode !== null ? (
            <TaskEdit />
          ) : (
            <>
              {tasksRow.filter((value) => value !== null).length ? (
                  <div
                    className="home__rows"
                    style={{
                      height: `calc(${windowInnerHeight}px - ${
                        windowInnerWidth > 600 ? 5 : 0
                      }px - ${windowInnerWidth > 600 ? "10rem" : "7rem"}`,
                    }}
                  >
                    {tasksRow}
                  </div>
              ) : (
                <div className="home__taskCenterContainer">
                  <div className="home__taskNothing">
                    Nothing here
                    <br />
                    Add a task
                  </div>
                </div>
              )}
            </>
          )}
          <ListFooter />
        </div>
      </div>
    </div>
  );
});
