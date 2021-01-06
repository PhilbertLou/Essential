import React ,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './jsxcomponents/LoginPage';
import LoadingPage from './jsxcomponents/LodingPage';

function Login(props){
    axios.defaults.withCredentials = true;
    const [username, setusername] = useState("phil2");
    const [password, setpassword] = useState("philphil");
    const [message, setmessage] = useState("");
    const [loaded, setloaded] = useState(false);
    const history = useHistory();
    const location = useLocation();

    useEffect(() =>{
        try{
            setmessage(location.message)
            setloaded(true);
        }
        catch{
            setloaded(true);
        }
    }, [])

    function handleUNChange(e){
        setusername(e.target.value);
    };

    function handlePChange(e){
        setpassword(e.target.value);
    };

    function handleMakeAccount(e){
        history.push("/register")
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(`Form submitted:`);

        const user = {
            username: username,
            password: password,
        };

        axios.post('http://localhost:8080/user/login/', user)
            .then(res => {
                // props.addmessage(res.data.message);
                props.changeStatus(true);
                history.push("/home");
            })
            .catch(err => {if (err.response){
                setmessage(err.response.data.message);
                setusername("");
                setpassword("");
            }})
    }

    return (
        <div>
            {loaded?<LoginPage
                handleSubmit={handleSubmit}
                handleUNChange={handleUNChange}
                handlePChange={handlePChange}
                handleMakeAccount={handleMakeAccount}
                username={username}
                password={password}
                message={message}
            />: <LoadingPage />}
        </div>
    )
}

export default Login;