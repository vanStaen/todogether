import React from "react";
import { EditOutlined } from "@ant-design/icons";

import "./ListRow.css";

export const ListRow = (props) => {
 return (
    <div className={`row ${props.completed ? 'row__noBar' : 'row__goldBar'}`}>
        <div className="row__checkboxContainer">
            <input type="checkbox" className="row__checkbox" />
        </div>
        {props.name}
    </div>
  );
};
