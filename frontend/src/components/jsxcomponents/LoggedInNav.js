import React from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';

function LoggedInNav(props){
    return(
        <div className="googlefont">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">Essential</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/home" className="nav-link text-muted">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/updates" className="nav-link text-muted">Update Log</Link>
                </li>
                <li className="previousdays">
                    <Link to="/previousdays" className="nav-link text-muted">Previous Days</Link>
                </li>
                <li className="nav-item">
                    <Link to="/changeinfo" className="nav-link text-muted">Change Info</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link text-muted" onClick={props.handleLogout}>Log Out</Link>
                </li>
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default LoggedInNav;