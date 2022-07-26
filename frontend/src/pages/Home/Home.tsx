import React from "react";
import { observer } from "mobx-react";

import { Header } from "./Header/Header";
import { ListHeader } from "./ListHeader/ListHeader";
import { ListRow } from "./listRow/listRow";
import { ListFooter } from "./ListFooter/ListFooter";
import { listStore } from "../../stores/listStore/listStore";

import "./Home.css";

export const Home = observer(() => {
  return (
    <div>
      <div className="home__container">
        <Header />
        <div className="home__main">
          <ListHeader />
          {listStore.taskInEditMode ? (
            <div>EditMode: task#{listStore.taskInEditMode}</div>
          ) : (
            <>
              <div className="home__rows">
                <ListRow id={1} name="fist row" completed={true}/>
                <ListRow id={2} name="second row" completed={true}/>
                <ListRow id={3} name="third row" completed={false}/>
                <ListRow id={4} name="fourth row" completed={false}/>
                <ListRow id={5} name="fifth row" completed={false}/>
                <ListRow id={6} name="sixth row" completed={false}/>
                <ListRow id={7} name="seventh row" completed={true}/>
                <ListRow id={8} name="eighth row" completed={true}/>
                <ListRow id={9} name="ninth row" completed={false}/>
                <ListRow id={10} name="tenth row" completed={false}/>
                <ListRow
                  id={11} 
                  name="eleventh row, and this time its a really long title,  and this time its a really long title,  and this time its a really long title,  and this time its a really long title!"
                  completed={false}
                />
              </div>
              <ListFooter />
            </>
          )}
        </div>
      </div>
    </div>
  );
});
