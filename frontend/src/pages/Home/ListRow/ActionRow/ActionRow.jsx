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
          <div
            className="actionRow__action"
            onClick={handleCommentClick}
            style={{ cursor: editPointer }}
          >
            <PictureOutlined style={{ color: colorLogo }} />
            {window.innerWidth > 600 && (
              <span className="actionRow__actionTitle">
                &nbsp;&nbsp;Picture
              </span>
            )}
          </div>
          <div
            className="actionRow__action actionRow__actionMiddleMargin"
            style={{ cursor: editPointer }}
            onClick={handlePictureClick}
          >
            <CommentOutlined style={{ color: colorLogo }} />
            {window.innerWidth > 600 && (
              <span className="actionRow__actionTitle">
                &nbsp;&nbsp;Comment
              </span>
            )}
          </div>
          <div
            className="actionRow__action"
            style={{ cursor: editPointer }}
            onClick={() => {
              if (!props.completed) {
                listStore.setTaskInEditMode(props.task);
              }
            }}
          >
            <EditOutlined style={{ color: colorLogo }} />
            {window.innerWidth > 600 && (
              <span className="actionRow__actionTitle">&nbsp;&nbsp;Edit</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
});
