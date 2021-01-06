import React from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';
import '../../App.css';

function MakeAccountPage(props){
    return(
        // <form onSubmit={props.handleSubmit}>
        //         <input type="text" name="name" value={props.name} placeholder="Name" onChange={props.handleNChange} />
        //         <br />
        //         <input type="text" name="username" value={props.username} placeholder="Username" onChange={props.handleUNChange} />
        //         <br />
        //         <input type="text" name="password1" value={props.password1} placeholder="Password" onChange={props.handleP1Change} />
        //         <br />
        //         <input type="text" name="password2" value={props.password2} placeholder="Retype Password" onChange={props.handleP2Change} />
        //         <br />
        //         <input type="number" name="watergoal" value={props.watergoal} placeholder="Water Goal" onChange={props.handleWChange} />
        //         <br />
        //         <input type="number" name="sugargoal" value={props.sugargoal} placeholder="Sugar Goal" onChange={props.handleSUChange} />
        //         <br />
        <div className="center-screen formmargin">
            {props.message?<div className="alert alert-danger formbox" role="alert">
                <div className="formbuttondiv">{props.message}</div>
            </div>: <br/>}
            <div className="formbox">
            <h1 className="title">Register</h1>
            <small className="text-muted">Already have an account? <Link to="/login">Sign in!</Link></small>
            <br /><br />
            <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={props.name} placeholder="Name" onChange={props.handleNChange} className="form-control forminput" id="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" value={props.username} placeholder="Username" onChange={props.handleUNChange} className="form-control forminput" id="username" />
                </div>
                <div className="form-group">
                <label htmlFor="password1">Password:</label>
                    <input type="text" name="password" value={props.password1} placeholder="Password (Minimum 8 characters)" onChange={props.handleP1Change} className="form-control forminput" id="Password1" />
                </div>
                <div className="form-group">
                <label htmlFor="password2">Retype Password:</label>
                    <input type="text" name="password2" value={props.password2} placeholder="Retype Password" onChange={props.handleP2Change} className="form-control forminput" id="Password2" />
                </div>
                <div className="form-group">
                <label htmlFor="watergoal">Daily Water Goal:</label>
                    <input type="text" name="watergoal" value={props.watergoal} placeholder="Water Goal (in mL)" onChange={props.handleWChange} className="form-control forminput" id="watergoal" />
                </div>
                <div className="form-group">
                <label htmlFor="sugargoal">Daily Sugar Limit:</label>
                    <input type="text" name="sugargoal" value={props.sugargoal} placeholder="Sugar Limit (in g)" onChange={props.handleSUChange} className="form-control forminput" id="sugargoal" />
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

export default MakeAccountPage;