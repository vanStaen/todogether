import React from "react";
import { observer } from "mobx-react";
import {
  EditOutlined,
  PictureOutlined,
  CommentOutlined,
} from "@ant-design/icons";

import { listStore } from "../../../../stores/listStore/listStore";

import "./ActionRow.css";

export const ActionRow = observer((props) => {
  const colorLogo = props.completed ? "#bbb7ac" : "inherit";
  const editPointer = props.completed ? "not-allowed" : "cursor";

  const handlePictureClick = () => {
    listStore.setShowPictureGallery(true);
    console.log("This should open the image gallery!");
  };

  const handleCommentClick = () => {
    console.log("This should open the comments!");
  };

  return (
    <>
      <div className="actionRow">
        <div className="actionRow__actionContainer">
          <div className="actionRow__action" onClick={handleCommentClick}>
            <PictureOutlined style={{ color: colorLogo }} />
          </div>
          <div className="actionRow__action" onClick={handlePictureClick}>
            <CommentOutlined style={{ color: colorLogo }} />
          </div>
          <div
            className="actionRow__action"
            onClick={() => {
              listStore.setTaskInEditMode(props.task);
            }}
          >
            <EditOutlined style={{ color: colorLogo, cursor: editPointer }} />
          </div>
        </div>
      </div>
    </>
  );
});
