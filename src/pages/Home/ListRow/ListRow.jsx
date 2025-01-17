import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Dropdown } from "antd";
import { DeleteOutlined, CheckOutlined, UndoOutlined } from "@ant-design/icons";

import { taskStore } from '../../../stores/taskStore/taskStore.js';
import { getMenuCategories } from "./Categories";

import "./ListRow.less";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 50;

export const ListRow = observer((props) => {
  const { key, task, windowInnerWidth } = props;
  const { archived, desc, id, title, categorie } = task;
  const [showActions, setShowActions] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const touchStart = useRef(null);
  const touchEnd = useRef(null);
  const throttling = useRef(false);

  const onTouchStart = (e) => {
    touchEnd.current = null; // otherwise the swipe is fired even with usual touch events
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    if (throttling.current === false) {
      throttling.current = true;
      if (isLeftSwipe) {
        handleShowActionsMobile();
        handleHideCategory();
      } else if (isRightSwipe) {
        handleHideActionsMobile();
        handleShowCategory();
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

  const handleShowActionsMobile = () => {
    const actionsMobileDiv = document.getElementById(`row__actionsMobile${id}`);
    actionsMobileDiv.style.right = `${actionsMobileDiv.getBoundingClientRect().width}px`;
    const allActionsMobileDiv = document.getElementsByClassName('row__actionsMobile');
    if (allActionsMobileDiv.length) {
      for (let i = 0; i < allActionsMobileDiv.length; i++) {
        if (allActionsMobileDiv[i].id !== `row__actionsMobile${id}`) {
          allActionsMobileDiv[i].style.right = 0;
        };
      }
    }
    setShowActions(true);
    const allCategoryDiv = document.getElementsByClassName('row__category');
    if (allCategoryDiv.length) {
      for (let i = 0; i < allCategoryDiv.length; i++) {
        allCategoryDiv[i].style.minWidth = '7px';
      }
    }
    setShowCategory(false);
  }

  const handleHideActionsMobile = () => {
    const actionsMobileDiv = document.getElementById(`row__actionsMobile${id}`);
    if (actionsMobileDiv) {
      actionsMobileDiv.style.right = 0;
    }
    setShowActions(false);
  }

  const handleShowCategory = () => {
    const categoryDiv = document.getElementById(`row__category${id}`);
    const categoryNameDiv = document.getElementById(`row__categoryNameGhost${id}`);
    categoryDiv.style.minWidth = `${categoryNameDiv.getBoundingClientRect().width}px`;
    const allCategoryDiv = document.getElementsByClassName('row__category');
    if (allCategoryDiv.length) {
      for (let i = 0; i < allCategoryDiv.length; i++) {
        if (allCategoryDiv[i].id !== `row__category${id}`) {
          allCategoryDiv[i].style.minWidth = '7px';
        };
      }
    }
    setShowCategory(true);
    const allActionsMobileDiv = document.getElementsByClassName('row__actionsMobile');
    if (allActionsMobileDiv.length) {
      for (let i = 0; i < allActionsMobileDiv.length; i++) {
        allActionsMobileDiv[i].style.right = 0;
      }
    }
    setShowActions(false);
  }

  const handleHideCategory = () => {
    const actionsMobileDiv = document.getElementById(`row__category${id}`);
    if (actionsMobileDiv) {
      actionsMobileDiv.style.minWidth = '7px';
    }
    setShowCategory(false);
  }

  const handleCloseAllActions = () => {
    handleHideActionsMobile();
    handleHideCategory();
  }

  const categoryName = task.category || 'Private';
  const items = getMenuCategories();

  useEffect(() => {
    if (archived) {
      const actionsMobileDiv = document.getElementById(`row__category${id}`);
      if (actionsMobileDiv) {
        actionsMobileDiv.style.backgroundColor = 'transparent';
      }
    } else {
      // TODO restore correct color
    }

  }, [archived])

  return (
    <div
      className={`row ${archived ? "row__archived" : "row__active"}`}
      key={key}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="row__category" id={`row__category${id}`} onClick={showCategory ? handleHideCategory : handleShowCategory}>
        <div className="row__categoryName" >
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <div onClick={(e) => e.stopPropagation()}>
              {categoryName}
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="row__categoryNameGhost" id={`row__categoryNameGhost${id}`}>
        {categoryName}
      </div>
      <div
        className="row__container"
        id={`row__container${id}`}
        onMouseOver={() => {
          windowInnerWidth >= 600 && setShowActions(true);
        }}
        onMouseLeave={() => {
          windowInnerWidth >= 600 && setShowActions(false);
        }}
        onClick={handleCloseAllActions}
      >
        <div className={`row__title ${!desc && "row__noDesc"}`}>
          {title}
        </div>
        <div className="row__desc">
          {(windowInnerWidth > 600 || (!showActions && !showCategory)) && task.desc && task.desc.substring(0, 4) === "http" ? (
            <a href={task.desc} target="_blank" rel="noreferrer">
              {task.desc}
            </a>
          ) : task.desc}
        </div>
        {showActions && windowInnerWidth >= 600 &&
          < div className="row__actions">
            <div className='row__actionButtons' onClick={() => taskStore.archiveTask(id, !archived)}>
              {archived ? <Button
                color="default"
                variant="filled"
                icon={<UndoOutlined />}
              /> : <Button
                color="green"
                variant="solid"
                icon={<CheckOutlined />}
              />}
            </div>
            <div className='row__actionButtons' onClick={() => taskStore.deleteTask(id)}>
              {archived ? <Button
                color="danger"
                variant="filled"
                icon={<DeleteOutlined />}
              /> : <Button
                color="danger"
                variant="solid"
                icon={<DeleteOutlined />}
              />}
            </div>
          </div>}
      </div>
      {
        windowInnerWidth < 600 &&
        <div className="row__actionsMobile" id={`row__actionsMobile${id}`}>
          <div className='row__actionButtons' onClick={() => taskStore.archiveTask(id, !archived)}>
            {archived ? <Button
              color="default"
              variant="filled"
              icon={<UndoOutlined />}
            >Mark as undone</Button> : <Button
              color="green"
              variant="solid"
              icon={<CheckOutlined />}
            >Mark as done</Button>}
          </div>
          <div className='row__actionButtons' onClick={() => taskStore.deleteTask(id)}>
            {archived ? <Button
              color="danger"
              variant="filled"
              icon={<DeleteOutlined />}
            >Delete</Button> : <Button
              color="danger"
              variant="solid"

              icon={<DeleteOutlined />}
            >Delete</Button>}
          </div>
        </div>
      }
    </div >
  );
});
