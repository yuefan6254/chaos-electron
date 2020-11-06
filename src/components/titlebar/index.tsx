import './index.scss';
import { ColorContext } from '@src/app';
import { ipcRenderer, remote } from 'electron';
import React, { useContext, useEffect, useState } from 'react';
import { CloseOutlined, SwitcherOutlined, BorderOutlined, LineOutlined } from '@ant-design/icons';
import { windowStateActionResponse, WINDOW_STATE, getWindowState } from '@ipc/index';

function TitleBar() {
    const { state, dispatch } = useContext(ColorContext);
    const { color } = state;
    const [windowState, setWindowState] = useState(getWindowState(remote.getCurrentWindow()));

    // 最小化窗口
    const handleMinimizedScreen = () => {
        windowStateActionResponse.minimize();
    }

    // 未最大化窗口
    const handleUnMaximizedScreen = () => {
        windowStateActionResponse.unmaximize().then(res => {
            setWindowState(res)
        })
    }

    // 最大化窗口
    const handleMaximizedScreen = () => {
        windowStateActionResponse.maximize().then(res => {
            setWindowState(res)
        })
    }

    // 关闭窗口
    const handleCloseScreen = () => {
        windowStateActionResponse.close().then(res => {
            console.log('关闭', res);
        })
    }

    return (
        <div id='titlebar' className='component-titlebar' style={{ backgroundColor: color}}>
            <div className='titlebar-drag-tegion'></div>
            <div className='window-controls-container'>
                <LineOutlined onClick={() => handleMinimizedScreen()} className='window-icon'></LineOutlined>
                {WINDOW_STATE.MAXIMIZED === windowState && (<SwitcherOutlined onClick={() => handleUnMaximizedScreen()} className='window-icon'></SwitcherOutlined>)}
                {WINDOW_STATE.NORMAL === windowState && (<BorderOutlined onClick={() => handleMaximizedScreen()} className='window-icon'></BorderOutlined>)}
                <CloseOutlined onClick={() => handleCloseScreen()} className='window-icon'></CloseOutlined>
            </div>
        </div>
    )
}

export default TitleBar;