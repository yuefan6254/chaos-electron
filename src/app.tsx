import './app.scss';
import React, {useState,useEffect} from 'react';

// class App extends React.Component{
//     render(){
//         return(
//             <div id='main'>Hello React3</div>
//         )
//     }
// }

function App(){
    const [isOnline, setIsOnline] = useState(null);

    function handleStatusChange(status:any){
        setIsOnline(status.isOnline);
    }

    useEffect(() => {})
}

export default App;