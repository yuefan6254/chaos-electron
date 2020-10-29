import './app.scss';
import React, { useState, useEffect, createContext, useReducer } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { TitleBar,Menu} from './components/index';
import {reducer,MixStateAndDispatch} from './store/index';

export const ColorContext = createContext<MixStateAndDispatch>({
    state: {color: '#ef4141'}
})

function App() {
    const [state,dispatch] = useReducer(reducer,{color: '#ef4141'})
    return (
        <ColorContext.Provider value={{state,dispatch}}>
            <div id='main' className='app'>
                <TitleBar></TitleBar>
                <div className='container'>
                    <Menu></Menu>
                </div>
            </div>
        </ColorContext.Provider>
    )
}

export default App;