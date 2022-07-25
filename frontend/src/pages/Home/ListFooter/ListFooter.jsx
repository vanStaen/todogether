import React from "react";
import { observer } from "mobx-react";
import { Tooltip, Button } from 'antd';
import { DeleteOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";


import "./ListFooter.css";

export const ListFooter = observer(() => {
  return (
    <div className="listFooter">
      <div className="listFooter__leftContainer">
        3 task selected
      </div>
      <div className="listFooter__actionContainer">
        <Tooltip title="Mark selected task as done">
          <Button type="success"><CheckOutlined /></Button>
        </Tooltip>
        <Tooltip title="Delete selected task">
          <Button type="primary" danger><DeleteOutlined /></Button>
        </Tooltip>
        <Tooltip title="Add new task">
          <Button><PlusOutlined /></Button>
        </Tooltip>
      </div>
    </div>
  );
});
