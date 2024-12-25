import React, { useState } from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import { taskStore } from "../../../stores/taskStore/taskStore";

import "./ListGrid.css";

export const ListGrid = observer((props) => {
  const [isSelected, setIsSelected] = useState(
    taskStore.selectedTasks.indexOf(props.task.id) > -1
  );
  const handleSelectClick = () => {
    if (isSelected) {
      taskStore.unselectTask(props.task.id);
    } else {
      taskStore.selectTask(props.task.id);
    }
    setIsSelected(!isSelected);
  };
  return (
    <div
      className={`grid__container 
      ${isSelected && "grid__isSelected"} 
      ${!props.task.archived && "grid__goldBar"}`}
    >
      <div className="grid__action">
        <Button size="small" icon={<MoreOutlined />} />
      </div>
      <div
        className={`grid__background  ${
          props.task.archived && "grid__isCompleted"
        }`}
        onClick={handleSelectClick}
      >
        <div className="grid__pic"></div>
        <div className="grid__titleContainer">
          <div className="grid__title">{props.task.title}</div>
          {props.task.desc && (
            <div className="grid__desc">{props.task.desc}</div>
          )}
        </div>
      </div>
    </div>
  );
});
