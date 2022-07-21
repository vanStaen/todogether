import React from "react";
import { EditOutlined } from "@ant-design/icons";

import "./ListRow.css";

export const ListRow = (props) => {

 const handleCheckboxClick = () => {
    console.log('Checkbox was clicked!')
 }

 return (
    <div className={`row ${props.completed ? 'row__noBar' : 'row__goldBar'}`}>
        <div className="row__checkboxContainer">
             { props.selected ? 
             <input type="checkbox" checked onChange={handleCheckboxClick} className="row__checkbox"/>
             :
             <input type="checkbox" onChange={handleCheckboxClick} className="row__checkbox"/>} 
        </div>
        {props.name}
    </div>
  );
};
