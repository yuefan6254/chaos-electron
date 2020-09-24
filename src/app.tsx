import './app.scss';
import React, { useState, useEffect, createContext } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { TitleBar } from './components/index';

export const AppContext = createContext({});

function App() {
    const [config, setConfig] = useState({
        bgColor: 'rgb(107, 113, 125)',
        titlebarHight: '30px'
    })

    return (
        <AppContext.Provider value={{ config, setConfig }}>
            <div id='main'>
                <TitleBar></TitleBar>
            </div>
        </AppContext.Provider>
    )
}

export default App;