import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Checkbox } from "antd";
import {
  EditOutlined,
  PictureOutlined,
  CommentOutlined,
} from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./ListRow.css";

export const ListRow = observer((props) => {
  const [isSelected, setIsSelected] = useState(
    listStore.selectedTasks.indexOf(props.id) > -1
  );

  useEffect(() => {
    const elementId = `row__textContainer${props.id}`;
    const element = document.getElementById(elementId);
    if (props.hasPicture && props.hasComment) {
      element.style.width = "calc(100% - 3rem - 2rem - 6rem)";
    } else if (props.hasPicture || props.hasComment) {
      element.style.width = "calc(100% - 3rem - 2rem - 3rem)";
    } else {
      element.style.width = "calc(100% - 3rem - 2rem)";
    }
  });

  const colorLogo = props.completed ? "#bbb7ac" : "inherit";
  const editPointer = props.completed ? "not-allowed" : "cursor";

  const handleCheckboxClick = () => {
    if (isSelected) {
      listStore.unselectTask(props.id);
    } else {
      listStore.selectTask(props.id);
    }
    setIsSelected(!isSelected);
  };

  const handleEditClick = () => {
    if (!props.completed) {
      listStore.setTaskInEditMode(props.id);
    }
  };

  const handlePictureClick = () => {
    listStore.setShowPictureGallery(true);
    console.log("This should open the image gallery!");
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
        <div className={`row__text ${props.completed && "row__completed"}`}>
          {props.name}
        </div>
      </div>
      {props.hasPicture && (
        <div className="row__picture" onClick={handlePictureClick}>
          <PictureOutlined style={{ color: colorLogo }} />
        </div>
      )}
      {props.hasComment && (
        <div className="row__picture" onClick={handlePictureClick}>
          <CommentOutlined style={{ color: colorLogo }} />
        </div>
      )}
      <div className="row__edit">
        <EditOutlined
          style={{ cursor: editPointer, color: colorLogo }}
          onClick={handleEditClick}
        />
      </div>
    </div>
  );
});
