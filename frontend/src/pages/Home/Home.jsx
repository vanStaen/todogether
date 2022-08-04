import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { Header } from "./Header/Header";
import { ListHeader } from "./ListHeader/ListHeader";
import { ListRow } from "./listRow/listRow";
import { ListGrid } from "./ListGrid/ListGrid";
import { ListFooter } from "./ListFooter/ListFooter";
import { TaskEdit } from "./TaskEdit/TaskEdit";
import { listStore } from "../../stores/listStore/listStore";

import "./Home.css";

export const Home = observer(() => {
  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {
    listStore.fetchMyLists();
  }, []);

  const tasksRow = listStore.myTasks.map((task) => {
    if (listStore.showCompleted === false && task.archived) {
      return null;
    }
    return (
      <ListRow
        key={task._id}
        id={task._id}
        title={task.title}
        desc={task.desc}
        completed={task.archived}
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
        id={task._id}
        title={task.title}
        desc={task.desc}
        completed={task.archived}
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
          {listStore.taskInEditMode !== null ? (
            <TaskEdit />
          ) : (
            <>
              {!listStore.displayAslist ? (
                <div className="home__grid">{tasksGrid}</div>
              ) : (
                <div className="home__rows">{tasksRow}</div>
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
