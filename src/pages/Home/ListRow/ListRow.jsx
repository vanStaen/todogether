import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Checkbox } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";
import { DetailRow } from "./DetailRow/DetailRow";

import "./ListRow.css";

export const ListRow = observer((props) => {
  const [isSelected, setIsSelected] = useState(
    listStore.selectedTasks.indexOf(props.id) > -1
  );

  useEffect(() => {
    if (listStore.selectedTasks.length === 0) {
      setIsSelected(false);
    }
  }, [listStore.selectedTasks]);

  const showEditBarhandler = () => {
    if (listStore.showActionBar === props.task.id) {
      listStore.setShowActionBar(null);
    } else {
      listStore.setShowActionBar(props.task.id);
    }
  };

  const handleCheckboxClick = () => {
    if (isSelected) {
      listStore.unselectTask(props.task.id);
    } else {
      listStore.selectTask(props.task.id);
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
        id={`row__textContainer${props.task.id}`}
        onClick={handleCheckboxClick}
      >
        <div className={`${props.task.archived && "row__completed"}`}>
          <div
            className={`row__text ${!props.task.desc && "row__noDesc"} ${
              listStore.showActionBar === props.task.id && "row__noDesc"
            }`}
          >
            {props.task.title}
          </div>
          {listStore.showActionBar !== props.task.id &&
            (props.task.desc && props.task.desc.substring(0, 4) === "http" ? (
              <div className="row__text row__linkDesc">
                <a href={props.task.desc} target="_blank">
                  {props.task.desc}
                </a>
              </div>
            ) : (
              <div className="row__text row__desc">{props.task.desc}</div>
            ))}
        </div>
      </div>
      <div className="row__moreContainer">
        {listStore.showActionBar === props.task.id ? (
          <UpOutlined className="row__more" onClick={showEditBarhandler} />
        ) : (
          <DownOutlined className="row__more" onClick={showEditBarhandler} />
        )}
      </div>
      {listStore.showActionBar === props.task.id && (
        <DetailRow task={props.task} />
      )}
    </div>
  );
});
