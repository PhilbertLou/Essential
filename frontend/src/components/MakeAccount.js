import { checkPropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import MakeAccountPage from './jsxcomponents/MakeAccountPage';

function MakeAccount(props){
    axios.defaults.withCredentials = true;
    const [name, setname] = useState("phil");
    const [username, setusername] = useState("phil");
    const [password1, setpassword1] = useState("philphil");
    const [password2, setpassword2] = useState("philphil");
    const [watergoal, setwatergoal] = useState(2000);
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

    function handleSUChange(e){
        setsugargoal(e.target.value);
    };

    function handleBack(e){
        history.push("/login");
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(`Form submitted:`);

        const newuser = {
            name: name,
            username: username,
            password1: password1,
            password2: password2,
            watergoal: watergoal,
            sugargoal: sugargoal
        };

        axios.post('http://localhost:8080/user/makeaccount/', newuser)
            .then(res => {
                // props.addmessage(res.data.message);
                history.push({pathname: "/login", message: "Account made!"})
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
                setname("");
                setusername("");
                setpassword1("");
                setpassword2("");
                setwatergoal(0);
                setsugargoal(0);
            }})
    }

    return (
        <div>
            <MakeAccountPage
                name={name}
                username={username}
                password1={password1}
                password2={password2}
                watergoal={watergoal}
                sugargoal={sugargoal}
                message={message}
                handleNChange={handleNChange}
                handleUNChange={handleUNChange}
                handleP1Change={handleP1Change}
                handleP2Change={handleP2Change}
                handleWChange={handleWChange}
                handleSUChange={handleSUChange}
                handleSubmit={handleSubmit}
                handleBack={handleBack}
            />
        </div>
    )
}

export default MakeAccount;