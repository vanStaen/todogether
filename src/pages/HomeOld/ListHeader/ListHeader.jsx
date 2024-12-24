import React, { useState } from "react";
import { Tooltip, Checkbox } from "antd";
import { observer } from "mobx-react";
import {
  UnorderedListOutlined,
  LoadingOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

import { taskStore } from "../../../stores/taskStore/taskStore";
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
    taskStore.unselectAllTasks();
  };

  const listOflists = taskStore.myLists.map((list) => {
    const arrayUnDoneTask = list.tasks.filter((task) => !task.archived);

    return (
      <div className="listHeader__listsOfList" key={list.id}>
        <div
          className="listHeader__listsOfListMain"
          onClick={() => {
            taskStore.setSelectedList(list);
            taskStore.setListInEditMode(null);
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
                taskStore.setListInEditMode(list);
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
        {!!taskStore.selectedTasks.length ? (
          <div className="listHeader__taskCountHeader">
            <div className="listHeader__checkboxContainer">
              <div>
                <Checkbox
                  checked={true}
                  onChange={handleCheckboxUnselectAllClick}
                  className="listHeader__checkbox"
                ></Checkbox>
              </div>
            </div>
            <span
              style={{ paddingLeft: "16px" }}
              onClick={handleCheckboxUnselectAllClick}
            >
              {taskStore.selectedTasks.length} task
              {taskStore.selectedTasks.length > 1 && "s"} selected
            </span>
          </div>
        ) : (
          <>
            <div
              className="listHeader__ListNameContainer"
              id="listHeader__ListNameContainer"
            >
              <Tooltip title="Switch between list">
                <div
                  className="listHeader__rowLogo"
                  onClick={ShowListClickHander}
                >
                  <UnorderedListOutlined />
                </div>
              </Tooltip>
              {taskStore.listInEditMode !== null ? (
                taskStore.listInEditMode === 0 ? (
                  "New list"
                ) : (
                  "Edit list"
                )
              ) : taskStore.selectedList ? (
                taskStore.selectedList.title
              ) : (
                <LoadingOutlined />
              )}
            </div>
            <ActionRowHeader />
          </>
        )}
      </div>
      {showListOfLists && (
        <>
          <div className="listHeader__listOfListsContainer" id="listOfLists">
            {taskStore.myLists.length ? (
              <>
                {listOflists}
                <div
                  className="listHeader__listsOfListCreate"
                  key="createNewList"
                  onClick={() => {
                    taskStore.setListInEditMode(0);
                    taskStore.setTaskInEditMode(null);
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
