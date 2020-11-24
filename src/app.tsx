import './app.scss';
import React, { useState, useEffect, createContext, useReducer } from 'react';
import 'antd/dist/antd.css';
import { TitleBar, ActivityBar } from './components/index';
import { reducer, MixStateAndDispatch } from './store/index';
import TV from './pages/tv';

export const ColorContext = createContext<MixStateAndDispatch>({
    state: { color: 'rgb(231, 234, 235)' }
})

function App() {
    const [state, dispatch] = useReducer(reducer, { color: 'rgb(231, 234, 235)' })
    return (
        <ColorContext.Provider value={{ state, dispatch }}>
            <div id='main' className='app'>
                <TitleBar></TitleBar>
                <div className='container'>
                    <ActivityBar></ActivityBar>
                    <div className='sash-container'>
                        <TV></TV>
                    </div>
                </div>
            </div>
        </ColorContext.Provider>
    )
}

export default App;