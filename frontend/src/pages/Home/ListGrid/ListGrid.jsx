import React from "react";
import { observer } from "mobx-react";

import { listStore } from "../../../stores/listStore/listStore";

import "./ListGrid.css";

export const ListGrid = observer((props) => {
  return (
    <div className="grid__container">
      <div className="grid__background">
        <div className="grid__pic">{props.id}</div>
        <div className="grid__titleContainer">
          <div className="grid__title">{props.name}</div>
          {props.desc && <div className="grid__desc">{props.desc}</div>}
        </div>
      </div>
    </div>
  );
});
