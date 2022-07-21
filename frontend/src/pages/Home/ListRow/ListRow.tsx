import React from "react";
import { observer } from "mobx-react";
import { EditOutlined } from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./ListRow.css";

export const ListRow = observer((props) => {

  if (listStore.showCompleted = false && props.completed) {
    return null
  }

  return (
    <div className={`row ${props.completed ? 'row__noBar' : 'row__goldBar'}`}>
        <div className="row__checkboxContainer">
            <input type="checkbox" className="row__checkbox" />
        </div>
        {props.name}
    </div>
  );
});
