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
        // console.log("HERE");
        axios.get('http://localhost:8080/user/previousdays/')
            .then(res => {
                // console.log(res.data.currentDay.updates);
                setdays(res.data);
                // props.addmessage(res.data.name);
            })
            // .then(res=>{
            //     if(updates){
            //         test = updates.map(item => {
            //         // console.log(item._id);
            //         <UpdateItem key={item._id} item={item}/>
            //         })
            //     }
            // })
            // .then(res=>{
            //     console.log(updates);
            //     console.log(test);
            // })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
            }})
            
            // console.log(updates);
            // console.log(updateItems);
            // console.log(props);
    }, [])
    
    function handleBack(e){
        //check credientials, if its right then redirect them, may need to mark as authenticated?
        //or just try and auth then redirect to login again and let app handle the rest
        e.preventDefault();
        console.log(`Form submitted:`);

        history.push("/home");
    }


    function makeprevious(){
        if(days){
            test = days.map(item => <PreviousLink key={item} item={item}/>)
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