import React, { useState } from "react";
import { Checkbox } from "antd";
import { EditOutlined, PictureOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./ListRow.css";

export const ListRow = (props) => {
  const [isSelected, setIsSelected] = useState(
    listStore.selectedTasks.indexOf(props.id) > -1
  );

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
      {props.hasPicture ? (
        <>
          <div
            className="row__textContainerWithPicture"
            onClick={handleCheckboxClick}
          >
            <div className="row__text">{props.name}</div>
          </div>
          <div className="row__picture" onClick={handlePictureClick}>
            <PictureOutlined />
            &nbsp;
          </div>
        </>
      ) : (
        <div className="row__textContainer" onClick={handleCheckboxClick}>
          <div className="row__text">{props.name}</div>
        </div>
      )}
      <div className="row__edit">
        <EditOutlined style={{ cursor: "pointer" }} onClick={handleEditClick} />
      </div>
    </div>
  );
};
