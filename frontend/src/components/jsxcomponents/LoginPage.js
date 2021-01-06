import React from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';
import '../../App.css';

function LoginPage(props){
    return(
        <div className="center-screen googlefont">
            {props.message === "Account made!"?<div className="alert alert-success formbox" role="alert">
                <div className="formbuttondiv">{props.message}</div>
            </div>: null}
            {(props.message && props.message !== "Account made!")?<div className="alert alert-danger formbox" role="alert">
                <div className="formbuttondiv">{props.message}</div>
            </div>: null}
            <div className="formbox">
            <h1 className="title">Login</h1>
            <small className="text-muted"> Sign into Essential or <Link to="/register">create an account</Link></small>
            <br /><br />
            <form onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" value={props.username} placeholder="Username" onChange={props.handleUNChange} className="form-control forminput" id="username" />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password:</label>
                    <input type="text" name="password" value={props.password} placeholder="Password" onChange={props.handlePChange} className="form-control forminput" id="Password" />
                </div>
                <br />
                <div className="formbuttondiv">
                    <button type="submit" className="btn btn-dark formbutton">Submit</button>
                    <br /><br /><br />
                </div>
            </form>
            <br /><br /><br /><br />
            </div>
        </div>
    )
}

export default LoginPage;