import React from "react";
import { Link } from 'react-router-dom';
import '../../App.css';

function UpdatePage(props){
    return(
        <div className= "centerdiv centertext googlefont">
            {props.message?<div className="alert alert-success formbox" role="alert">
                <div className="formbuttondiv">{props.message}</div>
            </div>: null}
            <h1>Previous Days</h1>
            <small className="text-muted">Done Seeing Previous Days? <Link to="/home">Go Back</Link></small>
            <br />
            <br />
            {props.daylinks}
            <br />
        </div>
    )
}

export default UpdatePage;