import React from "react";
import { Input, ColorPicker, Modal } from "antd";
import { userStore } from "../../../stores/userStore/userStore";

import "./Categories.less";

export const getMenuCategories = () => {
    const categoriesAsListItem = userStore.categories?.map((categorie, index) => {
        return {
            key: index,
            label: (
                <div onClick={(e) => e.stopPropagation()} className="menuItemCategorie__Container">
                    <div className="menuItemCategorie__Title">
                        {categorie.title}
                    </div>
                    <div className="menuItemCategorie__ColorPicker">
                        <ColorPicker defaultValue={categorie.color} size="small" />
                    </div>
                </div>
            ),
        }
    })

    const inputNewCatAsListItem = {
        key: userStore.categories?.length + 1,
        label: (
            <Input placeholder="New category" onClick={(e) => e.stopPropagation()} />
        ),
    }

    categoriesAsListItem.push(inputNewCatAsListItem);
    return categoriesAsListItem;
}

export const ModalCategories = (props) => {
    const { catModalOpened, setCatModalOpened } = props;

    const categoriesAsHtmlItem = userStore.categories?.map((categorie, index) => {
        return <div onClick={(e) => e.stopPropagation()} className="menuItemCategorie__ContainerMobile">
            <div className="menuItemCategorie__Title">
                {categorie.title}
            </div>
            <div className="menuItemCategorie__ColorPicker">
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