import React ,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

function Login(props){
    axios.defaults.withCredentials = true;
    const [username, setusername] = useState("phil2");
    const [password, setpassword] = useState("philphil");
    const [message, setmessage] = useState("");
    const history = useHistory();
    const location = useLocation();

    useEffect(() =>{
        try{
            console.log('here')
            console.log(location.message)
            setmessage(location.message)
        }
        catch{
            
        }
    }, [])

    function handleUNChange(e){
        setusername(e.target.value);
    };

    function handlePChange(e){
        setpassword(e.target.value);
    };

    function handleSubmit(e){
        //check credientials, if its right then redirect them, may need to mark as authenticated?
        //or just try and auth then redirect to login again and let app handle the rest
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
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={username} placeholder="Username" onChange={handleUNChange} />
                <br />
                <input type="text" name="password" value={password} placeholder="Password" onChange={handlePChange} />
                <br />
                <button type="submit">Submit</button>
                {message}
            </form>
        </div>
    )
}

export default Login;