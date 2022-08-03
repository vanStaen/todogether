import React, { useState } from "react";
import { Tooltip } from "antd";
import { observer } from "mobx-react";
import {
  UnorderedListOutlined,
  LoadingOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";
import { ActionRowHeader } from "./ActionRowHeader/ActionRowHeader";

import "./ListHeader.css";

export const ListHeader = observer(() => {
  const [showListOfLists, setShowListOfLists] = useState(false);

  const ShowListClickHander = () => {
    setShowListOfLists(!showListOfLists);
  };

  const hideListOfListsHandler = () => {
    setShowListOfLists(false);
  };

  const listOflists = listStore.myLists.map((list) => {
    return (
      <div
        className="listHeader__listsOfList"
        onClick={() => {
          listStore.setSelectedList(list);
          setShowListOfLists(false);
        }}
        key={list._id}
      >
        <span className="listHeader__title">{list.title}</span>
        <span className="listHeader__desc">
          &nbsp;|&nbsp;{list.desc}{" "}
          <span className="listHeader__taskCount">
            {list.tasks.length} task{list.tasks.length > 1 && "s"}
            &nbsp;
            <Tooltip title="Edit this list">
              <EditOutlined className="listHeader__editList" />
            </Tooltip>
          </span>
        </span>
      </div>
    );
  });

  return (
    <div>
      <div className="listHeader">
        <div className="listHeader__ListNameContainer" id="listHeader__ListNameContainer">
          <Tooltip title="Switch between list">
            <div className="listHeader__rowLogo" onClick={ShowListClickHander}>
              <UnorderedListOutlined />
            </div>
          </Tooltip>
          {listStore.selectedList ? (
            listStore.selectedList.title
          ) : (
            <LoadingOutlined />
          )}
        </div>
        <ActionRowHeader />
      </div>
      {showListOfLists && (
        <>
          <div className="listHeader__listOfListsContainer" id="listOfLists">
            {listStore.myLists.length ? (
              listOflists
            ) : (
              <div className="listHeader__Loading">
                <LoadingOutlined />
                &nbsp;&nbsp; Your lists are loading
              </div>
            )}
          </div>
          <div className="fullScreen" onClick={hideListOfListsHandler}></div>
        </>
      )}
    </div>
  );
});
