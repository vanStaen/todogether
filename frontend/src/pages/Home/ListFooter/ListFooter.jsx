import React from "react";
import { observer } from "mobx-react";
import { Tooltip, Button } from 'antd';
import { DeleteOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";


import "./ListFooter.css";

export const ListFooter = observer(() => {
  return (
    <div className="listFooter">
      <div className="listFooter__leftContainer">
        3 tasks selected
      </div>
      <div className="listFooter__actionContainer">
        <Tooltip title="Delete selected tasks">
          <Button type="primary" icon={<DeleteOutlined />} danger />
        </Tooltip>
        &nbsp;
        <Tooltip title="Mark selected tasks as done">
          <Button type="primary" icon={<CheckOutlined />} style={{ background: "rgba(102, 187, 106,1)", borderColor: "rgba(76, 175, 80, 1)" }} />
        </Tooltip>
        &nbsp;
        <Tooltip title="Add new task">
          <Button type="primary" icon={<PlusOutlined />} />
        </Tooltip>
      </div>
    </div>
  );
});
