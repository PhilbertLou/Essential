import React from "react";
import { Link } from 'react-router-dom';
import '../../App.css';

function ChangeInfoPage(props){
    return(
        <div className="center-screen googlefont">
            {props.message==="Updated" || props.message=== "Password changed"?<div className="alert alert-success formbox" role="alert">
                <div className="formbuttondiv">{props.message}</div>
            </div>: null}
            {(props.message && (props.message !== "Updated" && props.message !== "Password changed"))?<div className="alert alert-danger formbox" role="alert">
                <div className="formbuttondiv">{props.message}</div>
            </div>: null}
            <div className="formbox">
            <h1 className="title">Change Info</h1>
            <small className="text-muted"> Done making changes? <Link to="/home">Go back to home</Link></small>
            <br /><br />
            <form onSubmit={props.handleGoals}>
                <div className="form-group">
                    <label htmlFor="watergoal">New Water Goal:</label>
                    <input type="number" name="watergoal" value={props.water} placeholder="New Water Goal (in mL)" onChange={props.handleWChange} className="form-control forminput" id="watergoal" />
                </div>
                <div className="form-group">
                <label htmlFor="sugargoal">New Sugar Limit:</label>
                    <input type="number" name="sugargoal" value={props.sugar} placeholder="New Sugar Goal (in g)" onChange={props.handleSUChange} className="form-control forminput" id="sugargoal" />
                </div>
                <br />
                <div className="formbuttondiv">
                    <button type="submit" className="btn btn-dark formbutton">Change Goal/Limit</button>
                    <br /><br /><br />
                </div>
            </form>
            <form onSubmit={props.handlePass}>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                    <input type="text" name="password" value={props.password} placeholder="Current Password" onChange={props.handlePChange} className="form-control forminput" id="Password" />
                </div>
                <div className="form-group">
                <label htmlFor="password1">New Password:</label>
                    <input type="text" name="password1" value={props.password1} placeholder="New Password (Minimum 8 characters)" onChange={props.handleP1Change} className="form-control forminput" id="Password1" />
                </div>
                <div className="form-group">
                <label htmlFor="password2">Retype New Password:</label>
                    <input type="text" name="password2" value={props.password2} placeholder="Retype New Password" onChange={props.handleP2Change} className="form-control forminput" id="Password2" />
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

export default ChangeInfoPage;