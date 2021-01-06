import { BrowserRouter, Route, Switch, Redirect, useHistory, Link , useLocation} from 'react-router-dom';
import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import UpdateItem from "./jsxcomponents/UpdateItem";
import LoadingPage from './jsxcomponents/LodingPage';
import HomePage from './jsxcomponents/SpecificDayPage';

function SpecificDay(props) {
    const day = props.match.params.day;
    const id = props.match.params.id;
    axios.defaults.withCredentials = true;

    const [date, setdate] = useState("");
    const [water, setwater] = useState(0);
    const [sugar, setsugar] = useState(0);
    const [wGoal, setwGoal] = useState(0);
    const [suGoal, setsuGoal] = useState(0);
    const [updates, setupdates] = useState([]);
    const [loaded, setloaded] = useState(false);
    const [waterperc, setwaterperc] = useState(0);
    const [sugarperc, setsugarperc] = useState(0);
    var test;

    const [message, setmessage] = useState("");
    const history = useHistory();
    const location = useLocation();

    useEffect(() =>{
        // console.log(location.suffix);
        axios.get(`http://localhost:8080/user/previousdays/${day}/${id}`)
            .then(res => {
                setdate(res.data.date);
                setwater(res.data.water);
                setsugar(res.data.sugar);
                setwGoal(res.data.wGoal);
                setsuGoal(res.data.suGoal);
                setupdates(res.data.updates);
                setloaded(true);
                return(res)
            })
            .then(res=>{
                setwaterperc(res.data.wGoal?((100*res.data.water/res.data.wGoal).toFixed(2)):100);
                setsugarperc(res.data.suGoal?((100*res.data.sugar/res.data.suGoal).toFixed(2)):100);
                // return(res)
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
                setloaded(true);
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
            {maketest()}
            {loaded? 
            <div>
            <HomePage 
                date={date}
                water={water}
                sugar={sugar}
                wGoal={wGoal}
                suGoal={suGoal}
                waterperc={waterperc}
                sugarperc={sugarperc}
                handleBack={handleBack}
            />
            <br />
            <div style={{textAlign:"center"}}>
                <h1>Updates</h1>
            </div>
            {test}
            </div>
            :<LoadingPage />}
            {/* {test} */}
            {/* <p>{date}</p>
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
            <p>{message}</p>
            <br/ >{waterperc}
            <br />
            {sugarperc}
            <br />
            <br />
            {maketest()}
            {test}
            <br/ >
            {/* <form onSubmit={handleBack}>
                <button onClick={handleBack}>Go back</button>
            </form> */} 
        </div>
    )
}

export default SpecificDay;