import React, { useState } from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { DeleteOutlined, CheckOutlined, UndoOutlined } from "@ant-design/icons";

import { taskStore } from '../../../stores/taskStore/taskStore.js';

import "./ListRow.less";

export const ListRow = observer((props) => {
  const { task } = props;
  const { archived, desc, id, title } = task;
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`row ${archived ? "row__archived" : "row__active"}`}
    >
      <div
        className="row__container"
        id={`row__container${id}`}
        onMouseOver={() => {
          setShowActions(true);
        }}
        onMouseLeave={() => {
          setShowActions(false);
        }}
      >
        <div className={`row__title ${!desc && "row__noDesc"}`}>
          {title}
        </div>
        <div className="row__desc">
          {task.desc && task.desc.substring(0, 4) === "http" ? (
            <div className="row__linkDesc">
              <a href={task.desc} target="_blank" rel="noreferrer">
                {task.desc}
              </a>
            </div>
          ) : (
            <div className="row__text row__desc">{task.desc}</div>
          )}
        </div>
        {showActions &&
          <div className="row__actions">
            <div className='row__actionButtons' onClick={() => taskStore.archiveTask(id, !archived)}>
              {archived ? <Button
                color="default"
                variant="filled"
                icon={<UndoOutlined />}
              /> : <Button
                color="green"
                variant="solid"
                icon={<CheckOutlined />}
              />}
            </div>
            <div className='row__actionButtons' onClick={() => taskStore.deleteTask(id)}>
              {archived ? <Button
                color="danger"
                variant="filled"
                icon={<DeleteOutlined />}
              /> : <Button
                color="danger"
                variant="solid"
                icon={<DeleteOutlined />}
              />}
            </div>
          </div>}
      </div>
    </div>
  );
});
