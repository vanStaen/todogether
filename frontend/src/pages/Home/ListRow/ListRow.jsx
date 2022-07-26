import React, { useState } from "react";
import { Checkbox, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./ListRow.css";

export const ListRow = (props) => {
  const [isSelected, setIsSelected] = useState(props.selected);

  const handleCheckboxClick = () => {
    if (isSelected) {
      listStore.unselectTask(props.id);
    } else {
      listStore.selectTask(props.id);
    }
    setIsSelected(!isSelected);
  };

  const handleEditClick = () => {
    listStore.setTaskInEditMode(props.id);
  };

  return (
    <div className={`row ${props.completed ? "row__noBar" : "row__goldBar"}`}>
      <div className="row__checkboxContainer">
        <div>
          <Checkbox
            checked={isSelected}
            onChange={handleCheckboxClick}
            className="row__checkbox"
          ></Checkbox>
        </div>
      </div>
      <div className="row__textContainer">
        <Tooltip title={props.name}>
          <div className="row__text" onClick={handleCheckboxClick}>
            {props.name}
          </div>
        </Tooltip>
      </div>
      <div className="row__edit">
        <EditOutlined style={{ cursor: "pointer" }} onClick={handleEditClick} />
      </div>
    </div>
  );
};
