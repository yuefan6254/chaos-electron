import './index.scss';
import React from 'react';
import { AppstoreAddOutlined, ExperimentOutlined, SettingOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';

function Menu() {
    return (
        <div className='component-menu'>
            <div className='composite-bar'>
                <HomeOutlined className='menu-icon'></HomeOutlined>
                <AppstoreAddOutlined className='menu-icon appstore' />
                <ExperimentOutlined className='menu-icon'></ExperimentOutlined>
            </div>

            <div className='fixed-bar'>
                <UserOutlined className='user'></UserOutlined>
                <SettingOutlined className='menu-icon'></SettingOutlined>
            </div>
        </div>
    )
}
export default Menu;