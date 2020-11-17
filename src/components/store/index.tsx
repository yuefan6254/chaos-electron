import React, { useState } from 'react';
import './index.scss';
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
import { RightOutlined, DownOutlined } from '@ant-design/icons';
import Icon from '../icon';

interface apptype {
    name: string;
    icon: string;
    version: string;
    description: string;
}
function Store() {
    const [stapleState, SetStapleState] = useState(true);
    const [allState, SetAllState] = useState(true);
    const adapters = new FileSync('data/app.json');
    const db = low(adapters)
    const allApps = db.get('apps-all').value();
    const stapleApps = db.get('apps-staple').value();

    const addAppToStaple = (item: apptype) => {
        db.get('apps-staple').push(item).write();
    }

    const applicationContextEle = (item: apptype, index: number, type: string) => {
        return (
            <div className='application' key={index}>
                <Icon iconName={item.icon} className='icon'></Icon>
                <div className='content'>
                    <span>{item.name}</span>
                    <span>{item.version}</span>
                    <span>{item.description}</span>
                </div>
                <div className='action'>
                    {type == 'staple' ? <Icon className='action-icon' iconName='DeleteOutlined'></Icon> : null}
                    {type == 'all' ? <Icon className='action-icon' iconName='CheckOutlined' onClick={() => addAppToStaple(item)}></Icon> : null}
                    <Icon className='action-icon' iconName='SettingOutlined'></Icon>
                </div>
            </div>
        )
    }

    return (
        <div className='component-store'>
            <div className='search'></div>
            <div className={`staple ${stapleState ? 'expansion' : ''}`}>
                <div className='title' onClick={() => SetStapleState(!stapleState)}>
                    {stapleState ? <DownOutlined className='icon' /> : <RightOutlined className='icon' />}
                    <span>常用</span>
                </div>
                <div className='package'>
                    {stapleApps.map((item: apptype, index: number) => applicationContextEle(item, index, 'staple'))}
                </div>
            </div>
            <div className={`all ${allState ? 'expansion' : ''}`}>
                <div className='title' onClick={() => SetAllState(!allState)}>
                    {allState ? <DownOutlined className='icon' /> : <RightOutlined className='icon' />}
                    <span>全部</span>
                </div>
                <div className='package'>
                    {allApps.map((item: apptype, index: number) => applicationContextEle(item, index, 'all'))}
                </div>
            </div>
        </div>
    )
}
export default Store;