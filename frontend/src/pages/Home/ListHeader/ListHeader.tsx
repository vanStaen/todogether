import React from "react";
import { Radio } from 'antd';
import { observer } from "mobx-react";
import { UnorderedListOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./ListHeader.css";

export const ListHeader = observer(() => {
  return (
    <div className="listHeader">
    <div className="listHeader__rowLogo">
        <UnorderedListOutlined />
    </div>
    My shared todolist
    <div className="listHeader__SwitchShowDone">
        <Radio.Group defaultValue={listStore.showCompleted} buttonStyle="solid">
            <Radio.Button value={true}>Show completed</Radio.Button>
            <Radio.Button value={false}>Hide completed</Radio.Button>
        </Radio.Group>
    </div>
    </div>
  );
});
