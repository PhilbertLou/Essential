import React ,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import PreviousLink from "./PreviousLink"

function PreviousDays(props){
    axios.defaults.withCredentials = true;
    const [days, setdays] = useState([]);
    const [message, setmessage] = useState("");
    var test;
    const history = useHistory();
    
    useEffect(() =>{
        axios.get('http://localhost:8080/user/previousdays/')
            .then(res => {
                setdays(res.data);
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


    function makeprevious(){
        if(days){
            test = days.map(item => <PreviousLink key={item.id} item={item}/>)
        }
    }

    return (
        <div>
            {makeprevious()}
            {test}
            <br/ >
            <form onSubmit={handleBack}>
                <button type="submit">Go back</button>
            </form>
        </div>
    )
}

export default PreviousDays;