// Importing neccessary modules
import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import PreviousLink from "./jsxcomponents/PreviousLink";
import PreviousDaysPage from "./jsxcomponents/PreviousDaysPage";
import LoadingPage from './jsxcomponents/LodingPage';

function PreviousDays(){
    // Set necessary states that need to be kept track of
    axios.defaults.withCredentials = true;
    const [days, setdays] = useState([]);
    const [message, setmessage] = useState("");
    const [loaded, setloaded] = useState(false);
    var daylinks;
    
    // Will load data in if possible when mounted
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

    // Function that makes the previous link items
    function makeprevious(){
        if(days){
            daylinks = days.slice(0).reverse().map(item => <PreviousLink key={item.id} item={item}/>);
        }
    }

    return (
        <div>
            {makeprevious()}
            {loaded?<PreviousDaysPage 
                daylinks={daylinks}
                message={message}
            />:<LoadingPage />}
        </div>
    )
}

export default PreviousDays;