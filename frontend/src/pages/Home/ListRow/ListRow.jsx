import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";
import { ActionRow } from "./ActionRow/ActionRow";

import "./ListRow.css";

export const ListRow = observer((props) => {
  const [isSelected, setIsSelected] = useState(
    listStore.selectedTasks.indexOf(props._id) > -1
  );

  useEffect(() => {
    console.log("DA");
    if (listStore.selectedTasks.length === 0) {
      console.log("HERE");
      setIsSelected(false);
    }
  }, [listStore.selectedTasks]);

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

  const showEditBarhandler = () => {
    if (listStore.showActionBar === props.task._id) {
      listStore.setShowActionBar(null);
    } else {
      listStore.setShowActionBar(props.task._id);
    }
  };

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
          {props.task.desc && props.task.desc.substring(0, 4) === "http" ? (
            <div className="row__text row__linkDesc">
              <a href={props.task.desc} target="_blank">
                {props.task.desc}
              </a>
            </div>
          ) : (
            <div className="row__text row__desc">{props.task.desc}</div>
          )}
        </div>
      </div>
      <div className="row__moreContainer">
        <DownOutlined className="row__more" onClick={showEditBarhandler} />
      </div>
      <ActionRow task={props.task} />
    </div>
  );
});
