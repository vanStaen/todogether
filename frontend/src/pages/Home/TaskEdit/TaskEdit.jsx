import React from "react";
import { Button } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./TaskEdit.css";

export const TaskEdit = () => {
  const closeClickHandler = () => {
    listStore.setTaskInEditMode(null);
  };

  return (
    <>
      <div>task #{listStore.taskInEditMode}</div>
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
            onClick={closeClickHandler}
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
