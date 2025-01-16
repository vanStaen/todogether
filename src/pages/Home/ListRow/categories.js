import React from "react";
import { Input } from "antd";

export const getMenuCategories = () => {
    return [
        {
            key: 1,
            label: (
                <div onClick={(e) => e.stopPropagation()}>
                    Private
                </div>
            ),
        },
        {
            key: 2,
            label: (
                <Input placeholder="New category" onClick={(e) => e.stopPropagation()} />
            ),
        },
    ];
}