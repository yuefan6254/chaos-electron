import React,{useContext,useEffect} from 'react';
import './index.scss';
import {ColorContext} from '@src/app';
import {CloseOutlined,SwitcherOutlined,BorderOutlined,LineOutlined} from '@ant-design/icons';
import {ipcRenderer} from 'electron';
// const {windowStateActionResponse} = require('@ipc/index');
import {windowStateActionResponse} from '@ipc/index';

function TitleBar(){
    const {state,dispatch} = useContext(ColorContext);
    const {color} = state;
    const handleFullScreen = () => {
        ipcRenderer.send('synchronus-message','window-max')
        ipcRenderer.on('asynchronous-reply',(event,arg) => {
            console.log(arg);
        })
    }

    const handleMinimizedScreen = () => {
        windowStateActionResponse.minimize();
    }

    const handleMinScreen = () => {
    }

    return (
        <div id='titlebar' className='component-titlebar' style={{backgroundColor: color,height: '30px'}}>
            <div className='titlebar-drag-tegion'></div>
            <div className='window-controls-container'>
                <LineOutlined onClick={() => handleMinimizedScreen()} className='window-icon'></LineOutlined>
                <SwitcherOutlined onClick={() => handleFullScreen()} className='window-icon'></SwitcherOutlined>
                <BorderOutlined onClick={() => handleFullScreen()} className='window-icon'></BorderOutlined>
                <CloseOutlined onClick={() => handleFullScreen()} className='window-icon'></CloseOutlined>
            </div>
        </div>
    )
}

export default TitleBar;