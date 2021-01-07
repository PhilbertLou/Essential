import React from "react";
import { Link } from 'react-router-dom';
import '../../App.css';

function UpdatePage(props){
    return(
        <div className= "centerdiv centertext googlefont">
            <h1>See Updates</h1>
            <small className="text-muted">Done Checking Updates? <Link to="/home">Go Back</Link></small>
            <br />
            <br />
            {props.updatejsx}
            <br />
        </div>
    )
}

export default UpdatePage;