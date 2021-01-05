import React from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';

function Navbar(){
    return(
        <div>
            <div className="pos-f-t">
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="bg-dark p-3">
                <span className="text-muted">
                    <Link to="/" className="text-muted">Home</Link>
                </span>
                <br/><br/>
                <span className="text-muted">
                    <Link to="/login" className="text-muted">Login</Link>
                </span>
                <br/><br/>
                <span className="text-muted">
                    <Link to="/makeaccount" className="text-muted">Make Account</Link>
                </span>
                </div>
            </div>
            <nav className="navbar navbar-dark bg-dark p-3">
                <Link to="/" className="navbar-brand">Essential</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
            </div>
        </div>
    )
}

export default Navbar;