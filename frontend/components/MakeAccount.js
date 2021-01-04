import { checkPropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

function MakeAccount(props){
    axios.defaults.withCredentials = true;
    const [name, setname] = useState("phil");
    const [username, setusername] = useState("phil");
    const [password1, setpassword1] = useState("philphil");
    const [password2, setpassword2] = useState("philphil");
    const [watergoal, setwatergoal] = useState(2000);
    const [sodiumgoal, setsodiumgoal] = useState(20);
    const [sugargoal, setsugargoal] = useState(20);
    const [message, setmessage] = useState("");
    const history = useHistory();

    function handleNChange(e){
        setname(e.target.value);
    };

    function handleUNChange(e){
        setusername(e.target.value);
    };

    function handleP1Change(e){
        setpassword1(e.target.value);
    };

    function handleP2Change(e){
        setpassword2(e.target.value);
    };

    function handleWChange(e){
        setwatergoal(e.target.value);
    };

    function handleSOChange(e){
        setsodiumgoal(e.target.value);
    };

    function handleSUChange(e){
        setsugargoal(e.target.value);
    };

    function handleSubmit(e){
        //check credientials, if its right then redirect them, may need to mark as authenticated?
        //or just try and auth then redirect to login again and let app handle the rest
        e.preventDefault();
        console.log(`Form submitted:`);

        const newuser = {
            name: name,
            username: username,
            password1: password1,
            password2: password2,
            watergoal: watergoal,
            sodiumgoal: sodiumgoal,
            sugargoal: sugargoal
        };

        axios.post('http://localhost:8080/user/makeaccount/', newuser)
            .then(res => {
                props.addmessage(res.data.message);
                history.push("/login");
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
                setname("");
                setusername("");
                setpassword1("");
                setpassword2("");
                setwatergoal(0);
                setsodiumgoal(0);
                setsugargoal(0);
            }})

        // props.checklog(result)
    }

    // useEffect(() => {
    //     //check if they are already logged in, then redirect if so 
    // }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={name} placeholder="Name" onChange={handleNChange} />
                <br />
                <input type="text" name="username" value={username} placeholder="Username" onChange={handleUNChange} />
                <br />
                <input type="text" name="password1" value={password1} placeholder="Password" onChange={handleP1Change} />
                <br />
                <input type="text" name="password2" value={password2} placeholder="Retype Password" onChange={handleP2Change} />
                <br />
                <input type="number" name="watergoal" value={watergoal} placeholder="Water Goal" onChange={handleWChange} />
                <br />
                <input type="number" name="sodiumgoal" value={sodiumgoal} placeholder="Sodium Goal" onChange={handleSOChange} />
                <br />
                <input type="number" name="sugargoal" value={sugargoal} placeholder="Sugar Goal" onChange={handleSUChange} />
                <br />
                <button type="submit">Submit</button>
                {message}
            </form>
        </div>
    )
}

export default MakeAccount;