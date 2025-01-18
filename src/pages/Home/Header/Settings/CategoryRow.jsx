import React, { useState } from "react";
import { observer } from "mobx-react";
import { Input, Space, Dropdown } from "antd";
import { CheckOutlined, EditOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons';

import { userStore } from "../../../../stores/userStore/userStore";
import { archiveCategorie } from "../../../../stores/userStore/archiveCategorie.js"
import { updateCategorie } from "../../../../stores/userStore/udpateCategorie.js"
import { colorNames } from "./colorNames.js";

export const CategoryRow = observer((props) => {
        const { categorie } = props;
        const [isLoading, setIsLoading] = useState(false);
        const [isHover, setIsHover] = useState(false);
        const [titleValue, setTitleValue] = useState(categorie.title);        

        const handleColorUpdate = ((color) => {
            setIsLoading(true);
            updateCategorie(categorie.id, { color: color })
            setIsLoading(false);
            userStore.fetchuserData();
        });

        const handleCategorieUpdate = ((event) => {
            // TODO: add debouncing funktion
            try {
                setTitleValue(event.target.value);
                setIsLoading(true);
                event.target.value && updateCategorie(categorie.id, { title: event.target.value })
                userStore.fetchuserData();
            } catch (e) {
                console.error(e);
            }
            setTimeout(() => {
                setIsLoading(false);
            }, [300])
        });


        const handleCategorieArchive = (async () => {
            try {
                await archiveCategorie(categorie.id, true);
                userStore.fetchuserData();
            } catch (e) {
                console.error(e);
            }
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
                    <div className="settings__dropDownEdit" style={{backgroundColor: categorie.color}}>
                        <EditOutlined />
                    </div>
                </Dropdown>
                <div className="settings__inputContainer" 
                    onMouseOver={()=> setIsHover(true)}
                    onMouseLeave={()=> setIsHover(false)}
                >
                    <Input 
                        className="settings__input" 
                        value={titleValue} 
                        suffix={isLoading ? <LoadingOutlined /> : isHover 
                            ? <DeleteOutlined className={'settings__inputDelete'} onClick={handleCategorieArchive} /> 
                            : ' '}
                        onChange={handleCategorieUpdate}
                    />
                </div>
            </Space.Compact>
        </div>
});

