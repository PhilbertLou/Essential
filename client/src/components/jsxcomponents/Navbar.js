import React from "react";
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <div className="googlefont">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">Essential</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/login" className="nav-link text-muted">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link text-muted">Register</Link>
                </li>
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default Navbar;