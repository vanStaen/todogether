import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Input, Tabs } from "antd";
import { LoadingOutlined, EnterOutlined } from '@ant-design/icons';

import { CategoryRow } from "./CategoryRow";
import { ShowCompletedTasks } from "./ShowCompletedTasks";
import { UserSettings } from "./UserSettings";
import { userStore } from "../../../../stores/userStore/userStore";

import "./SettingsModal.less";
import { addCategorie } from "../../../../stores/userStore/addCategorie";

export const SettingsModal = observer((props) => {
    const { settingsCatOpened, setSettingsCatOpened } = props;
    const [ newCategoryLoading, setNewCategoryLoading ] = useState(false);
    const [ newCategoryName, setNewCategoryName ] = useState(null);
      
    const categoriesRows = userStore.categories?.map((categorie) => {
        return (<CategoryRow categorie={categorie} />)
    })

    const handleCatInputChange = (event) => {
        setNewCategoryName(event.target.value);
    }

    const handleCatInputPressEnter = async () => {
        try {
            setNewCategoryLoading(true);
            await addCategorie({title: newCategoryName});
            setNewCategoryName(null);
            userStore.fetchuserData();
        } catch (e) {
            console.error(e);
        }
        setNewCategoryLoading(false);
    }

    const tabsItems = [
        {
          key: 1,
          label: 'Categories',
          children: <div className='settings__containerMain'>
            {categoriesRows}
            <Input 
                className="settings__catInputNew" 
                placeholder={'New category'} 
                suffix={newCategoryLoading ? <LoadingOutlined /> : <EnterOutlined onClick={handleCatInputPressEnter}/>}
                value={newCategoryName}
                onChange={handleCatInputChange }
                onPressEnter={handleCatInputPressEnter}
            />
          </div>,
        },
        {
          key: 2,
          label: 'Tasks',
          children:  <div className='settings__containerMain'>
            <ShowCompletedTasks />
          </div>,
        },
        {
            key: 3,
            label: 'User',
            children:  <div className='settings__containerMain'><UserSettings/></div>,
        },
      ];

    return (
        <Modal
            centered
            open={settingsCatOpened}
            onOk={() => setSettingsCatOpened(false)}
            onCancel={() => setSettingsCatOpened(false)}
            style={{ maxWidth: 'calc(100vw - 40px)' }}
            footer={null}
        >
            <Tabs type="card" defaultActiveKey={1} items={tabsItems} />
        </Modal>);
});
