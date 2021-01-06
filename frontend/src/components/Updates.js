import React ,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import UpdateItem from "./jsxcomponents/UpdateItem"
import UpdatePage from "./jsxcomponents/UpdatePage"
import LoadingPage from './jsxcomponents/LodingPage';
import '../App.css';

function Updates(props){
    axios.defaults.withCredentials = true;
    const [updates, setupdates] = useState([]);
    const [message, setmessage] = useState("");
    const [loaded, setloaded] = useState(false);
    var updatejsx;
    const history = useHistory();
    
    useEffect(() =>{
        axios.get('http://localhost:8080/user/homepage/')
            .then(res => {
                setupdates(res.data.currentDay.updates);
                setloaded(true);
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
                setloaded(true);
            }})
    }, [])
    
    // function handleBack(e){
    //     e.preventDefault();
    //     console.log(`Form submitted:`);

    //     history.push("/home");
    // }

    function makeupdate(){
        if(updates){
            updatejsx = updates.slice(0).reverse().map(item => <UpdateItem key={item._id} item={item}/>)
        }
    }

    return (
        <div>
            {makeupdate()}
            {loaded?<UpdatePage 
                updatejsx={updatejsx}
                // handleBack={handleBack}
            />:<LoadingPage />}
        </div>
    )
}

export default Updates;