// Importing neccessary modules
import React ,{ useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './jsxcomponents/LoginPage';
import LoadingPage from './jsxcomponents/LodingPage';

function Login(props){
    // Set necessary states that need to be kept track of
    axios.defaults.withCredentials = true;
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [message, setmessage] = useState("");
    const [loaded, setloaded] = useState(false);
    const history = useHistory();
    const location = useLocation();

    // Will save a message if there is a message when mounted
    useEffect(() =>{
        let isMounted = true;
        try{
            if (isMounted){
                setmessage(location.message);
                setloaded(true);
            }
        }
        catch{
            if (isMounted){
                setloaded(true);
            }
        }
        return () => { isMounted = false };
    }, [])

    // Functions that handle the form input in real-time
    function handleUNChange(e){
        setusername(e.target.value);
    };
    function handlePChange(e){
        setpassword(e.target.value);
    };
    function handleMakeAccount(e){
        history.push("/register");
    }

    // Function that handles logging in a user
    function handleSubmit(e){
        e.preventDefault();

        const user = {
            username: username,
            password: password,
        };

        // Logs in the user if they have been authenticated, otherwise tell them they were unsuccessful
        axios.post('http://localhost:8080/user/login/', user)
            .then(res => {
                props.changeStatus(true);
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