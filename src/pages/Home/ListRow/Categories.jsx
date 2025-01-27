import React from "react";
import { Modal } from "antd";
import { userStore } from "../../../stores/userStore/userStore";
import { updateTask } from "../../../stores/taskStore/udpateTask";
import { taskStore } from "../../../stores/taskStore/taskStore";
import { settingsStore } from "../../../stores/settingsStore/settingsStore";

import "./Categories.less";

export const getMenuCategories = (action, taskId = null) => {

    return userStore.categories?.map((categorie, index) => {

        const handleAction = async (event) => {
            event.stopPropagation()
            if (action === 'update') {
                await updateTask(taskId, { categorieId: parseInt(categorie.id) })
                taskStore.fetchTasks(userStore.categoriesId);
            } else if (action === 'filter') {
                settingsStore.setCategorieFilter(categorie);
            }
        }

        return {
            key: index,
            label: (
                <div onClick={handleAction} className="menuItemCategorie__container">
                    <div className="menuItemCategorie__color" style={{ backgroundColor: categorie.color }}>
                    </div>
                    <div className="menuItemCategorie__title">
                        {categorie.title}
                    </div>
                </div>
            ),
        }
    })
}

export const ModalCategories = (props) => {
    const { taskId, catModalOpened, setCatModalOpened } = props;

    const categoriesAsHtmlItem = userStore.categories?.map((categorie) => {

        const handleChangeCategory = async (event) => {
            event.stopPropagation();
            try {
                await updateTask(taskId, { categorieId: parseInt(categorie.id) })
                taskStore.fetchTasks(userStore.categoriesId);
                setCatModalOpened(false);
            } catch (e) {
                console.error(e);
            }
        }

        return <div onClick={handleChangeCategory} className="menuItemCategorie__modal">
            <div className="menuItemCategorie__color" style={{ backgroundColor: categorie.color }}>
            </div>
            <div className="menuItemCategorie__title">
                {categorie.title}
            </div>
        </div>

    })

    return (
        <Modal
            centered
            open={catModalOpened}
            onOk={() => setCatModalOpened(false)}
            onCancel={() => setCatModalOpened(false)}
            style={{ maxWidth: 'calc(100vw - 40px)' }}
            footer={null}
        >
            {categoriesAsHtmlItem}
        </Modal>);
}