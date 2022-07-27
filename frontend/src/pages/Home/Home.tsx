import React from "react";
import { observer } from "mobx-react";

import { Header } from "./Header/Header";
import { ListHeader } from "./ListHeader/ListHeader";
import { ListRow } from "./listRow/listRow";
import { ListFooter } from "./ListFooter/ListFooter";
import { TaskEdit } from "./TaskEdit/TaskEdit";
import { listStore } from "../../stores/listStore/listStore";

import "./Home.css";

export const Home = observer(() => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div>
      <div className="home__container">
        <Header />
        <div className="home__main">
          <ListHeader />
          {listStore.taskInEditMode ? (
            <TaskEdit />
          ) : (
            <>
              {listStore.displayAslist ? (
                <div className="home__rows">
                  <ListRow id={1} name="fist row" completed={true} />
                  <ListRow id={2} name="second row" completed={true} />
                  <ListRow id={3} name="third row" completed={false} />
                  <ListRow id={4} name="fourth row" completed={false} />
                  <ListRow
                    id={5}
                    name="fifth row"
                    completed={true}
                    hasPicture={true}
                  />
                  <ListRow
                    id={6}
                    name="sixth row, and this time its a really long title,  and this time its a really long title,  and this time its a really long title,  and this time its a really long title!"
                    completed={false}
                    hasPicture={true}
                  />
                  <ListRow id={7} name="seventh row" completed={true} />
                  <ListRow id={8} name="eighth row" completed={true} />
                  <ListRow
                    id={9}
                    name="ninth row"
                    completed={false}
                    hasPicture={true}
                  />
                  <ListRow id={10} name="tenth row" completed={false} />
                  <ListRow
                    id={11}
                    name="eleventh row, and this time its a really long title,  and this time its a really long title,  and this time its a really long title,  and this time its a really long title!"
                    completed={false}
                  />
                </div>
              ) : (
                <>Grid view</>
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
