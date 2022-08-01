import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Checkbox } from "antd";

import { listStore } from "../../../stores/listStore/listStore";
import { ActionRow } from "./ActionRow/ActionRow";

import "./ListRow.css";

export const ListRow = observer((props) => {
  const [showActionItems, setShowActionItems] = useState(false);
  const [isSelected, setIsSelected] = useState(
    listStore.selectedTasks.indexOf(props.id) > -1
  );

  useEffect(() => {
    const elementId = `row__textContainer${props.id}`;
    const element = document.getElementById(elementId);
    if (showActionItems) {
      element.style.width = "calc(100% - 3rem - 210px)";
    } else {
      element.style.width = "calc(100% - 3rem - 20px)";
    }
  }, [showActionItems]);

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
      <ActionRow
        showActionItems={showActionItems}
        setShowActionItems={setShowActionItems}
      />
    </div>
  );
});
