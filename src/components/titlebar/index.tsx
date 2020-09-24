import React,{useContext,useEffect} from 'react';
import './index.scss';
import {AppContext} from '@src/app';

function TitleBar(){
    const {config} = useContext(AppContext);

    useEffect(() => {
        console.log('jfajsdfj',config);
    });
    
    return (
        <div id='titlebar' className='component-titlebar'>
            <div className='titlebar-drag-tegion'></div>
        </div>
    )
}

export default TitleBar;