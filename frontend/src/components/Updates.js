import React ,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import UpdateItem from "./jsxcomponents/UpdateItem"
import UpdatePage from "./jsxcomponents/UpdatePage"
import '../App.css';

function Updates(props){
    axios.defaults.withCredentials = true;
    const [updates, setupdates] = useState([]);
    const [message, setmessage] = useState("");
    var updatejsx;
    const history = useHistory();
    
    useEffect(() =>{
        axios.get('http://localhost:8080/user/homepage/')
            .then(res => {
                setupdates(res.data.currentDay.updates);
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
            }})
    }, [])
    
    // function handleBack(e){
    //     e.preventDefault();
    //     console.log(`Form submitted:`);

    //     history.push("/home");
    // }

    function makeupdate(){
        if(updates){
            updatejsx = updates.map(item => <UpdateItem key={item._id} item={item}/>)
        }
    }

    return (
        <div>
            {makeupdate()}
            <UpdatePage 
                updatejsx={updatejsx}
                // handleBack={handleBack}
            />
        </div>
    )
}

export default Updates;