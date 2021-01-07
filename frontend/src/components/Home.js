// Importing neccessary modules
import React ,{ useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingPage from './jsxcomponents/LodingPage';
import HomePage from './jsxcomponents/HomePage';
import axios from 'axios';

function Home(props){
    // Set necessary states that need to be kept track of
    axios.defaults.withCredentials = true;
    const [name, setname] = useState("");
    const [date, setdate] = useState("");
    const [water, setwater] = useState(0);
    const [sugar, setsugar] = useState(0);
    const [wGoal, setwGoal] = useState(0);
    const [suGoal, setsuGoal] = useState(0);
    const [addedwater, setaddedwater] = useState(0);
    const [addedsugar, setaddedsugar] = useState(0);
    const [waternum, setwaternum] = useState(10);
    const [sugarnum, setsugarnum] = useState(1);
    const [message, setmessage] = useState("");
    const [directwater, setdirectwater] = useState("");
    const [directsugar, setdirectsugar] = useState("");
    const [loaded, setloaded] = useState(false);
    const [waterperc, setwaterperc] = useState(0);
    const [sugarperc, setsugarperc] = useState(0);
    const history = useHistory();

    // Will run on mount once only
    useEffect(() =>{

        // Gets the current date
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let isMounted = true;
        const info = {
            date:date
        }

        // Checks if the info currently correct with the date, if not the API will correct it
        axios.post('http://localhost:8080/user/checkday', info)
        .then(res=>{
            if(res){
                // After ensuring that the info is correct, the info is then stored in state
                axios.get('http://localhost:8080/user/homepage/')
                .then(res => {
                    if (isMounted){
                        setname(res.data.name);
                        setdate(res.data.date);
                        setwater(res.data.currentDay.water);
                        setsugar(res.data.currentDay.sugar);
                        setwGoal(res.data.currentDay.wGoal);
                        setsuGoal(res.data.currentDay.suGoal);
                        setloaded(true);
                    }
                    return(res);
                })
                // Asynchronously calculates the percentages after values have been filled
                .then(res=>{
                    if (isMounted){
                        setwaterperc(res.data.currentDay.wGoal?((100*res.data.currentDay.water/res.data.currentDay.wGoal).toFixed(2)):100);
                        setsugarperc(res.data.currentDay.suGoal?((100*res.data.currentDay.sugar/res.data.currentDay.suGoal).toFixed(2)):100);
                    }
                })
                // Catches error
                .catch(err => {if (err.response){
                    if (isMounted){
                        setmessage(err.response.data.message);
                        setloaded(true);
                    }
                }})
            }
        })
            return () => { isMounted = false };
    }, [])

    // Button onClick events that redirect to another page
    function handleUpdates(e){
        e.preventDefault();
        history.push("/updates");
    }
    function handleChanges(e){
        e.preventDefault();
        history.push("/changeinfo");
    }
    function handlePrevious(e){
        e.preventDefault();
        history.push("/previousdays");
    }

    // Sends new info to API to track
    function handleTrack(e){
        e.preventDefault();

        // Gets time and date
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        const info = {
            water: addedwater,
            sugar: addedsugar,
            date: date,
            time: time
        }

        // Sends info to API to process and update
        axios.post('http://localhost:8080/today/addinfo', info)
            .then(res => {
                setmessage(res.data.message);
                setaddedwater(0);
                setaddedsugar(0);
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
            }})
    }

    // Increments the water count in real-time
    function incrementwater() {
        setwater(prevCount => (parseFloat(prevCount) + parseFloat(waternum)).toFixed(2));
        setaddedwater(prevCount => (parseFloat(prevCount) + parseFloat(waternum)).toFixed(2));
        setwaterperc(wGoal?(100*(parseFloat(water) + parseFloat(waternum))/wGoal).toFixed(2):100);
    }

    // Increments the sugar count in real-time
    function incrementsugar() {
        setsugar(prevCount => (parseFloat(prevCount) + parseFloat(sugarnum)).toFixed(2));
        setaddedsugar(prevCount => (parseFloat(prevCount) + parseFloat(sugarnum)).toFixed(2));
        setsugarperc(suGoal?(100*(parseFloat(sugar)+ parseFloat(sugarnum))/suGoal).toFixed(2):100);
    }

    // Decrements the water count in real-time
    function deincrementwater() {
        if (water-waternum >= 0){
            setwater(prevCount => (parseFloat(prevCount) - parseFloat(waternum)).toFixed(2));
            setaddedwater(prevCount => (parseFloat(prevCount) + parseFloat(sugarnum)).toFixed(2));
            setwaterperc(wGoal?(100*(parseFloat(water)- parseFloat(waternum))/wGoal).toFixed(2):100);
        }
        else{
            setaddedwater(prevCount => (parseFloat(prevCount) - parseFloat(water)).toFixed(2));
            setwater(0);
            setwaterperc(0);
        }
    }

    // Decrements the sugar count in real time
    function deincrementsugar() {
        if (sugar-sugarnum >= 0){
            setsugar(prevCount => (parseFloat(prevCount) - parseFloat(sugarnum)).toFixed(2));
            setaddedsugar(prevCount => (parseFloat(prevCount) - parseFloat(sugarnum)).toFixed(2));
            setsugarperc(suGoal?(100*(parseFloat(sugar) - parseFloat(sugarnum))/suGoal).toFixed(2):100);
        }
        else{
            setaddedsugar(prevCount => (parseFloat(prevCount) - parseFloat(sugar)).toFixed(2));
            setsugar(0);
            setsugarperc(0);
        }
    }

    // Functions that set the number we increment/decrement a nutrient by when a button is clicked
    function water10() {
        setwaternum(10);
    }
    function water50() {
        setwaternum(50);
    }
    function water100() {
        setwaternum(100);
    }
    function sugar1() {
        setsugarnum(1);
    }
    function sugar5() {
        setsugarnum(5);
    }
    function sugar10() {
        setsugarnum(10);
    }

    // Same as above but instead when a custom increment count is entered
    function handleWChange(e) {
        setwaternum(e.target.value);
        setdirectwater(e.target.value);
    }
    function handleSUChange(e){
        setdirectsugar(e.target.value);
        setsugarnum(e.target.value);
    }
    
    return (
        <div>
            {loaded? <HomePage 
                name={name}
                date={date}
                water={water}
                sugar={sugar}
                wGoal={wGoal}
                suGoal={suGoal}
                waterperc={waterperc}
                sugarperc={sugarperc}
                water10={water10}
                water50={water50}
                water100={water100}
                directwater={directwater}
                waternum={waternum}
                handleWChange={handleWChange}
                sugar1={sugar1}
                sugar5={sugar5}
                sugar10={sugar10}
                directsugar={directsugar}
                sugarnum={sugarnum}
                handleSUChange={handleSUChange}
                incrementwater={incrementwater}
                deincrementwater={deincrementwater}
                incrementsugar={incrementsugar}
                deincrementsugar={deincrementsugar}
                handleTrack={handleTrack}
                handleLogout={props.handleLogout}
                handleUpdates={handleUpdates}
                handleChanges={handleChanges}
                handlePrevious={handlePrevious}
                message={message}
            />:<LoadingPage />}
        </div>
    )
}

export default Home;