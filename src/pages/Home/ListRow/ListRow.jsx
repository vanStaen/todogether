import React, { useState, useRef } from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { DeleteOutlined, CheckOutlined, UndoOutlined } from "@ant-design/icons";

import { taskStore } from '../../../stores/taskStore/taskStore.js';

import "./ListRow.less";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 20;

export const ListRow = observer((props) => {
  const { key, task, windowInnerWidth } = props;
  const { archived, desc, id, title } = task;
  const [showActions, setShowActions] = useState(false);

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
      } else if (isRightSwipe) {
        handleHideActionsMobile();
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
  }

  const handleHideActionsMobile = () => {
    const actionsMobileDiv = document.getElementById(`row__actionsMobile${id}`);
    if (actionsMobileDiv) {
      actionsMobileDiv.style.right = 0;
    }
  }

  return (
    <div
      className={`row ${archived ? "row__archived" : "row__active"}`}
      key={key}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="row__container"
        id={`row__container${id}`}
        onMouseOver={() => {
          windowInnerWidth >= 600 && setShowActions(true);
        }}
        onMouseLeave={() => {
          windowInnerWidth >= 600 && setShowActions(false);
        }}
        onClick={handleHideActionsMobile}
      >
        <div className={`row__title ${!desc && "row__noDesc"}`}>
          {title}
        </div>
        <div className="row__desc">
          {task.desc && task.desc.substring(0, 4) === "http" ? (
            <div className="row__linkDesc">
              <a href={task.desc} target="_blank" rel="noreferrer">
                {task.desc}
              </a>
            </div>
          ) : (
            <div className="row__text row__desc">{task.desc}</div>
          )}
        </div>
        {showActions &&
          <div className="row__actions">
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
      {windowInnerWidth < 600 &&
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
        </div>}
    </div>
  );
});
