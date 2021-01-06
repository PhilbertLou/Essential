import React from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';
import '../../App.css';

function LodingPage(){
    return(
        <div className="center-screen">
            <h1>Loading!</h1>
        </div>
    )
}

export default LodingPage;