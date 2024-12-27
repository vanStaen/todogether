import React, { useEffect, useState } from "react";
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
  const [textNewTask, setTextNewTask] = useState(null);

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
      </div>
      <div className="listFooter__rightContainer">
          <Button
            type="primary"
            icon={!textNewTask && <PlusOutlined />}
            onClick={() => saveNewTask()}
            disabled={!textNewTask}
          >
            {window.innerWidth > 600 &&
              (textNewTask ? <>Add Task &nbsp;</> : "New Task")}
            {textNewTask && <>&#9166;</>}
          </Button>
      </div>
    </div>
  );
});
