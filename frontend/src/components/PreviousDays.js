import React ,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import PreviousLink from "./jsxcomponents/PreviousLink"
import PreviousDaysPage from "./jsxcomponents/PreviousDaysPage"
import LoadingPage from './jsxcomponents/LodingPage';

function PreviousDays(props){
    axios.defaults.withCredentials = true;
    const [days, setdays] = useState([]);
    const [message, setmessage] = useState("");
    const [loaded, setloaded] = useState(false);
    var test;
    const history = useHistory();
    
    useEffect(() =>{
        axios.get('http://localhost:8080/user/previousdays/')
            .then(res => {
                setdays(res.data);
                setloaded(true);
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
                setloaded(true);
            }})
    }, [])
    
    function handleBack(e){
        e.preventDefault();
        console.log(`Form submitted:`);

        history.push("/home");
    }


    function makeprevious(){
        if(days){
            test = days.slice(0).reverse().map(item => <PreviousLink key={item.id} item={item}/>)
        }
    }

    return (
        <div>
            {makeprevious()}
            {loaded?<PreviousDaysPage 
                test={test}
            />:<LoadingPage />}
        </div>
    )
}

export default PreviousDays;