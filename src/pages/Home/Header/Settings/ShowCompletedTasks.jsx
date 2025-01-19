import React from 'react'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import { observer } from 'mobx-react';
import { settingsStore } from '../../../../stores/settingsStore/settingsStore';

export const ShowCompletedTasks = observer(() => {

  const handleShowCompletedChange = (value) => {
    settingsStore.setShowCompleted(value);
  }

    return (
      <Space align="center" style={{padding: '7px 20px'}}> 
        <Switch 
          checkedChildren={<EyeOutlined />}
          unCheckedChildren={<EyeInvisibleOutlined />}
          onChange={handleShowCompletedChange}
          checked={settingsStore.showCompleted}
        />
        <span className="switch__text">Show completed task </span>
      </Space>)

})
