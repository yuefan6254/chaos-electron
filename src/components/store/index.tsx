import React, { useState, useEffect } from 'react';
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
    isAdd?: boolean;
}
function Store() {
    const adapters = new FileSync('data/app.json');
    const db = low(adapters)

    const [stapleState, SetStapleState] = useState(true);
    const [allState, SetAllState] = useState(true);
    const [AppRelated, SetAppRelated] = useState({ allApps: [], stapleApps: [] });
    const [flag, SetFlag] = useState(0);

    

    const addAppToStaple = (item: apptype) => {
        db.get('apps-all').find({ name: item.name }).assign({ isAdd: true }).write();
        db.get('apps-staple').push(item).write();
        SetFlag(flag + 1);
    }

    const removeAppToStaple = (item: apptype) => {
        db.get('apps-staple').remove({ name: item.name }).write();
        db.get('apps-all').find({ name: item.name }).assign({ isAdd: false }).write();
        SetFlag(flag - 1);
    }

    useEffect(() => {
        SetAppRelated({
            allApps: db.get('apps-all').value() || [],
            stapleApps: db.get('apps-staple').value() || []
        })
    }, [flag])

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
                    {type == 'staple' ? <Icon className='action-icon' iconName='DeleteOutlined' onClick={() => removeAppToStaple(item)}></Icon> : null}
                    {type == 'all' && !item?.isAdd ? <Icon className='action-icon' iconName='CheckOutlined' onClick={() => addAppToStaple(item)}></Icon> : null}
                    {type == 'all' && item?.isAdd ? <Icon className='action-icon added' iconName='CheckCircleOutlined'></Icon> : null}
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
                    {AppRelated.stapleApps.map((item: apptype, index: number) => applicationContextEle(item, index, 'staple'))}
                </div>
            </div>
            <div className={`all ${allState ? 'expansion' : ''}`}>
                <div className='title' onClick={() => SetAllState(!allState)}>
                    {allState ? <DownOutlined className='icon' /> : <RightOutlined className='icon' />}
                    <span>全部</span>
                </div>
                <div className='package'>
                    {AppRelated.allApps.map((item: apptype, index: number) => applicationContextEle(item, index, 'all'))}
                </div>
            </div>
        </div>
    )
}
export default Store;