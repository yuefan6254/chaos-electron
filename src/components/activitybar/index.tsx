import './index.scss';
import React, { useState } from 'react';
import SideBar from '../sidebar';
import Icon from '../icon';
import AntIcons, { AppstoreAddOutlined, ExperimentOutlined, SettingOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

function ActivityBar() {
    const [panelState, SetPanelState] = useState({ name: 'home', show: false });
    const adapters = new FileSync('data/app.json');
    const db = low(adapters)
    const activitybars = db.get('activitybars').value();

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
                {activitybars.map((item: { name: string, icon: string }, index: number) =>
                    <Icon onClick={() => clickCompositeIcon(item.name)} key={index} iconName={item.icon} className={`menu-icon ${panelState.name == item.name && panelState.show ? 'click' : ''}`} />)}
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