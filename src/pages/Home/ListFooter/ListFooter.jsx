import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Button, AutoComplete, Space } from "antd";
import { LoadingOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';

import { taskStore } from "../../../stores/taskStore/taskStore";
import { settingsStore } from "../../../stores/settingsStore/settingsStore";
import { userStore } from "../../../stores/userStore/userStore";
import { authStore } from "../../../stores/authStore/authStore";
import { addTask } from "../../../stores/taskStore/addTask";

import "./ListFooter.css";

export const ListFooter = observer(() => {
  const [textNewTask, setTextNewTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [showMoreDetailModal, setShowMoreDetailModal] = useState(false);

  const saveNewTask = async () => {
    try {
      if (textNewTask) {
        setLoading(true);
        const taskInputData = {};
        taskInputData.title = textNewTask;
        taskInputData.categorieId = parseInt(settingsStore.categorieFilter.id);
        const resultId = await addTask(taskInputData);
        setTextNewTask(null);
        taskStore.fetchTasks(userStore.categoriesId);
      }
    } catch (e) {
      console.log("error", e);
    }
    setLoading(false);
  };

  const taskFiltered = (settingsStore.categorieFilter && taskStore.tasks.length)
    ? taskStore.tasks.filter((task) => task.categorie?.id === settingsStore.categorieFilter?.id && task.archived)
    : taskStore.tasks;
  const allOptions = [...new Set(taskFiltered.map((task) => task.title.trim()))];

  const onChangeInput = (value) => {
    const optionsFormated = allOptions.map((option) => {
      if (!value || value.trim() === '') return null;
       if (option.toLowerCase().includes(value.toLowerCase())) {
          return { value: option };
         }
        return null;
    }).filter((option) => option!== null);
    setOptions(optionsFormated)
    setTextNewTask(value);
  };
  const onFocusHandler = async () => {
    await authStore.checkAccess();
    if (!authStore.hasAccess) {
      console.error("No valid token, page will be reloaded");
      window.location.reload();
    }
  }

  const keypressHandler = (e) => {
      if (e.key === "Enter" && textNewTask) {
        saveNewTask()
      }
    }
  
  useEffect(() => {
    window.addEventListener("keypress", keypressHandler);
      return () => {
        window.removeEventListener("keypress", keypressHandler);
      };
  }, [keypressHandler]);

  return (
    <div className="listFooter">
      <div className="listFooter__leftContainer">
        <div className="addTaskFooter__textContainer">
          <AutoComplete
            allowClear={true}
            id="newTaskInput"
            className="addTaskFooter__input"
            onFocus={onFocusHandler}
            onSearch={onChangeInput}
            onChange={onChangeInput}
            value={textNewTask}
            placeholder="Add a task"
            options={options}
          />
        </div>
      </div>
      <div className="listFooter__rightContainer">
        <Space>
          <Button
            variant="solid"
            icon={<EllipsisOutlined />}
            onClick={() => setShowMoreDetailModal(true)}
            disabled={!textNewTask || loading}
          />
          {window.innerWidth > 600 ?
            <Button
              variant="solid"
              icon={loading ? <LoadingOutlined spin /> : <PlusOutlined />}
              onClick={() => saveNewTask()}
              disabled={!textNewTask || loading}
            >
              {textNewTask ? "Add Task" : "New Task"}
            </Button> :
            <Button
              variant="solid"
              icon={loading ? <LoadingOutlined spin /> : <PlusOutlined />}
              onClick={() => saveNewTask()}
              disabled={!textNewTask || loading}
            />
          }
        </Space>
      </div>
    </div>
  );
});
