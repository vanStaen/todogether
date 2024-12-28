import React, { useState } from "react";
import { observer } from "mobx-react";
import { taskStore } from "../../../stores/taskStore/taskStore";
import "./ListRow.less";

export const ListRow = observer((props) => {
  const {task} = props;
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`row ${task.archived ? "row__noBar" : "row__goldBar"}`}
    >
      <div
        className="row__textContainer"
        id={`row__textContainer${task.id}`}
      >
        <div className={`${task.archived && "row__completed"}`}>
          <div
            className={`row__text ${!task.desc && "row__noDesc"} ${
              taskStore.showActionBar === task.id && "row__noDesc"
            }`}
          >
            {task.title}
          </div>
          {taskStore.showActionBar !== task.id &&
            (task.desc && task.desc.substring(0, 4) === "http" ? (
              <div className="row__text row__linkDesc">
                <a href={task.desc} target="_blank">
                  {task.desc}
                </a>
              </div>
            ) : (
              <div className="row__text row__desc">{task.desc}</div>
            ))}
        </div>
      </div>
    </div>
  );
});
