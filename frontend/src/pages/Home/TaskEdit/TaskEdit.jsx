import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Form, Input, Upload, Tag, DatePicker } from "antd";
import { SaveOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";
import { postAddTask } from "./postAddTask";

import "./TaskEdit.css";

// if taskInEditMode === 0, its a new task
export const TaskEdit = observer(() => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const closeClickHandler = () => {
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
        const resultId = await postAddTask(taskInputData);
        console.log("New Task #", resultId, " added");
        listStore.setTaskInEditMode(null);
        listStore.fetchMyTasks();
      } catch (e) {
        console.log("error", e);
      }
    } else {
      console.log("this is an edit");
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
        <div className="taskedit__footer">close</div>
        <div className="taskedit__footer">
          <div className="taskedit__footerLeft">Task edit mode</div>
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
        </div>
      </Form>
    </>
  );
});
