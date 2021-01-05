import React from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';
import '../../App.css';
// import UpdateItem from "./UpdateItem"

function UpdatePage(props){
    return(
        <div className= "centerdiv centertext">
            <h1>Previous Days</h1>
            <small className="text-muted">Done Seeing Previous Days? <Link to="/home">Go Back</Link></small>
            <br />
            <br />
            {props.test}
            <br />
        </div>
    )
}

export default UpdatePage;