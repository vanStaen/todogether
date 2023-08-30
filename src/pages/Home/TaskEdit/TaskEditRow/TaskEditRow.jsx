import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { PlusSquareOutlined } from "@ant-design/icons";

import { addTask } from "../addTask";
import { listStore } from "../../../../stores/listStore/listStore";

import "./TaskEditRow.css";

export const TaskEditRow = observer(() => {
  const [textNewTask, setTextNewTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeInput = (event) => {
    setTextNewTask(event.target.value);
  };

  const keyDownListener = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "enter") {
      saveNewTask();
    }
  };

  const saveNewTask = async () => {
    try {
      const taskInputData = {};
      taskInputData.listId = parseInt(listStore.selectedList._id);
      taskInputData.title = textNewTask;
      const resultId = await addTask(taskInputData);
      console.log(`New Task #${resultId} added`);
      listStore.fetchMyTasks();
      setTextNewTask(null);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, [keyDownListener]);

  return (
    <>
      <div className="taskeditrow taskeditrow__noBar">
        <div className="taskeditrow__checkboxContainer">
          <PlusSquareOutlined />
        </div>
        <div className="taskeditrow__textContainer">
          <div>
            <input
              id="newTaskInput"
              className="taskeditrow__input"
              onChange={onChangeInput}
            />
          </div>
        </div>
        {textNewTask && (
          <div className="taskeditrow__moreContainer" onClick={saveNewTask}>
            &#9166;
          </div>
        )}
      </div>
    </>
  );
});
