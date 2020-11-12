import './index.scss';
import React from 'react';
import Store from '../store';

interface SideBarType {
    name: string;
}
function SideBar(props: SideBarType) {
    const swicthApp = (item:string) =>{
        switch(item){
            case 'home':
                return '未启用';
                break;
            case 'store':
                return <Store></Store>;
                break;
        }
    }
    return (
        <div className='component-sidebar'>
            {swicthApp(props.name)}
        </div>
    )
}

export default SideBar;