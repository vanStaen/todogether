import React from 'react'
import dayjs from 'dayjs';
import { Col, Row } from 'antd';
import { observer } from 'mobx-react';
import { userStore } from '../../../../stores/userStore/userStore';

export const UserSettings = observer(() => {

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

    return (
      <Row>
        <Col span={24} style={{padding: '7px 20px'}}> 
          <span style={{opacity: .5, fontWeight: 100, marginRight: 10}}>Username</span> {userStore.username}
        </Col>
        <Col span={24} style={{padding: '7px 20px'}}> 
        <span style={{opacity: .5, fontWeight: 100, marginRight: 10}}>Email</span> {userStore.email}
        </Col>
        <Col span={24} style={{padding: '7px 20px'}}> 
        <span style={{opacity: .5, fontWeight: 100, marginRight: 10}}>Joined</span> {dayjs(userStore.joinedDate).format('DD MMM YYYY')}
        </Col>
      </Row>
      )

})
