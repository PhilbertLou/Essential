import React from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';
import '../../App.css';
// import UpdateItem from "./UpdateItem"

function UpdatePage(props){
    return(
        <div className= "centerdiv centertext">
            <h1>See Updates</h1>
            <small className="text-muted">Done Checking Updates? <Link to="/home">Go Back</Link></small>
            <br />
            <br />
            {props.updatejsx}
            <br />
            {/* <form onSubmit={props.handleBack}>
                <button type="submit">Go back</button>
            </form> */}
        </div>
    )
}

export default UpdatePage;