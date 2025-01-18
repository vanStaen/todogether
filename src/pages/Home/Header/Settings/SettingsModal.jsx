import React from "react";
import { observer } from "mobx-react";
import { Modal, Input, Space, Dropdown } from "antd";
import { EditOutlined, CheckOutlined } from '@ant-design/icons';

import { colorNames } from "./colorNames.js";
import { userStore } from "../../../../stores/userStore/userStore";

import "./SettingsModal.less";

export const SettingsModal = observer((props) => {
    const { settingsCatOpened, setSettingsCatOpened } = props;

    const items = colorNames.map((color,index) => { 
       return { key: 1, 
                label: <div 
                        className={'settings__dropdownItem'} 
                        style={{backgroundColor: color, color: color}}
                        >
                            <CheckOutlined />
                        </div>,
            } 
        });
      
    const categoriesAsHtmlItem = userStore.categories?.map((categorie) => {

        /* const handleChangeCategory = async (event) => {
            event.stopPropagation();
            await updateTask(taskId, { categorieId: parseInt(categorie.id) })
            taskStore.fetchTasks();
            setCatModalOpened(false);
        } */
        
        return <div className="settings__modal">
            <div className="settings__color" style={{backgroundColor: categorie.color}}>
            </div>

            <Space.Compact className="settings__space">
                <Dropdown menu={{ items, }}>
                    <div className="settings__dowpDownEdit" style={{backgroundColor: categorie.color}}>
                        <EditOutlined />
                    </div>
                </Dropdown>
                <Input className="settings__input" value={categorie.title} />
            </Space.Compact>
    
        </div>

    })

    return (
        <Modal
            centered
            title={'Edit categories'}
            open={settingsCatOpened}
            onOk={() => setSettingsCatOpened(false)}
            onCancel={() => setSettingsCatOpened(false)}
            style={{ maxWidth: 'calc(100vw - 40px)' }}
            footer={null}
        >
            {categoriesAsHtmlItem}
        </Modal>);
});
