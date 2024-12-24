import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { LoadingOutlined } from "@ant-design/icons";

import { Header } from "./Header/Header";
import { ListHeader } from "./ListHeader/ListHeader";
import { ListRow } from "./ListRow/ListRow";
import { ListGrid } from "./ListGrid/ListGrid";
import { ListFooter } from "./ListFooter/ListFooter";
import { TaskEdit } from "./TaskEdit/TaskEdit";
import { ListEdit } from "./ListEdit/ListEdit";
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
    taskStore.fetchMyLists();
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
        hasComments={task.comments.length}
        hasPicture={task.pictures.length}
      />
    );
  });

  const tasksGrid = taskStore.tasks.map((task) => {
    if (taskStore.showCompleted === false && task.archived) {
      return null;
    }
    return (
      <ListGrid
        key={task.id}
        task={task}
        hasComments={task.comments.length}
        hasPicture={task.pictures.length}
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
            }px - ${windowInnerWidth > 600 ? "11rem" : "8rem"}`,
          }}
        >
          <ListHeader />
          {taskStore.taskAreLoading ? (
            <>
              <div
                className="home__taskCenterContainer"
                style={{
                  height: `calc(${windowInnerHeight}px - ${
                    windowInnerWidth > 600 ? 70 : 60
                  }px - ${windowInnerWidth > 600 ? "11rem" : "8rem"}`,
                }}
              >
                <LoadingOutlined className="home__taskLoadingLogo" />
                <div className="home__taskLoading">Task are loading</div>
              </div>
            </>
          ) : taskStore.taskInEditMode !== null ? (
            <TaskEdit />
          ) : taskStore.listInEditMode !== null ? (
            <ListEdit />
          ) : (
            <>
              {tasksRow.filter((value) => value !== null).length ? (
                !taskStore.displayAslist ? (
                  <div
                    className="home__grid"
                    style={{
                      height: `calc(${windowInnerHeight}px - ${
                        windowInnerWidth > 600 ? 70 : 60
                      }px - ${windowInnerWidth > 600 ? "11rem" : "8rem"}`,
                    }}
                  >
                    {tasksGrid}
                  </div>
                ) : (
                  <div
                    className="home__rows"
                    style={{
                      height: `calc(${windowInnerHeight}px - ${
                        windowInnerWidth > 600 ? 70 : 60
                      }px - ${windowInnerWidth > 600 ? "11rem" : "8rem"}`,
                    }}
                  >
                    {tasksRow}
                  </div>
                )
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
        <span className="menu__copyright">todogether.com ©{year}</span>
      </div>
    </div>
  );
});