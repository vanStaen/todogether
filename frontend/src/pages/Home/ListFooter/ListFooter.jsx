import React from "react";
import { Radio, Tooltip } from 'antd';
import { observer } from "mobx-react";

import "./ListFooter.css";

export const ListFooter = observer(() => {
  return (
    <div className="listFooter">
      <div className="listFooter__leftContainer">
        3 task selected
      </div>
      <div className="listFooter__actionContainer">
        <Tooltip title="Add task">
          Add task
        </Tooltip>
      </div>
    </div>
  );
});
