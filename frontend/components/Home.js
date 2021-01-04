import React ,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

function Home(props){
    axios.defaults.withCredentials = true;

    const [name, setname] = useState("");
    const [date, setdate] = useState("");
    const [water, setwater] = useState(0);
    const [sugar, setsugar] = useState(0);
    const [sodium, setsodium] = useState(0);
    // const [updates, setupdates] = useState([]);
    const [wGoal, setwGoal] = useState(0);
    const [soGoal, setsoGoal] = useState(0);
    const [suGoal, setsuGoal] = useState(0);
    const [message, setmessage] = useState("");
    const history = useHistory();

    useEffect(() =>{
        axios.get('http://localhost:8080/user/homepage/')
            .then(res => {
                setname(res.data.name);
                setdate(res.data.date);
                setwater(res.data.currentDay.water);
                setsugar(res.data.currentDay.sugar);
                setsodium(res.data.currentDay.sodium);
                setwGoal(res.data.currentDay.wGoal);
                setsoGoal(res.data.currentDay.soGoal);
                setsuGoal(res.data.currentDay.suGoal);
                // setupdates(res.data.currentDay.updates);
                // props.addmessage(res.data.name);
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
            }})
            // console.log(props);
    }, [])
    
    function handleLogout(e){
        //check credientials, if its right then redirect them, may need to mark as authenticated?
        //or just try and auth then redirect to login again and let app handle the rest
        e.preventDefault();
        console.log(`Form submitted:`);

        axios.post('http://localhost:8080/user/logout/')
            .then(res => {
                props.addmessage(res.data.message);
                // props.changeStatus(false);
                // history.push("/login");
            })
            .catch(err => {if (err.response){
                props.addmessage(err.response.data.message);
                // props.changeStatus(false);
                // history.push("/login");
            }})
    }

    function handleUpdates(e){
        //check credientials, if its right then redirect them, may need to mark as authenticated?
        //or just try and auth then redirect to login again and let app handle the rest
        e.preventDefault();
        console.log(`Form submitted:`);

        history.push("/updates");
    }

    return (
        <div>
            <p>{name}</p>
            <br/ >
            <p>{date}</p>
            <br/ >
            <p>{water}</p>
            <br/ >
            <p>{sodium}</p>
            <br/ >
            <p>{sugar}</p>
            <br/ >
            {/* <p>{updates}</p>
            <br/ > */}
            <p>{wGoal}</p>
            <br/ >
            <p>{soGoal}</p>
            <br/ >
            <p>{suGoal}</p>
            <br/ >
            <p>{message}</p>
            <br/ >
            <form onSubmit={handleLogout}>
                <button type="submit">Logout</button>
                {message}
            </form>
            <form onSubmit={handleUpdates}>
                <button type="submit">See Updates</button>
            </form>
        </div>
    )
}

export default Home;