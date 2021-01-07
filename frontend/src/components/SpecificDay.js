// Importing neccessary modules
import { useHistory, useLocation} from 'react-router-dom';
import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import UpdateItem from "./jsxcomponents/UpdateItem";
import LoadingPage from './jsxcomponents/LodingPage';
import SpecificDayPage from './jsxcomponents/SpecificDayPage';

function SpecificDay(props) {
    // Sets variables from passed in props
    const day = props.match.params.day;
    const id = props.match.params.id;
    axios.defaults.withCredentials = true;

    // Set necessary states that need to be kept track of
    const [date, setdate] = useState("");
    const [water, setwater] = useState(0);
    const [sugar, setsugar] = useState(0);
    const [wGoal, setwGoal] = useState(0);
    const [suGoal, setsuGoal] = useState(0);
    const [updates, setupdates] = useState([]);
    const [loaded, setloaded] = useState(false);
    const [waterperc, setwaterperc] = useState(0);
    const [sugarperc, setsugarperc] = useState(0);
    const [message, setmessage] = useState("");
    const history = useHistory();
    var allupdates;

    // On mount gets information about a certain date
    useEffect(() =>{
        axios.get(`http://localhost:8080/user/previousdays/${day}/${id}`)
            .then(res => {
                setdate(res.data.date);
                setwater(res.data.water);
                setsugar(res.data.sugar);
                setwGoal(res.data.wGoal);
                setsuGoal(res.data.suGoal);
                setupdates(res.data.updates);
                setloaded(true);
                return(res);
            })
            .then(res=>{
                setwaterperc(res.data.wGoal?((100*res.data.water/res.data.wGoal).toFixed(2)):100);
                setsugarperc(res.data.suGoal?((100*res.data.sugar/res.data.suGoal).toFixed(2)):100);
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
                setloaded(true);
            }})
    }, [])

    // Redirects to previousdays on a button press
    function handleBack(e){
        e.preventDefault();
        history.push("/previousdays");
    }

    // Makes the update items
    function makeupdates(){
        if(updates){
            allupdates = updates.map(item => <UpdateItem key={item._id} item={item}/>);
        }
    }

    return (
        <div>
            {makeupdates()}
            {loaded? 
            <div>
            <SpecificDayPage 
                date={date}
                water={water}
                sugar={sugar}
                wGoal={wGoal}
                suGoal={suGoal}
                waterperc={waterperc}
                sugarperc={sugarperc}
                message={message}
                handleBack={handleBack}
            />
            <br />
            <div style={{textAlign:"center"}}>
                <h1>Updates</h1>
            </div>
            {allupdates}
            </div>
            :<LoadingPage />}
        </div>
    )
}

export default SpecificDay;