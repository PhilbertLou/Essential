// Importing neccessary modules
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import MakeAccountPage from './jsxcomponents/MakeAccountPage';

function MakeAccount(){
    // Set necessary states that need to be kept track of
    axios.defaults.withCredentials = true;
    const [name, setname] = useState("");
    const [username, setusername] = useState("");
    const [password1, setpassword1] = useState("");
    const [password2, setpassword2] = useState("");
    const [watergoal, setwatergoal] = useState("");
    const [sugargoal, setsugargoal] = useState("");
    const [message, setmessage] = useState("");
    const history = useHistory();

     // Functions that handle the form input in real-time
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

    // Function that will redirect user to login page
    function handleBack(e){
        history.push("/login");
    };

    // Handles making an account
    function handleSubmit(e){
        e.preventDefault();

        const newuser = {
            name: name,
            username: username,
            password1: password1,
            password2: password2,
            watergoal: parseFloat(watergoal).toFixed(2),
            sugargoal: parseFloat(sugargoal).toFixed(2)
        };

        // If the API responds without errors, an account will be made, otherwise the user will be notified of that
        axios.post('http://localhost:8080/user/makeaccount/', newuser)
            .then(res => {
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