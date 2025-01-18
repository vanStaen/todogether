import React from "react";
import { Input, ColorPicker, Modal } from "antd";
import { userStore } from "../../../stores/userStore/userStore";
import { updateTask } from "../../../stores/taskStore/udpateTask";
import { taskStore } from "../../../stores/taskStore/taskStore";

import "./Categories.less";

export const getMenuCategories = (taskId) => {

   return userStore.categories?.map((categorie, index) => {

        const handleChangeCategory = async (event) => {
            event.stopPropagation()
            await updateTask(taskId, { categorieId: parseInt(categorie.id) })
            taskStore.fetchTasks();
        }

        return {
            key: index,
            label: (
                <div onClick={handleChangeCategory} className="menuItemCategorie__container">
                    <div className="menuItemCategorie__color" style={{backgroundColor: categorie.color}}>
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
            await updateTask(taskId, { categorieId: parseInt(categorie.id) })
            taskStore.fetchTasks();
        }
        
        return <div onClick={handleChangeCategory} className="menuItemCategorie__modal">
            <div className="menuItemCategorie__title">
                {categorie.title}
            </div>
            <div className="menuItemCategorie__colorPicker">
                <ColorPicker defaultValue={categorie.color} size="small" />
            </div>
        </div>

    })

    const inputNewCatAsHtmlItem = <Input placeholder="New category" onClick={(e) => e.stopPropagation()} />

    categoriesAsHtmlItem.push(inputNewCatAsHtmlItem);

    return (
        <Modal
            title="Select a category"
            centered
            open={catModalOpened}
            onOk={() => setCatModalOpened(false)}
            onCancel={() => setCatModalOpened(false)}
            className="modalCategories__modal"
            footer={null}
        >
            {categoriesAsHtmlItem}
        </Modal>);
}