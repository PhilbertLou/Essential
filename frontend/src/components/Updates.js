import React ,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import UpdateItem from "./UpdateItem"

function Updates(props){
    axios.defaults.withCredentials = true;
    const [updates, setupdates] = useState([]);
    const [message, setmessage] = useState("");
    var test;
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
    
    function handleBack(e){
        e.preventDefault();
        console.log(`Form submitted:`);

        history.push("/home");
    }

    function handleBac(e){
        e.preventDefault();
        console.log(updates);
        console.log(test);

    }

    function maketest(){
        if(updates){
            test = updates.map(item => <UpdateItem key={item._id} item={item}/>)
        }
    }

    return (
        <div>
            {maketest()}
            {test}
            <br/ >
            <form onSubmit={handleBack}>
                <button type="submit">Go back</button>
            </form>
            <form onSubmit={handleBac}>
                <button type="submit">back</button>
            </form>
        </div>
    )
}

export default Updates;