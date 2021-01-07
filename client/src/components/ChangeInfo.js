// Importing neccessary modules
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ChangeInfoPage from './jsxcomponents/ChangeInfoPage';

function ChangeInfo(){
    // Setting necessary states
    axios.defaults.withCredentials = true;
    const [water, setwater] = useState("");
    const [sugar, setsugar] = useState("");
    const [password, setpassword] = useState("");
    const [password1, setpassword1] = useState("");
    const [password2, setpassword2] = useState("");
    const [message, setmessage] = useState("");
    const history = useHistory();

    // Functions that keeps the states updated in real time
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
        history.push("/home");
    }

    // Function that updates the goals
    function handleGoals(e){
        e.preventDefault();

        const newgoals = {
            newwatergoal: parseFloat(water).toFixed(2),
            newsugargoal: parseFloat(sugar).toFixed(2)
        };

        // Passes the new goals to the API to verify then update
        axios.post('http://localhost:8080/user/changegoals', newgoals)
            .then(res => {
                setmessage(res.data.message);
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
            }})
    }

    // Function that updates the password
    function handlePass(e){
        e.preventDefault();

        const pass = {
            password: password,
            password1: password1,
            password2: password2
        };

        // Sends info to backend to verify, then changes the password if verified
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

    // Creates ChangeInfoPage element to render the page
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