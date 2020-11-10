import './index.scss';
import React, { useState } from 'react';
import SideBar from '../sidebar';
import { AppstoreAddOutlined, ExperimentOutlined, SettingOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';

function ActivityBar() {
    const [panelState, SetPanelState] = useState({ name: 'home', show: false });

    /**
     * 点击composite-bar区域的icon
     * 记录点击状态，并判断对应的功能面板展现与否
     * @param iconName 
     */
    const clickCompositeIcon = function (iconName: string) {
        if (panelState.name !== iconName) {
            SetPanelState({ name: iconName, show: true })
            return;
        }

        SetPanelState({ ...panelState, show: !panelState.show })
    }

    return (
        <div className='component-activitybar'>
            <div className='composite-bar'>
                <HomeOutlined className='menu-icon' onClick={() => clickCompositeIcon('homed')}></HomeOutlined>
                <AppstoreAddOutlined className='menu-icon appstore' />
                <ExperimentOutlined className='menu-icon'></ExperimentOutlined>
            </div>

            <div className='fixed-bar'>
                <UserOutlined className='user'></UserOutlined>
                <SettingOutlined className='menu-icon'></SettingOutlined>
            </div>
            {panelState.show && <SideBar></SideBar>}
        </div>
    )
}
export default ActivityBar;