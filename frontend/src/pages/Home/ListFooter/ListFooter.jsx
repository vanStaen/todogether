import React from "react";
import { observer } from "mobx-react";
import { Tooltip, Button, Popconfirm } from "antd";
import {
  DeleteOutlined,
  CheckOutlined,
  PlusOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./ListFooter.css";

export const ListFooter = observer(() => {
  return (
    <div className="listFooter">
      <div className="listFooter__leftContainer">
        {!!listStore.selectedTasks.length && (
          <Popconfirm
            title="Are you sure？"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Tooltip
              title="Delete selected tasks"
              onClick={listStore.deleteSelectedTask}
            >
              <Button type="primary" icon={<DeleteOutlined />} danger />
            </Tooltip>
          </Popconfirm>
        )}
      </div>
      <div className="listFooter__centerContainer">
        {!!listStore.selectedTasks.length &&
          (window.innerWidth > 530 ? (
            <>
              {listStore.selectedTasks.length} task
              {listStore.selectedTasks.length > 1 && "s"} selected
            </>
          ) : (
            listStore.selectedTasks.length
          ))}
      </div>
      <div className="listFooter__rightContainer">
        {listStore.selectedTasks.length ? (
          <>
            <Tooltip
              title={
                <>
                  Mark as <b>un</b>done
                </>
              }
            >
              <Button
                type="primary"
                icon={<CloseOutlined />}
                onClick={() => {
                  listStore.setTasksArchived(false);
                }}
                style={{
                  background: "rgba(229, 152, 102, .9)",
                  borderColor: "rgba(229, 152, 102, 1)",
                }}
              />
            </Tooltip>
            &nbsp; &nbsp;
            <Tooltip title="Mark as done">
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => {
                  listStore.setTasksArchived(true);
                }}
                style={{
                  background: "rgba(102, 187, 106,1)",
                  borderColor: "rgba(76, 175, 80, 1)",
                }}
              />
            </Tooltip>
          </>
        ) : (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              listStore.setTaskInEditMode(0);
            }}
          >
            {window.innerWidth > 460 && "New Task"}
          </Button>
        )}
      </div>
    </div>
  );
});
