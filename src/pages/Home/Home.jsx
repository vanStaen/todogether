import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { LoadingOutlined } from "@ant-design/icons";

import { Header } from "./Header/Header";
import { ListHeader } from "./ListHeader/ListHeader";
import { ListRow } from "./listRow/ListRow";
import { ListGrid } from "./ListGrid/ListGrid";
import { ListFooter } from "./ListFooter/ListFooter";
import { TaskEdit } from "./TaskEdit/TaskEdit";
import { ListEdit } from "./ListEdit/ListEdit";
import { listStore } from "../../stores/listStore/listStore";

import "./Home.css";

export const Home = observer(() => {
  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {
    listStore.fetchMyLists();
  }, []);

  const tasksRow = listStore.myTasks.map((task) => {
    const isTaskSelected = listStore.selectedTasks.includes(task._id);
    if (listStore.showCompleted === false && task.archived && !isTaskSelected) {
      return null;
    }
    return (
      <ListRow
        key={task._id}
        task={task}
        hasComments={task.comments.length}
        hasPicture={task.pictures.length}
      />
    );
  });

  const tasksGrid = listStore.myTasks.map((task) => {
    if (listStore.showCompleted === false && task.archived) {
      return null;
    }
    return (
      <ListGrid
        key={task._id}
        task={task}
        hasComments={task.comments.length}
        hasPicture={task.pictures.length}
      />
    );
  });

  return (
    <div>
      <div className="home__container">
        <Header />
        <div className="home__main">
          <ListHeader />
          {listStore.taskAreLoading ? (
            <>
              <div className="home__taskCenterContainer">
                <LoadingOutlined className="home__taskLoadingLogo" />
                <div className="home__taskLoading">Task are loading</div>
              </div>
              <ListFooter />
            </>
          ) : listStore.taskInEditMode !== null ? (
            <TaskEdit />
          ) : listStore.listInEditMode !== null ? (
            <ListEdit />
          ) : (
            <>
              {tasksRow.filter((value) => value !== null).length ? (
                !listStore.displayAslist ? (
                  <div className="home__grid">{tasksGrid}</div>
                ) : (
                  <div className="home__rows">{tasksRow}</div>
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
              <ListFooter />
            </>
          )}
        </div>
        <span className="menu__copyright">todogether.com ©{year}</span>
      </div>
    </div>
  );
});
