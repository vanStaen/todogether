import React from "react";
import { observer } from "mobx-react";
import { Tooltip, Button } from "antd";
import { DeleteOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./ListFooter.css";

export const ListFooter = observer(() => {
  return (
    <div className="listFooter">
      <div className="listFooter__leftContainer">
        {!!listStore.selectedTasks.length && (
          <Tooltip title="Delete selected tasks">
            <Button type="primary" icon={<DeleteOutlined />} danger />
          </Tooltip>
        )}
      </div>
      <div className="listFooter__centerContainer">
        {!!listStore.selectedTasks.length && (
          <>
            {listStore.selectedTasks.length} task
            {listStore.selectedTasks.length > 1 && "s"} selected
          </>
        )}
      </div>
      <div className="listFooter__rightContainer">
        {listStore.selectedTasks.length ? (
          <>
            <Tooltip title="Mark selected tasks as done">
              <Button
                type="primary"
                icon={<CheckOutlined />}
                style={{
                  background: "rgba(102, 187, 106,1)",
                  borderColor: "rgba(76, 175, 80, 1)",
                }}
              />
            </Tooltip>
          </>
        ) : (
          <Button type="primary" icon={<PlusOutlined />}>
            New Task
          </Button>
        )}
      </div>
    </div>
  );
});
