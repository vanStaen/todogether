import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Checkbox } from "antd";

import { listStore } from "../../../stores/listStore/listStore";
import { ActionRow } from "./ActionRow/ActionRow";

import "./ListRow.css";

export const ListRow = observer((props) => {
  const [isSelected, setIsSelected] = useState(
    listStore.selectedTasks.indexOf(props.id) > -1
  );

  useEffect(() => {
    const elementId = `row__textContainer${props.id}`;
    const element = document.getElementById(elementId);
    if (window.innerWidth > 600) {
      if (listStore.showActionBar === props.id) {
        element.style.width = "calc(100% - 3rem - 210px)";
      } else {
        element.style.width = "calc(100% - 3rem - 20px)";
      }
    } else {
      if (listStore.showActionBar === props.id) {
        element.style.width = "calc(100% - 1rem - 210px)";
      } else {
        element.style.width = "calc(100% - 4rem - 20px)";
      }
    }
  }, [listStore.showActionBar]);

  const handleCheckboxClick = () => {
    if (isSelected) {
      listStore.unselectTask(props.id);
    } else {
      listStore.selectTask(props.id);
    }
    setIsSelected(!isSelected);
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
      <div
        className="row__textContainer"
        id={`row__textContainer${props.id}`}
        onClick={handleCheckboxClick}
      >
        <div className={`${props.completed && "row__completed"}`}>
          <div className={`row__text ${!props.desc && "row__noDesc"}`}>
            {props.name}
          </div>
          {props.desc && (
            <div className="row__text row__desc">{props.desc}</div>
          )}
        </div>
      </div>
      <ActionRow completed={props.completed} id={props.id} />
    </div>
  );
});
