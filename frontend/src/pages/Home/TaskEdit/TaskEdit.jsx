import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Form, Input, Upload, Tag, DatePicker } from "antd";
import { SaveOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";
import { addTask } from "./addTask";
import { updateTask } from "./updateTask";

import "./TaskEdit.css";

// if taskInEditMode === 0, its a new task
export const TaskEdit = observer(() => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const closeClickHandler = () => {
    listStore.setShowActionBar(null);
    listStore.setTaskInEditMode(null);
  };

  const saveClickHandler = async (values) => {
    if (listStore.taskInEditMode === 0) {
      try {
        const taskInputData = {};
        taskInputData.listId = parseInt(listStore.selectedList._id);
        taskInputData.title = values.title;
        if (values.desc) {
          taskInputData.desc = values.desc;
        }
        const resultId = await addTask(taskInputData);
        //console.log(`New Task #${resultId} added`);
        listStore.setShowActionBar(null);
        listStore.setTaskInEditMode(null);
        listStore.fetchMyTasks();
      } catch (e) {
        console.log("error", e);
      }
    } else {
      try {
        const taskInputData = {};
        if (listStore.taskInEditMode.title !== values.title) {
          taskInputData.title = values.title;
        }
        if (listStore.taskInEditMode.desc !== values.desc) {
          taskInputData.desc = values.desc;
        }
        await updateTask(listStore.taskInEditMode._id, taskInputData);
        //console.log(`Task #${listStore.taskInEditMode._id} modified`);
        listStore.setShowActionBar(null);
        listStore.setTaskInEditMode(null);
        listStore.fetchMyTasks();
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, [keyDownListener]);

  const keyDownListener = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "escape") {
      closeClickHandler();
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={listStore.taskInEditMode}
        requiredMark="optional"
        onFinish={saveClickHandler}
      >
        <div className="taskedit__container">
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "A task title is mandatory!",
              },
            ]}
          >
            <Input placeholder="Add a title" />
          </Form.Item>
          <Form.Item label="Description" name="desc">
            <TextArea rows={4} placeholder="Add an optional description" />
          </Form.Item>
          <Form.Item label="Deadline" name="deadline">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Pictures" name="pictures">
            <Upload action="/upload.do" listType="picture-card" disabled>
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Tag disabled>Not available yet</Tag>
          </Form.Item>
          <Form.Item label="Assigned" name="assignedTo" disabled>
            Assign someone to the task
          </Form.Item>
          <Form.Item label="Urgent" name="favorite" disabled>
            Define as urgent
          </Form.Item>
          <Form.Item label="Recuring" name="recuring" disabled>
            Make it recurring
          </Form.Item>
        </div>
        <div className="taskedit__footer">
          {window.innerWidth < 460 ? (
            <>
              <Form.Item>
                <div className="taskedit__footerLeft">
                  <Button
                    type="primary"
                    icon={<CloseOutlined />}
                    danger
                    onClick={closeClickHandler}
                  />
                </div>
                <div className="taskedit__footerRight">
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    style={{
                      background: "rgba(102, 187, 106,1)",
                      borderColor: "rgba(76, 175, 80, 1)",
                    }}
                  />
                </div>
              </Form.Item>
            </>
          ) : (
            <>
              <div className="taskedit__footerLeft">
                {listStore.taskInEditMode === 0 ? "New task" : "Edit task"}
              </div>
              <div className="taskedit__footerRight">
                <Form.Item>
                  <Button
                    type="primary"
                    icon={<CloseOutlined />}
                    danger
                    onClick={closeClickHandler}
                  >
                    Close
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    style={{
                      background: "rgba(102, 187, 106,1)",
                      borderColor: "rgba(76, 175, 80, 1)",
                    }}
                  >
                    Save
                  </Button>
                </Form.Item>
              </div>
            </>
          )}
        </div>
      </Form>
    </>
  );
});
