import React from "react";
import { observer } from "mobx-react";

import { ActionRow } from "../ActionRow/ActionRow";

import "./DetailRow.css";

export const DetailRow = observer((props) => {
  return (
    <div className="detailRow">
      <div className="detailRow__text">
        {props.task.title}
        {props.task.desc && `: ${props.task.desc}`}
      </div>
      <ActionRow completed={props.task.archived} task={props.task} />
    </div>
  );
});
