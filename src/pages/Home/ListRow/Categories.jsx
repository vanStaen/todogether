import React from "react";
import { Input, ColorPicker } from "antd";
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

    const inputNewCAtAsListItem = {
        key: userStore.categories?.length + 1,
        label: (
            <Input placeholder="New category" onClick={(e) => e.stopPropagation()} />
        ),
    }

    categoriesAsListItem.push(inputNewCAtAsListItem);
    return categoriesAsListItem;
}