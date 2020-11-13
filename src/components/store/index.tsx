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
            <div className='staple'>
                <div className='title'>
                    {stapleState ? <DownOutlined className='icon'/> : <RightOutlined className='icon'/>}
                    <span>常用</span>
                </div>
            </div>
            <div className='all'>
                <div className='title'>
                    {allState ? <DownOutlined /> : <RightOutlined />}
                    <span>全部</span>
                </div>
            </div>
        </div>
    )
}
export default Store;