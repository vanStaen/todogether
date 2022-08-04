import React, { useState } from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./ListGrid.css";

export const ListGrid = observer((props) => {
  const [isSelected, setIsSelected] = useState(
    listStore.selectedTasks.indexOf(props.id) > -1
  );
  const handleSelectClick = () => {
    if (isSelected) {
      listStore.unselectTask(props.id);
    } else {
      listStore.selectTask(props.id);
    }
    setIsSelected(!isSelected);
  };
  return (
    <div
      className={`grid__container 
      ${isSelected && "grid__isSelected"} 
      ${!props.completed && "grid__goldBar"}`}
    >
      <div className="grid__action">
        <Button size="small" icon={<MoreOutlined />} />
      </div>
      <div
        className={`grid__background  ${
          props.completed && "grid__isCompleted"
        }`}
        onClick={handleSelectClick}
      >
        <div className="grid__pic"></div>
        <div className="grid__titleContainer">
          <div className="grid__title">{props.title}</div>
          {props.desc && <div className="grid__desc">{props.desc}</div>}
        </div>
      </div>
    </div>
  );
});
