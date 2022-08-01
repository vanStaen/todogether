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
    if (listStore.showActionBar === props.id) {
      listStore.setShowActionBar(null);
    } else {
      listStore.setShowActionBar(props.id);
    }
  };

  const handleEditClick = () => {
    if (!props.completed) {
      listStore.setTaskInEditMode(props.id);
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
        {listStore.showActionBar === props.id && (
          <div className="actionRow__actionContainer">
            <div className="actionRow__action" onClick={handleCommentClick}>
              <PictureOutlined style={{ color: colorLogo }} />
            </div>
            <div className="actionRow__action" onClick={handlePictureClick}>
              <CommentOutlined style={{ color: colorLogo }} />
            </div>
            <div className="actionRow__action" onClick={handleEditClick}>
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

/* 
{props.hasPicture && (
        <div className="row__picture" onClick={handlePictureClick}>
          <PictureOutlined style={{ color: colorLogo }} />
        </div>
      )}
      {props.hasComment && (
        <div className="row__picture" onClick={handlePictureClick}>
          <CommentOutlined style={{ color: colorLogo }} />
        </div>
      )}
      <div className="row__edit">
        <EditOutlined
          style={{ cursor: editPointer, color: colorLogo }}
          onClick={handleEditClick}
        />
      </div>
*/
