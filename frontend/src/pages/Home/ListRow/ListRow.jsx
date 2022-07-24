import React, { useState } from "react";
import { Checkbox } from 'antd';
import { EditOutlined } from "@ant-design/icons";

import "./ListRow.css";

export const ListRow = (props) => {
   const [isSelected, setIsSelected] = useState(props.selected);

   const handleCheckboxClick = () => {
      console.log("clicked");
      setIsSelected(!isSelected);
   }

   return (
      <div className={`row ${props.completed ? 'row__noBar' : 'row__goldBar'}`}>
         <div className="row__checkboxContainer">
            <div>
               <Checkbox defaultChecked={isSelected} onChange={handleCheckboxClick} className="row__checkbox"></Checkbox>
            </div>
         </div>
         <div className="row__textContainer">
            {props.name}
         </div>
         <div className="row__edit">
            <EditOutlined style={{ cursor: "pointer" }} />
         </div>
      </div>
   );
};
