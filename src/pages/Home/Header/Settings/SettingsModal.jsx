import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Input } from "antd";
import { LoadingOutlined, EnterOutlined } from '@ant-design/icons';

import { CategoryRow } from "./CategoryRow";
import { userStore } from "../../../../stores/userStore/userStore";

import "./SettingsModal.less";

export const SettingsModal = observer((props) => {
    const { settingsCatOpened, setSettingsCatOpened } = props;
    const [ newCategoryLoading, setNewCategoryLoading ] = useState(false);
      
    const categoriesRows = userStore.categories?.map((categorie) => {
        return (<CategoryRow categorie={categorie} />)
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
            {categoriesRows}
            <Input 
                className="settings__inputNew" 
                placeholder={'New category'} 
                suffix={newCategoryLoading ? <LoadingOutlined /> : <EnterOutlined />}
            />
        </Modal>);
});
