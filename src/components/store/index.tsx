import React from 'react';
import './index.scss';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

function Store(){
    const adapters = new FileSync('data/app.json');
    const db = low(adapters)
    const allApps = db.get('apps-all').value();
    const stapleApps = db.get('apps-staple').value();

    return (
        <div className='component-store'>
            <div className='search'></div>
            <div className='staple'>
                <div className='title'></div>
            </div>
            <div className='all'></div>
        </div>
    )
}
export default Store;