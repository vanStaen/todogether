import React, { useState } from "react";
import { observer } from "mobx-react";

import "./ListRow.less";

export const ListRow = observer((props) => {
  const {task} = props;
  const {archived, desc, id, title} = task;
  // const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`row ${archived ? "row__archived" : "row__active"}`}
    >
      <div
        className="row__container"
        id={`row__container${id}`}
      >
        <div className={`row__title ${!desc && "row__noDesc"}`}>
          {title}
        </div>
        <div className="row__desc">
          {task.desc && task.desc.substring(0, 4) === "http" ? (
            <div className="row__linkDesc">
              <a href={task.desc} target="_blank" rel="noreferrer">
                {task.desc}
              </a>
            </div>
          ) : (
            <div className="row__text row__desc">{task.desc}</div>
          )}
        </div>
      </div>
    </div>
  );
});
