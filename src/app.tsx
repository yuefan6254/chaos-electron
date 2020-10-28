import './app.scss';
import React, { useState, useEffect, createContext, useReducer } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { TitleBar } from './components/index';
import {reducer,MixStateAndDispatch} from './store/index';

export const ColorContext = createContext<MixStateAndDispatch>({
    state: {color: 'rgb(33, 37, 43)'}
})

function App() {
    const [state,dispatch] = useReducer(reducer,{color: 'rgb(33, 37, 43)'})
    return (
        <ColorContext.Provider value={{state,dispatch}}>
            <div id='main'>
                <TitleBar></TitleBar>
            </div>
        </ColorContext.Provider>
    )
}

export default App;