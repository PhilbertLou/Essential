import React ,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import ChangeInfoPage from './jsxcomponents/ChangeInfoPage';
import LoadingPage from './jsxcomponents/LodingPage';

function ChangeInfo(props){
    axios.defaults.withCredentials = true;
    const [water, setwater] = useState(0);
    const [sugar, setsugar] = useState(0);
    const [password, setpassword] = useState("");
    const [password1, setpassword1] = useState("");
    const [password2, setpassword2] = useState("");
    const [message, setmessage] = useState("");
    // const [loaded, setloaded] = useState(0);
    const history = useHistory();

    function handleWChange(e){
        setwater(e.target.value);
    };
    function handleSUChange(e){
        setsugar(e.target.value);
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
        e.preventDefault();
        console.log(`Form submitted:`);

        history.push("/home");
    }

    function handleGoals(e){
        e.preventDefault();
        console.log(`Form submitted:`);

        const newgoals = {
            newwatergoal: parseFloat(water).toFixed(2),
            newsugargoal: parseFloat(sugar).toFixed(2)
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
                setpassword("");
                setpassword1("");
                setpassword2("");
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
                setpassword("");
                setpassword1("");
                setpassword2("");
            }})
    }

    return (
        <div>
            <ChangeInfoPage 
                handleWChange={handleWChange}
                handleSUChange={handleSUChange}
                handleGoals={handleGoals}
                handlePass={handlePass}
                handlePChange={handlePChange}
                handleP1Change={handleP1Change}
                handleP2Change={handleP2Change}
                handleBack={handleBack}
                water={water}
                sugar={sugar}
                password={password}
                password1={password1}
                password2={password2}
                message={message}
            />
        </div>
    )
}

export default ChangeInfo;