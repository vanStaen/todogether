import React from "react";
import { Radio, Tooltip } from 'antd';
import { observer } from "mobx-react";
import { UnorderedListOutlined, DatabaseOutlined, AppstoreOutlined, CheckSquareOutlined, CloseSquareOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./ListHeader.css";

export const ListHeader = observer(() => {
  return (
    <div className="listHeader">
      <div className="listHeader__ListNameContainer">
        <Tooltip title="Switch between list">
          <div className="listHeader__rowLogo">
            <UnorderedListOutlined />
          </div>
        </Tooltip>
        My shared todolist
      </div>
      <div className="listHeader__SwitchContainer">
        <Tooltip title="Change display">
          <div className="listHeader__Switch">
            <Radio.Group defaultValue={listStore.displayAslist} size="small" buttonStyle="solid">
              <Radio.Button value={true}><DatabaseOutlined /></Radio.Button>
              <Radio.Button value={false}><AppstoreOutlined /></Radio.Button>
            </Radio.Group>
          </div>
        </Tooltip>
        <Tooltip title={listStore.showCompleted ? "Hide completed task" : "Show completed task"}>
          <div className="listHeader__Switch">
            <Radio.Group defaultValue={listStore.showCompleted} size="small" buttonStyle="solid">
              <Radio.Button value={true}><CheckSquareOutlined /></Radio.Button>
              <Radio.Button value={false}><CloseSquareOutlined /></Radio.Button>
            </Radio.Group>
          </div>
        </Tooltip>
      </div>
    </div>
  );
});
