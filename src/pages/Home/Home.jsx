import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { LoadingOutlined } from "@ant-design/icons";

import { Header } from "./Header/Header";
import { ListRow } from "./ListRow/ListRow";
import { ListFooter } from "./ListFooter/ListFooter";
import { taskStore } from "../../stores/taskStore/taskStore";
import { settingsStore } from "../../stores/settingsStore/settingsStore";

import "./Home.css";

export const Home = observer(() => {
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

  const tasksRow = taskStore.tasks.map((task, index) => {
    if (settingsStore.showCompleted === false && task.archived) {
      return null;
    }
    if (settingsStore.categorieFilter && task.categorie?.id !== settingsStore.categorieFilter.id) {
      return null;
    }
    return (
      <ListRow
        key={`listrow${index}`}
        task={task}
        windowInnerWidth={windowInnerWidth}
      />
    );
  });

  return (
    <div>
      <div className="home__container" style={{ height: windowInnerHeight }}>
        <Header />
        <div className="home__main">
          {taskStore.taskAreLoading ? (
            <>
              <div className="home__taskCenterContainer">
                <LoadingOutlined className="home__taskLoadingLogo" />
                <div className="home__taskLoading">Task are loading</div>
              </div>
            </>
          ) : (
            <>
              {tasksRow.filter((value) => value !== null).length ? (
                <div className="home__rows">
                  {tasksRow}
                </div>
              ) : (
                <div className="home__taskCenterContainer">
                  <div className="home__taskNothing">
                    Nothing here
                    <br />
                    <span style={{ opacity: .5 }}>Add a task </span>
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
