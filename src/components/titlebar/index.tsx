import React,{useContext,useEffect} from 'react';
import './index.scss';
import {ColorContext} from '@src/app';
import {MinusOutlined,CloseOutlined,FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons';
import {ipcRenderer} from 'electron';

function TitleBar(){
    const {state,dispatch} = useContext(ColorContext);
    const {color} = state;
    const handleFullScreen = () => {
        ipcRenderer.send('synchronus-message','window-max')
        ipcRenderer.on('asynchronous-reply',(event,arg) => {
            console.log(arg);
        })
    }

    const handleShrinkScreen = () => {
        ipcRenderer.send('synchronus-message','window-min')
    }

    return (
        <div id='titlebar' className='component-titlebar' style={{backgroundColor: color,height: '30px'}}>
            <div className='titlebar-drag-tegion'></div>
            <div className='window-controls-container'>
                <MinusOutlined onClick={() => handleShrinkScreen()} className='window-icon' style={{color: '#fff'}}></MinusOutlined>
                <FullscreenOutlined onClick={() => handleFullScreen()} className='window-icon' style={{ color: '#fff'}}></FullscreenOutlined>
                <FullscreenExitOutlined onClick={() => handleShrinkScreen()} className='window-icon' style={{color: '#fff'}}></FullscreenExitOutlined>
            </div>
        </div>
    )
}

export default TitleBar;