import React, { useState } from "react";
import { observer } from "mobx-react";
import { Button, AutoComplete, Space } from "antd";
import { LoadingOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';

import { taskStore } from "../../../stores/taskStore/taskStore";
import { settingsStore } from "../../../stores/settingsStore/settingsStore";
import { userStore } from "../../../stores/userStore/userStore";
import { addTask } from "../../../stores/taskStore/addTask";

import "./ListFooter.css";

export const ListFooter = observer(() => {
  const [textNewTask, setTextNewTask] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const onChangeInput = (value) => {
    setTextNewTask(value);
  };

  const taskFiltered = (settingsStore.categorieFilter && taskStore.tasks.length)
    ? taskStore.tasks.filter((task) => task.categorie?.id === settingsStore.categorieFilter?.id && task.archived)
    : taskStore.tasks;
  const options = taskFiltered.map((task) => task.title.trim());
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
