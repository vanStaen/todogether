import React, { useState } from "react";
import { Tooltip, Checkbox } from "antd";
import { observer } from "mobx-react";
import {
  UnorderedListOutlined,
  LoadingOutlined,
  EditOutlined,
  PlusSquareOutlined,
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

  const handleCheckboxUnselectAllClick = () => {
    listStore.unselectAllTasks();
  }

  const listOflists = listStore.myLists.map((list) => {
    const arrayUnDoneTask = list.tasks.filter((task) => !task.archived);

    return (
      <div className="listHeader__listsOfList" key={list._id}>
        <div
          className="listHeader__listsOfListMain"
          onClick={() => {
            listStore.setSelectedList(list);
            listStore.setListInEditMode(null);
            setShowListOfLists(false);
          }}
        >
          <span className="listHeader__title">{list.title}</span>
          {list.desc && (
            <span className="listHeader__desc">&nbsp;|&nbsp;{list.desc} </span>
          )}
        </div>
        <div className="listHeader__taskCount">
          {arrayUnDoneTask.length} task{arrayUnDoneTask.length > 1 && "s"}
          &nbsp;
          <Tooltip title="Edit this list">
            <EditOutlined
              className="listHeader__editList"
              onClick={() => {
                listStore.setListInEditMode(list);
                hideListOfListsHandler();
              }}
            />
          </Tooltip>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="listHeader">
        {!!listStore.selectedTasks.length ?
          (<div className="listHeader__taskCountHeader">
            <div className="listHeader__checkboxContainer">
              <div>
                <Checkbox
                  checked={true}
                  onChange={handleCheckboxUnselectAllClick}
                  className="listHeader__checkbox"
                ></Checkbox>
              </div>
            </div>
            <span style={{ paddingLeft: "16px" }}>
              {listStore.selectedTasks.length} task
              {listStore.selectedTasks.length > 1 && "s"} selected
            </span>
          </div>
          ) :
          (<>
            <div
              className="listHeader__ListNameContainer"
              id="listHeader__ListNameContainer"
            >
              <Tooltip title="Switch between list">
                <div className="listHeader__rowLogo" onClick={ShowListClickHander}>
                  <UnorderedListOutlined />
                </div>
              </Tooltip>
              {listStore.listInEditMode !== null ? (
                listStore.listInEditMode === 0 ? (
                  "New list"
                ) : (
                  "Edit list"
                )
              ) : listStore.selectedList ? (
                listStore.selectedList.title
              ) : (
                <LoadingOutlined />
              )}
            </div>
            <ActionRowHeader />
          </>)}
      </div>
      {showListOfLists && (
        <>
          <div className="listHeader__listOfListsContainer" id="listOfLists">
            {listStore.myLists.length ? (
              <>
                {listOflists}
                <div
                  className="listHeader__listsOfListCreate"
                  key="createNewList"
                  onClick={() => {
                    listStore.setListInEditMode(0);
                    listStore.setTaskInEditMode(null);
                    hideListOfListsHandler();
                  }}
                >
                  <div className="listHeader__listsOfListMain">
                    <PlusSquareOutlined />
                    <span className="listHeader__createTitle">
                      Create new list
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="listHeader__Loading">
                <div className="listHeader__listsOfListMain">
                  <LoadingOutlined />
                  &nbsp;&nbsp; Your lists are loading
                </div>
              </div>
            )}
          </div>
          <div className="fullScreen" onClick={hideListOfListsHandler}></div>
        </>
      )}
    </div>
  );
});
