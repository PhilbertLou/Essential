import React ,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import LoadingPage from './jsxcomponents/LodingPage';
import HomePage from './jsxcomponents/HomePage';
import axios from 'axios';

function Home(props){
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

    useEffect(() =>{
        console.log("here")
        let isMounted = true;
        if(!loaded){
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
                return(res)
            })
            .then(res=>{
                if (isMounted){
                    setwaterperc(res.data.currentDay.wGoal?((100*res.data.currentDay.water/res.data.currentDay.wGoal).toFixed(2)):100);
                    setsugarperc(res.data.currentDay.suGoal?((100*res.data.currentDay.sugar/res.data.currentDay.suGoal).toFixed(2)):100);
                }
                // return(res)
            })
            // .then(res=>{
            //     return () => { isMounted = false };
            // })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
                setloaded(true);
            }})
        }
            return () => { isMounted = false };
    }, [])
    
    // function handleLogout(e){
    //     e.preventDefault();
    //     console.log(`Form submitted:`);

    //     axios.post('http://localhost:8080/user/logout/')
    //         .then(res => {
    //             props.changeStatus(false);
    //             history.push("/login");
    //         })
    //         .catch(err => {if (err.response){
    //             props.changeStatus(false);
    //             history.push("/login");
    //         }})
    // }

    function handleUpdates(e){
        e.preventDefault();
        console.log(`Form submitted:`);

        history.push("/updates");
    }

    function handleChanges(e){
        e.preventDefault();
        console.log(`Form submitted:`);

        history.push("/changeinfo");
    }

    function handlePrevious(e){
        e.preventDefault();
        console.log(`Form submitted:`);

        history.push("/previousdays");
    }

    function handleTrack(e){
        e.preventDefault();
        console.log(`Form submitted:`);

        const info = {
            water: addedwater,
            sugar: addedsugar,
        }
        console.log(info.water)
        console.log(info.sugar)
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

    function incrementwater() {
        setwater(prevCount => prevCount + parseInt(waternum));
        setaddedwater(prevCount => prevCount + parseInt(waternum));
        setwaterperc(wGoal?(100*(water+ parseInt(waternum))/wGoal).toFixed(2):100);
    }

    function incrementsugar() {
        setsugar(prevCount => prevCount + parseInt(sugarnum));
        setaddedsugar(prevCount => prevCount + parseInt(sugarnum));
        setsugarperc(suGoal?(100*(sugar+ parseInt(sugarnum))/suGoal).toFixed(2):100);
    }

    function deincrementwater() {
        if (water-waternum >= 0){
            setwater(prevCount => prevCount - waternum);
            setaddedwater(prevCount => prevCount - waternum);
            setwaterperc(wGoal?(100*(water- waternum)/wGoal).toFixed(2):100);
        }
        else{
            setaddedwater(prevCount => prevCount - water);
            setwater(0);
            setwaterperc(0);
        }
    }

    function deincrementsugar() {
        if (sugar-sugarnum >= 0){
            setsugar(prevCount => prevCount - sugarnum);
            setaddedsugar(prevCount => prevCount - sugarnum);
            setsugarperc(suGoal?(100*(sugar - sugarnum)/suGoal).toFixed(2):100);
        }
        else{
            setaddedsugar(prevCount => prevCount - sugar);
            setsugar(0);
            setsugarperc(0);
        }
    }

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

    function handleWChange(e) {
        setwaternum(e.target.value);
        setdirectwater(e.target.value);
        // setwaternum(10);
    }
    function handleSUChange(e){
        // setsugarnum(e.target.value);
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