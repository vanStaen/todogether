import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Checkbox } from "antd";

import { listStore } from "../../../stores/listStore/listStore";
import { ActionRow } from "./ActionRow/ActionRow";

import "./ListRow.css";

export const ListRow = observer((props) => {
  const [isSelected, setIsSelected] = useState(
    listStore.selectedTasks.indexOf(props._id) > -1
  );

  useEffect(() => {
    const elementId = `row__textContainer${props.task._id}`;
    const element = document.getElementById(elementId);
    if (window.innerWidth > 600) {
      if (listStore.showActionBar === props.task._id) {
        element.style.width = "calc(100% - 3rem - 210px)";
      } else {
        element.style.width = "calc(100% - 3rem - 20px)";
      }
    } else {
      if (listStore.showActionBar === props.task._id) {
        element.style.width = "calc(100% - 1rem - 210px)";
      } else {
        element.style.width = "calc(100% - 4rem - 20px)";
      }
    }
  }, [listStore.showActionBar]);

  const handleCheckboxClick = () => {
    if (isSelected) {
      listStore.unselectTask(props.task._id);
    } else {
      listStore.selectTask(props.task._id);
    }
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`row ${props.task.archived ? "row__noBar" : "row__goldBar"}`}
    >
      <div className="row__checkboxContainer">
        <div>
          <Checkbox
            checked={isSelected}
            onChange={handleCheckboxClick}
            className="row__checkbox"
          ></Checkbox>
        </div>
      </div>
      <div
        className="row__textContainer"
        id={`row__textContainer${props.task._id}`}
        onClick={handleCheckboxClick}
      >
        <div className={`${props.task.archived && "row__completed"}`}>
          <div className={`row__text ${!props.task.desc && "row__noDesc"}`}>
            {props.task.title}
          </div>
          {props.task.desc && (
            <div className="row__text row__desc">{props.task.desc}</div>
          )}
        </div>
      </div>
      <ActionRow task={props.task} />
    </div>
  );
});
