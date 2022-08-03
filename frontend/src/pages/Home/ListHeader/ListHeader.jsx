import React, { useState } from "react";
import { Radio, Tooltip } from "antd";
import { observer } from "mobx-react";
import {
  UnorderedListOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
  LoadingOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { listStore } from "../../../stores/listStore/listStore";

import "./ListHeader.css";

export const ListHeader = observer(() => {
  const [showListOfLists, setShowListOfLists] = useState(false);

  const ShowListClickHander = () => {
    setShowListOfLists(!showListOfLists);
  };

  const showCompletedClickHandler = (e) => {
    listStore.setShowCompleted(e.target.value);
  };

  const displayAsListClickHandler = (e) => {
    listStore.setDisplayAslist(e.target.value);
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
        <div className="listHeader__ListNameContainer">
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
        {!listStore.taskInEditMode && (
          <div className="listHeader__SwitchContainer">
            <div className="listHeader__Switch">
              <Radio.Group
                defaultValue={listStore.displayAslist}
                size="small"
                buttonStyle="solid"
                onChange={displayAsListClickHandler}
              >
                <Radio.Button value={true}>
                  <Tooltip title="Display as a list">
                    <DatabaseOutlined />
                  </Tooltip>
                </Radio.Button>
                <Radio.Button value={false}>
                  <Tooltip title="Display as a grid">
                    <AppstoreOutlined />
                  </Tooltip>
                </Radio.Button>
              </Radio.Group>
            </div>
            &nbsp;
            <div className="listHeader__Switch">
              <Radio.Group
                defaultValue={listStore.showCompleted}
                size="small"
                buttonStyle="solid"
                onChange={showCompletedClickHandler}
              >
                <Radio.Button value={true}>
                  <Tooltip title="Show all task">
                    <CheckSquareOutlined />
                  </Tooltip>
                </Radio.Button>
                <Radio.Button value={false}>
                  <Tooltip title="Hide completed task">
                    <CloseSquareOutlined />
                  </Tooltip>
                </Radio.Button>
              </Radio.Group>
            </div>
          </div>
        )}
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
