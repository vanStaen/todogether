import React from "react";
import {
  EditOutlined,
  PictureOutlined,
  CommentOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import { listStore } from "../../../../stores/listStore/listStore";

import "./ActionRow.css";

export const ActionRow = (props) => {
  const colorLogo = props.completed ? "#bbb7ac" : "inherit";
  const editPointer = props.completed ? "not-allowed" : "cursor";

  return (
    <>
      <div className="actionRow">
        {props.showActionItems && (
          <div className="actionRow__actionContainer">
            <div className="actionRow__action">
              <PictureOutlined style={{ color: colorLogo }} />
            </div>
            <div className="actionRow__action">
              <CommentOutlined style={{ color: colorLogo }} />
            </div>
            <div className="actionRow__action">
              <EditOutlined style={{ color: colorLogo }} />
            </div>
          </div>
        )}
        <div className="actionRow__moreContainer">
          <MoreOutlined
            className="actionRow__more"
            onClick={() => props.setShowActionItems(!props.showActionItems)}
          />
        </div>
      </div>
    </>
  );
};

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
