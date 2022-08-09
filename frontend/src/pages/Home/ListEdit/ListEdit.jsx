import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Button, Form, Input, Upload, Tag, DatePicker } from "antd";
import { SaveOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";
import { addList } from "./addList";
import { updateList } from "./updateList";

import "./ListEdit.css";

// if listInEditMode === 0, its a new task
export const ListEdit = observer(() => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const closeClickHandler = () => {
    listStore.setListInEditMode(null);
  };

  const saveClickHandler = async (values) => {
    if (listStore.listInEditMode === 0) {
      try {
        const listInputData = {};
        listInputData.title = values.title;
        if (values.desc) {
          listInputData.desc = values.desc;
        }
        if (values.listType) {
          listInputData.listType = values.listType;
        }
        if (values.sharedWith) {
          listInputData.sharedWith = values.sharedWith;
        }
        if (values.avatar) {
          listInputData.avatar = values.avatar;
        }
        const resultId = await addList(listInputData);
        console.log(`New List #${resultId} added`);
        listStore.setListInEditMode(null);
        listStore.fetchMyLists();
      } catch (e) {
        console.log("error", e);
      }
    } else {
      try {
        const listInputData = {};
        if (listStore.listInEditMode.title !== values.title) {
          listInputData.title = values.title;
        }
        if (listStore.listInEditMode.desc !== values.desc) {
          listInputData.desc = values.desc;
        }
        if (listStore.listInEditMode.desc !== values.desc) {
          listInputData.desc = values.desc;
        }
        await updateList(listStore.listInEditMode._id, listInputData);
        console.log(`List #${listStore.listInEditMode._id} modified`);
        listStore.setListInEditMode(null);
        listStore.fetchMyLists();
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={listStore.listInEditMode}
        requiredMark="optional"
        onFinish={saveClickHandler}
      >
        <div className="listedit__container">
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
          <Form.Item label="Avatar" name="avatar">
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
          <Form.Item label="Shared with" name="sharedWith" disabled>
            Shared list with others
          </Form.Item>
        </div>
        <div className="listedit__footer">close</div>
        <div className="listedit__footer">
          {window.innerWidth < 460 ? (
            <>
              <Form.Item>
                <div className="listedit__footerLeft">
                  <Button
                    type="primary"
                    icon={<CloseOutlined />}
                    danger
                    onClick={closeClickHandler}
                  />
                </div>
                <div className="listedit__footerRight">
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
              <div className="listedit__footerLeft">
                {listStore.taskInEditMode === 0 ? "New task" : "Edit task"}
              </div>
              <div className="listedit__footerRight">
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
