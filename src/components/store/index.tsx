import React, { useState } from 'react';
import './index.scss';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { RightOutlined, DownOutlined } from '@ant-design/icons';

function Store() {
    const [stapleState, SetStapleState] = useState(true);
    const [allState, SetAllState] = useState(true);
    const adapters = new FileSync('data/app.json');
    const db = low(adapters)
    const allApps = db.get('apps-all').value();
    const stapleApps = db.get('apps-staple').value();


    return (
        <div className='component-store'>
            <div className='search'></div>
            <div className={`staple ${allState?'expansion':''}`}>
                <div className='title' onClick={() => SetStapleState(!stapleState)}>
                    {stapleState ? <DownOutlined className='icon'/> : <RightOutlined className='icon'/>}
                    <span>常用</span>
                </div>
            </div>
            <div className='all'>
                <div className='title' onClick={() => SetAllState(!allState)}>
                    {allState ? <DownOutlined className='icon' /> : <RightOutlined className='icon'/>}
                    <span>全部</span>
                </div>
            </div>
        </div>
    )
}
export default Store;