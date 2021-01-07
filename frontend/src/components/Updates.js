// Importing neccessary modules
import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import UpdateItem from "./jsxcomponents/UpdateItem";
import UpdatePage from "./jsxcomponents/UpdatePage";
import LoadingPage from './jsxcomponents/LodingPage';
import '../App.css';

function Updates(props){
    // Set necessary states that need to be kept track of
    axios.defaults.withCredentials = true;
    const [updates, setupdates] = useState([]);
    const [message, setmessage] = useState("");
    const [loaded, setloaded] = useState(false);
    var updatejsx;
    
    // On mount will get info
    useEffect(() =>{
        axios.get('http://localhost:8080/user/homepage/')
            .then(res => {
                setupdates(res.data.currentDay.updates);
                setloaded(true);
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
                setloaded(true);
            }})
    }, [])

    // Handles making the update items
    function makeupdate(){
        if(updates){
            updatejsx = updates.slice(0).reverse().map(item => <UpdateItem key={item._id} item={item}/>);
        }
    }

    return (
        <div>
            {makeupdate()}
            {loaded?<UpdatePage 
                updatejsx={updatejsx}
                message={message}
            />:<LoadingPage />}
        </div>
    )
}

export default Updates;