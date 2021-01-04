import React ,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import UpdateItem from "./UpdateItem"

function Home(props){
    axios.defaults.withCredentials = true;
    const [updates, setupdates] = useState([]);
    const history = useHistory();
    var updateItems;

    useEffect(() =>{
        axios.get('http://localhost:8080/user/homepage/')
            .then(res => {
                setupdates(res.data.currentDay.updates);
                updateItems = updates.map(item => {
                console.log(item.time);
                <UpdateItem water={item.water} sugar={item.sugar} sodium={item.sodium} time={item.time}/>
                })
                // props.addmessage(res.data.name);
            })
            .catch(err => {if (err.response){
                props.addMessage(err.response.data.message);
            }})
            // console.log(props);
    }, [])
    
    function handleBack(e){
        //check credientials, if its right then redirect them, may need to mark as authenticated?
        //or just try and auth then redirect to login again and let app handle the rest
        e.preventDefault();
        console.log(`Form submitted:`);

        history.push("/home");
    }


    return (
        <div>
            {updateItems}
            <br/ >
            <form onSubmit={handleBack}>
                <button type="submit">Go back</button>
            </form>
        </div>
    )
}

export default Home;