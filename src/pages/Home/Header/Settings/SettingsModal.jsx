import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Modal, Input, Tabs } from "antd";
import { LoadingOutlined, EnterOutlined } from '@ant-design/icons';

import { CategoryRow } from "./CategoryRow";
import { ShowCompletedTasks } from "./ShowCompletedTasks";
import { UserSettings } from "./UserSettings";
import { userStore } from "../../../../stores/userStore/userStore";
import { addCategorie } from "../../../../stores/userStore/addCategorie";
import { settingsStore } from "../../../../stores/settingsStore/settingsStore";

import "./SettingsModal.less";

export const SettingsModal = observer((props) => {
    const { settingsCatOpened, setSettingsCatOpened } = props;
    const [ newCategoryLoading, setNewCategoryLoading ] = useState(false);
    const [ newCategoryName, setNewCategoryName ] = useState(null);

    useEffect(() => {
        settingsStore.fetchAllUsers();
    }, [])
      
    const categoriesRows = userStore.categories?.map((categorie, index) => {
        if (categorie.archived) return null; // Skip if categorie is null or undefined
        return (<CategoryRow key={`categoryRow${index}`} categorie={categorie} />)
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
          key: 'cat1',
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
          key: 'task2',
          label: 'Tasks',
          children:  <div className='settings__containerMain'>
            <ShowCompletedTasks />
          </div>,
        },
        {
            key: 'user3',
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
