import React, { useRef, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Tooltip, Button, Popconfirm, AutoComplete } from "antd";
import {
  DeleteOutlined,
  CheckOutlined,
  PlusOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { taskStore } from "../../../stores/taskStore/taskStore";
import { addTask } from "./addTask";

import "./ListFooter.css";

export const ListFooter = observer(() => {
  const [taskArrayArchived, setTaskArrayArchived] = useState([]);
  const [textNewTask, setTextNewTask] = useState(null);

  useEffect(() => {
    selectedTaskArrayArchived();
  }, [taskStore.selectedTasks, taskStore.tasks]);

  useEffect(() => {
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, [keyDownListener]);

  const saveNewTask = async () => {
    try {
      const taskInputData = {};
      taskInputData.title = textNewTask;
      const resultId = await addTask(taskInputData);
      console.log(`New Task #${resultId} added`);
      setTextNewTask(null);
      taskStore.fetchTasks();
    } catch (e) {
      console.log("error", e);
    }
  };

  const keyDownListener = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "enter") {
      saveNewTask();
    }
  };

  const selectedTaskArrayArchived = () => {
    let taskArrayArchivedTemp = [];
    taskStore.tasks.forEach((task) => {
      if (taskStore.selectedTasks.includes(task.id)) {
        taskArrayArchivedTemp.push(task.archived);
      }
    });
    setTaskArrayArchived(taskArrayArchivedTemp);
  };

  const onChangeInput = (value) => {
    setTextNewTask(value);
  };

  const options = taskStore.tasks.map((task) => task.title.trim());
  const optionsUnique = [...new Set(options)];
  const optionsFormated = optionsUnique.map((option) => {
    return { value: option };
  });

  return (
    <div className="listFooter">
      <div className="listFooter__leftContainer">
        {!!taskStore.selectedTasks.length ? (
          <Popconfirm
            title="Are you sure？"
            onConfirm={taskStore.deleteSelectedTask}
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
            <div className="addTaskFooter__textContainer">
              <AutoComplete
                allowClear={true}
                id="newTaskInput"
                className="addTaskFooter__input"
                bordered={false}
                onSearch={onChangeInput}
                onChange={onChangeInput}
                value={textNewTask}
                placeholder="Add a task"
                options={optionsFormated}
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </div>
          </>
        )}
      </div>
      <div className="listFooter__rightContainer">
        {taskStore.selectedTasks.length ? (
          <>
            {taskArrayArchived.includes(true) && (
              <Tooltip title="Mark as undone">
                <Button
                  type="primary"
                  icon={<CloseOutlined />}
                  onClick={() => {
                    taskStore.setTasksArchived(false);
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
                      taskStore.setTasksArchived(true);
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
            onClick={() => saveNewTask(textNewTask)}
          >
            {window.innerWidth > 600 &&
              (textNewTask ? <>Add Task &nbsp;</> : "New Task")}
            {textNewTask && <>&#9166;</>}
          </Button>
        )}
      </div>
    </div>
  );
});
