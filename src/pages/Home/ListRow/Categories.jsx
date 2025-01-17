import React, { useEffect } from "react";
import { Input } from "antd";
import { userStore } from "../../../stores/userStore/userStore";

export const getMenuCategories = () => {

    const categoriesAsListItem = userStore.categories?.map((categorie, index) => {
        return {
            key: index,
            label: (
                <div onClick={(e) => e.stopPropagation()}>
                    {categorie.title}
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