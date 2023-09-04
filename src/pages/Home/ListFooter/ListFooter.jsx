import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Tooltip, Button, Popconfirm } from "antd";
import {
  DeleteOutlined,
  CheckOutlined,
  PlusOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";
import { addTask } from "../TaskEdit/addTask";

import "./ListFooter.css";

export const ListFooter = observer(() => {
  const [taskArrayArchived, setTaskArrayArchived] = useState([]);
  const [textNewTask, setTextNewTask] = useState(null);

  useEffect(() => {
    selectedTaskArrayArchived();
  }, [listStore.selectedTasks, listStore.myTasks]);

  useEffect(() => {
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, [keyDownListener]);

  const saveNewTask = async (value) => {
    setTextNewTask(null);
    document.getElementById("newTaskInput").value = "";
    try {
      const taskInputData = {};
      taskInputData.listId = parseInt(listStore.selectedList._id);
      taskInputData.title = value;
      const resultId = await addTask(taskInputData);
      console.log(`New Task #${resultId} added`);
      listStore.fetchMyTasks();
    } catch (e) {
      console.log("error", e);
    }
  };

  const keyDownListener = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "+") {
      listStore.setTaskInEditMode(0);
    } else if (keyPressed === "enter") {
      saveNewTask(textNewTask);
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

  const onChangeInput = (event) => {
    if (event.target.value) {
      listStore.setTaskInEditMode(null);
    }
    setTextNewTask(event.target.value);
  };

  return (
    <div className="listFooter">
      <div className="listFooter__leftContainer">
        {!!listStore.selectedTasks.length ? (
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
        ) : (
          <>
            <div className="addTaskFooter__icon">
              <PlusSquareOutlined />
            </div>
            <div className="addTaskFooter__textContainer">
              <input
                id="newTaskInput"
                className="addTaskFooter__input"
                onChange={onChangeInput}
              />
            </div>
          </>
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
            icon={!textNewTask && <PlusOutlined />}
            onClick={() => {
              textNewTask
                ? saveNewTask(textNewTask)
                : listStore.setTaskInEditMode(0);
            }}
          >
            {window.innerWidth > 460 &&
              (textNewTask ? <>Add Task &nbsp;</> : "New Task")}
            {textNewTask && <>&#9166;</>}
          </Button>
        )}
      </div>
    </div>
  );
});
