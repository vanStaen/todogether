import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Dropdown, Modal } from "antd";
import { EditOutlined, CheckOutlined, UndoOutlined, DeleteOutlined } from "@ant-design/icons";

import { taskStore } from '../../../stores/taskStore/taskStore.js';
import { useMenuCategories, ModalCategories } from "./Categories";

import "./ListRow.less";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 50;

export const ListRow = observer((props) => {
  const { task, windowInnerWidth } = props;
  const { archived, desc, id, title } = task;
  const [showActions, setShowActions] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [catModalOpened, setCatModalOpened] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isArchived, setIsArchived] = useState(archived);

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
    // expand category div
    const categoryDiv = document.getElementById(`row__category${id}`);
    const categoryNameDiv = document.getElementById(`row__categoryNameGhost${id}`);
    categoryDiv.style.minWidth = `${categoryNameDiv.getBoundingClientRect().width}px`;

    // resize the main container div
    const rowContainerDiv = document.getElementById(`row__container${id}`);
    rowContainerDiv.style.width = `${rowContainerDiv.getBoundingClientRect().width - categoryNameDiv.getBoundingClientRect().width - 8}px`;

    // retract all other category divs
    const allCategoryDiv = document.getElementsByClassName('row__category');
    const allContainerDiv = document.getElementsByClassName('row__container');
    if (allCategoryDiv.length) {
      for (let i = 0; i < allCategoryDiv.length; i++) {
        if (allCategoryDiv[i].id !== `row__category${id}`) {
          allCategoryDiv[i].style.minWidth = '7px';
          allContainerDiv[i].style.width = 'calc(100vw - 123px)';
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
    const rowContainerDiv = document.getElementById(`row__container${id}`);
    rowContainerDiv.style.width = 'calc(100vw - 123px)';
    setShowCategory(false);
  }

  const handleCloseAllActions = () => {
    handleHideActionsMobile();
    handleHideCategory();
  }

  const handleArchiveClick = async () => {
    await taskStore.archiveTask(id, !isArchived);
    await setIsArchived(!isArchived);
    if (windowInnerWidth <= 600) {
      const actionsMobileDiv = document.getElementById(`row__actionsMobile${id}`);
      actionsMobileDiv.style.right = `${actionsMobileDiv.getBoundingClientRect().width}px`;
    }
  }

  const categorieName = task.categorie ? task.categorie.title : 'Private';
  const items = useMenuCategories("update", id);

  useEffect(() => {
    const actionsMobileDiv = document.getElementById(`row__category${id}`);
    if (isArchived) {
      if (actionsMobileDiv) {
        actionsMobileDiv.style.backgroundColor = 'transparent';
      }
    } else {
      actionsMobileDiv.style.backgroundColor = task.categorie?.color;
    }
    if (showCategory) {
      handleShowCategory();
    }
  }, [isArchived, task])

  const keypressHandler = (e) => {
    if (showConfirmDelete && e.key === "Enter") {
      taskStore.deleteTask(id);
      setShowConfirmDelete(false)
    }
  }

  useEffect(() => {
      window.addEventListener("keypress", keypressHandler);
      return () => {
        window.removeEventListener("keypress", keypressHandler);
      };
    }, [keypressHandler]);

  const handleOpenModal = () => {
    (e) => e.stopPropagation();
    setCatModalOpened(true);
  }

  return (
    <div
      className={`row ${isArchived ? "row__archived" : "row__active"}`}
      key={task.id}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Modal
        title={<div style={{marginBottom: 15}}>Delete this task?</div>}
        centered
        width={250}
        open={showConfirmDelete}
        footer={[
          <Button 
            key="cancel" 
            type="default" 
            onClick={() => setShowConfirmDelete(false)}
            style={{width: 'calc(50% - 4px)'}}
            >
            Delete
          </Button>,
          <Button 
            key="submit"
            color="red"
            variant="solid"
            onClick={() => {
              taskStore.deleteTask(id);
              setShowConfirmDelete(false)
            }}
            style={{width: 'calc(50% - 5px)'}}
            >
            Delete
          </Button>,
        ]}
      >
      </Modal>
      <div
        className="row__category"
        id={`row__category${id}`}
        onClick={showCategory ? handleHideCategory : handleShowCategory}
      >
        <div className="row__categoryName" >
          {windowInnerWidth >= 600 ?
            <Dropdown
              menu={{
                items,
              }}
              trigger={['click']}
            >
              <div onClick={(e) => e.stopPropagation()}>
                {categorieName}
              </div>
            </Dropdown> :
            <>
              <ModalCategories
                catModalOpened={catModalOpened}
                setCatModalOpened={setCatModalOpened}
                taskId={id}
              />
              <div onClick={handleOpenModal}>
                {categorieName}
              </div>
            </>

          }
        </div>
      </div>
      <div className="row__categoryNameGhost" id={`row__categoryNameGhost${id}`}>
        {categorieName}
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
            <div className='row__actionButtons' onClick={() => handleArchiveClick()}>
              {isArchived ? <Button
                color="default"
                variant="filled"
                icon={<UndoOutlined />}
              /> : <Button
                color="green"
                variant="solid"
                icon={<CheckOutlined />}
              />}
            </div>
            <div className='row__actionButtons'>
              {isArchived ? <Button
                color="red"
                variant="solid"
                icon={<DeleteOutlined />}
                onClick={() => setShowConfirmDelete(true)}
              /> : <Button
                color="blue"
                variant="solid"
                icon={<EditOutlined />}
                onClick={() => console.log('edit', id)}
              />}
            </div>
          </div>}
      </div>
      {
        windowInnerWidth < 600 &&
        <div className="row__actionsMobile" id={`row__actionsMobile${id}`}>
          <div className='row__actionButtons' onClick={() => handleArchiveClick()}>
            {isArchived ? <Button
              color="default"
              variant="filled"
              icon={<UndoOutlined />}
            >Reopen</Button> : <Button
              color="green"
              variant="solid"
              icon={<CheckOutlined />}
            >Done</Button>}
          </div>
          <div className='row__actionButtons'>
            {isArchived ? <Button
              color="red"
              variant="solid"
              icon={<DeleteOutlined />}
              onClick={() => taskStore.deleteTask(id)}
            >Delete</Button> : <Button
              color="blue"
              variant="solid"
              icon={<EditOutlined />}
              onClick={() => console.log('edit', id)}
            >Edit</Button>}
          </div>
        </div>
      }
    </div >
  );
});
