import React, { useState } from "react";
import { observer } from "mobx-react";
import { Input, Space, Dropdown } from "antd";
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';

import { userStore } from "../../../../stores/userStore/userStore";
import { updateCategorie } from "../../../../stores/userStore/udpateCategorie.js"
import { colorNames } from "./colorNames.js";

export const CategoryRow = (props) => {
        const { categorie } = props;
        const [isLoading, setIsLoading] = useState(false);
        const [titleValue, setTitleValue] = useState(categorie.title);        

        const handleColorUpdate = ((color) => {
            setIsLoading(true);
            updateCategorie(categorie.id, { color: color })
            setIsLoading(false);
            userStore.fetchuserData();
        });


        const handleCategorieUpdate = ((event) => {
            // TODO: add debouncing funktion
            setTitleValue(event.target.value);
            setIsLoading(true);
            event.target.value && updateCategorie(categorie.id, { title: event.target.value })
            setIsLoading(false);
            userStore.fetchuserData();
        });

        const items = colorNames.map((color,index) => { 
            return { key: index, 
                     label: <div 
                                className={'settings__dropdownItem'} 
                                style={{backgroundColor: color, color: color}}
                                onClick={() => handleColorUpdate(color)}
                             >
                                 <CheckOutlined />
                             </div>,
                 } 
             });
        
        return <div className="settings__modal">
            <div className="settings__color" style={{backgroundColor: categorie.color}}>
            </div>
            <Space.Compact className="settings__space">
                <Dropdown menu={{ items, }}>
                    <div className="settings__dowpDownEdit" style={{backgroundColor: categorie.color}}>
                        <EditOutlined />
                    </div>
                </Dropdown>
                <Input 
                    className="settings__input" 
                    value={titleValue} 
                    suffix={isLoading && <LoadingOutlined />}
                    onChange={handleCategorieUpdate}
                />
            </Space.Compact>
        </div>
};

