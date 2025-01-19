import React, { useState } from "react";
import { observer } from "mobx-react";
import { Button, AutoComplete, Space } from "antd";
import { LoadingOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';

import { taskStore } from "../../../stores/taskStore/taskStore";
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
        const resultId = await addTask(taskInputData);
        console.log(`New Task #${resultId} added`);
        setTextNewTask(null);
        taskStore.fetchTasks();
      }
    } catch (e) {
      console.log("error", e);
    }
    setLoading(false);
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
      <Space>
        <Button
          variant="solid"
          icon={<EllipsisOutlined />}
          onClick={() => setShowMoreDetailModal(true)}
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
