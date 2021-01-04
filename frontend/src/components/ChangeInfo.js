import React ,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

function ChangeInfo(props){
    axios.defaults.withCredentials = true;
    const [water, setwater] = useState(0);
    const [sugar, setsugar] = useState(0);
    const [sodium, setsodium] = useState(0);
    const [password, setpassword] = useState("");
    const [password1, setpassword1] = useState("");
    const [password2, setpassword2] = useState("");
    const [message, setmessage] = useState("");
    const history = useHistory();

    // useEffect(() =>{
    //     console.log(props);
    // }, [])

    function handleWChange(e){
        setwater(e.target.value);
    };
    function handleSUChange(e){
        setsugar(e.target.value);
    };
    function handleSOChange(e){
        setsodium(e.target.value);
    };
    function handleP1Change(e){
        setpassword1(e.target.value);
    };
    function handleP2Change(e){
        setpassword2(e.target.value);
    };
    function handlePChange(e){
        setpassword(e.target.value);
    };
    function handleBack(e){
        //check credientials, if its right then redirect them, may need to mark as authenticated?
        //or just try and auth then redirect to login again and let app handle the rest
        e.preventDefault();
        console.log(`Form submitted:`);

        history.push("/home");
    }

    function handleGoals(e){
        //check credientials, if its right then redirect them, may need to mark as authenticated?
        //or just try and auth then redirect to login again and let app handle the rest
        e.preventDefault();
        console.log(`Form submitted:`);

        const newgoals = {
            newwatergoal: water,
            newsodiumgoal: sodium,
            newsugargoal: sugar
        };

        axios.post('http://localhost:8080/user/changegoals', newgoals)
            .then(res => {
                setmessage(res.data.message);
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
            }})
    }

    function handlePass(e){
        //check credientials, if its right then redirect them, may need to mark as authenticated?
        //or just try and auth then redirect to login again and let app handle the rest
        e.preventDefault();
        console.log(`Form submitted:`);

        const pass = {
            password: password,
            password1: password1,
            password2: password2
        };

        axios.post('http://localhost:8080/user/changepass', pass)
            .then(res => {
                setmessage(res.data.message);
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
            }})
    }

    return (
        <div>
            <form onSubmit={handleGoals}>
                <input type="number" name="watergoal" value={water} placeholder="New Water Goal" onChange={handleWChange} />
                <br />
                <input type="number" name="sugargoal" value={sugar} placeholder="New Sugar Goal" onChange={handleSUChange} />
                <br />
                <input type="number" name="sodiumgoal" value={sodium} placeholder="New Sodium Goal" onChange={handleSOChange} />
                <br />
                <button type="submit">Submit</button>
                {/* {message} */}
            </form>
            <form onSubmit={handlePass}>
                <input type="text" name="password" value={password} placeholder="Current Password" onChange={handlePChange} />
                <br />
                <input type="text" name="password1" value={password1} placeholder="New Password" onChange={handleP1Change} />
                <br />
                <input type="text" name="password2" value={password2} placeholder="Retype New Password" onChange={handleP2Change} />
                <br />
                <button type="submit">Submit</button>
                {/* {message} */}
            </form>
            <form onSubmit={handleBack}>
                <button type="submit">Go back</button>
            </form>
            {message}
        </div>
    )
}

export default ChangeInfo;