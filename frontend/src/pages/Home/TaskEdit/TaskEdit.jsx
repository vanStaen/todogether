import React from "react";
import { Button, Form, Input, Upload, Tag, DatePicker } from "antd";
import { SaveOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./TaskEdit.css";

// if taskInEditMode === 0, its a new task
export const TaskEdit = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const closeClickHandler = () => {
    listStore.setTaskInEditMode(null);
  };

  const saveClickHandler = () => {
    console.log("title", form.getFieldValue("title"));
    console.log("desc", form.getFieldValue("desc"));
    console.log("deadline", form.getFieldValue("deadline"));
    console.log("picture", form.getFieldValue("picture"));
    console.log("tags", form.getFieldValue("tags"));
  };

  return (
    <>
      <div className="taskedit__container">
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            title: "test",
            desc: "test desc",
            deadline: null,
          }}
        >
          <Form.Item label="Title" name="title" required>
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Description" name="desc">
            <TextArea rows={4} placeholder="input placeholder" />
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
        </Form>
      </div>
      <div className="taskedit__footer">close</div>
      <div className="taskedit__footer">
        <div className="taskedit__footerLeft">Edit mode</div>
        <div className="taskedit__footerRight">
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
            icon={<SaveOutlined />}
            onClick={saveClickHandler}
            style={{
              background: "rgba(102, 187, 106,1)",
              borderColor: "rgba(76, 175, 80, 1)",
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};
