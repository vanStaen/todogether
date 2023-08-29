import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Tooltip, Button, Popconfirm } from "antd";
import {
  DeleteOutlined,
  CheckOutlined,
  PlusOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./ListFooter.css";

export const ListFooter = observer(() => {
  const [taskArrayArchived, setTaskArrayArchived] = useState([]);

  useEffect(() => {
    selectedTaskArrayArchived();
  }, [listStore.selectedTasks, listStore.myTasks]);

  useEffect(() => {
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, [keyDownListener]);

  const keyDownListener = (event) => {
    //event.preventDefault();
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "+") {
      listStore.setTaskInEditMode(0);
    }
  };

  const selectedTaskArrayArchived = () => {
    let taskArrayArchivedTemp = [];
    listStore.myTasks.forEach((task) => {
      if (listStore.selectedTasks.includes(task._id)) {
        taskArrayArchivedTemp.push(task.archived);
      }
    });
    setTaskArrayArchived(taskArrayArchivedTemp);
  };

  return (
    <div className="listFooter">
      <div className="listFooter__leftContainer">
        {!!listStore.selectedTasks.length && (
          <Popconfirm
            title="Are you sure？"
            onConfirm={listStore.deleteSelectedTask}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Tooltip title="Delete selected tasks" placement="right">
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                danger
                style={{
                  background: "rgba(146, 43, 33, 1)",
                  borderColor: "rgba(123, 36, 28, 1)",
                }}
              />
            </Tooltip>
          </Popconfirm>
        )}
      </div>
      <div className="listFooter__rightContainer">
        {listStore.selectedTasks.length ? (
          <>
            {taskArrayArchived.includes(true) && (
              <Tooltip title="Mark as undone">
                <Button
                  type="primary"
                  icon={<CloseOutlined />}
                  onClick={() => {
                    listStore.setTasksArchived(false);
                  }}
                  style={{
                    background: "rgba(229, 152, 102, .9)",
                    borderColor: "rgba(229, 152, 102, 1)",
                  }}
                />
              </Tooltip>
            )}
            {taskArrayArchived.includes(false) && (
              <>
                &nbsp; &nbsp;
                <Tooltip title="Mark as done" placement="left">
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() => {
                      listStore.setTasksArchived(true);
                    }}
                    style={{
                      background: "rgba(102, 187, 106,1)",
                      borderColor: "rgba(76, 175, 80, 1)",
                    }}
                  />
                </Tooltip>
              </>
            )}
          </>
        ) : (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              listStore.setTaskInEditMode(0);
            }}
          >
            {window.innerWidth > 460 && "New Task"}
          </Button>
        )}
      </div>
    </div>
  );
});
