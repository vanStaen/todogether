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
    return (
      <ListRow
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
                <div className="home__grid">
                  <ListGrid
                    id={1}
                    name="fist row"
                    desc="this also has a really really really really really really really really really really really really really really really really really really really really long description"
                    completed={true}
                  />
                  <ListGrid id={2} name="second row" completed={true} />
                  <ListGrid id={3} name="third row" completed={false} />
                  <ListGrid
                    id={4}
                    name="fourth row"
                    desc="this also has a description"
                    completed={false}
                    hasPicture={false}
                    hasComment={true}
                  />
                  <ListGrid
                    id={5}
                    name="fifth row"
                    desc="this also has a description"
                    completed={true}
                    hasPicture={true}
                  />
                  <ListGrid
                    id={6}
                    name="sixth row, and this time its a really long title,  and this time its a really long title,  and this time its a really long title,  and this time its a really long title!"
                    desc="this also has a really really really really really really really really really really really really really really really really really really really really long description"
                    completed={false}
                    hasPicture={true}
                  />
                  <ListGrid id={7} name="seventh row" completed={true} />
                  <ListGrid id={8} name="eighth row" completed={true} />
                  <ListGrid
                    id={9}
                    name="ninth row"
                    completed={false}
                    hasPicture={true}
                    hasComment={true}
                  />
                  <ListGrid id={10} name="tenth row" completed={false} />
                  <ListGrid
                    id={11}
                    name="eleventh row, and this time its a really long title,  and this time its a really long title,  and this time its a really long title,  and this time its a really long title!"
                    completed={false}
                  />
                </div>
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
