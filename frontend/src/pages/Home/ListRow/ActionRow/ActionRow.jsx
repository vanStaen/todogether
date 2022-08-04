import React from "react";
import { observer } from "mobx-react";
import {
  EditOutlined,
  PictureOutlined,
  CommentOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import { listStore } from "../../../../stores/listStore/listStore";

import "./ActionRow.css";

export const ActionRow = observer((props) => {
  const colorLogo = props.completed ? "#bbb7ac" : "inherit";
  const editPointer = props.completed ? "not-allowed" : "cursor";

  const showEditBarhandler = () => {
    if (listStore.showActionBar === props.task._id) {
      listStore.setShowActionBar(null);
    } else {
      listStore.setShowActionBar(props.task._id);
    }
  };

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
        {listStore.showActionBar === props.task._id && (
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
        )}
        <div className="actionRow__moreContainer">
          <MoreOutlined
            className="actionRow__more"
            onClick={showEditBarhandler}
          />
        </div>
      </div>
    </>
  );
});
