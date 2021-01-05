import { BrowserRouter, Route, Switch, Redirect, useHistory, Link , useLocation} from 'react-router-dom';
import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import UpdateItem from "./UpdateItem";

function SpecificDay(props) {
    axios.defaults.withCredentials = true;

    const [date, setdate] = useState("");
    const [water, setwater] = useState(0);
    const [sugar, setsugar] = useState(0);
    const [wGoal, setwGoal] = useState(0);
    const [suGoal, setsuGoal] = useState(0);
    const [updates, setupdates] = useState([]);
    var test;

    const [message, setmessage] = useState("");
    const history = useHistory();
    const location = useLocation();

    useEffect(() =>{
        // console.log(location.suffix);
        axios.get(`http://localhost:8080/user/previousdays/${location.suffix}`)
            .then(res => {
                setdate(res.data.date);
                setwater(res.data.water);
                setsugar(res.data.sugar);
                setwGoal(res.data.wGoal);
                setsuGoal(res.data.suGoal);
                setupdates(res.data.updates);
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
            }})
    }, [])

    function handleBack(e){
        e.preventDefault();
        console.log(`Form submitted:`);

        history.push("/previousdays");
    }

    function maketest(){
        if(updates){
            test = updates.map(item => <UpdateItem key={item._id} item={item}/>)
        }
    }

    return (
        <div>
            <p>{date}</p>
            <br/ >
            <p>{water}</p>
            <br/ >
            <p>{sugar}</p>
            <br/ >
            <p>{wGoal}</p>
            <br/ >
            <p>{suGoal}</p>
            <br/ >
            <p>{message}</p>
            <br/ >
            <br />
            {maketest()}
            {test}
            <br/ >
            <form onSubmit={handleBack}>
                <button type="submit">Go back</button>
            </form>
        </div>
    )
}

export default SpecificDay;