import React from 'react';
import '../App.css';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

function Main(){
    const history = useHistory();

    function gotomakeaccount(e){
        history.push("/register")
    }

    function gotologin(e){
        history.push("/login")
    }

    return (
        <div className="row m-0 centerdiv">
            <div className="col-md-6 mainpagetextbox mainbox">
                <h1>Essential.</h1>
                <p> Build a habit by only needing keeping track of the two most impactful nutrients, 
                    water and sugar, and set daily goals and restrictions.

                    <br /><br />

                    Lead a healthier lifestyle in the simplest way possible and before you know it, 
                    Essential will be an essential part of your life.
                </p>
                <button onClick={gotomakeaccount} className="btn btn-dark formbutton buttonmargin">Start Tracking Now</button>   
                <button onClick={gotologin} className="btn btn-dark formbutton buttonmargin">Login</button>
            </div>
            <div className="col-md-6 mainpageimagebox">
                <img src="../test.png" className="img-fluid mainbox" alt="Responsive image" />
            </div>
        </div>
    )
}

export default Main;