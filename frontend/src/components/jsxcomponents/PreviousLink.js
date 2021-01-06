import React from "react"
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';
import '../../App.css';

function PreviousLink(props) {
    const dateinfo = props.item;
    return (
        // <div className="updateitem">
        //     <Link to={{pathname: `/previousdays/${dateinfo.date}/${dateinfo.id}`, 
        //         suffix: `${dateinfo.date}/${dateinfo.id}`}}>{dateinfo.date}</Link>
        // </div>
        
        <div className="centerdiv centertext googlefont">
            <div className="card border-secondary mb-3 updatecard">
                {/* <div classsName="card-header">palceholder</div> */}
                <div className="card-body text-success">
                    {/* <h5 classsName="card-title"></h5> */}
                    <br />
                    <Link to={{pathname: `/previousdays/${dateinfo.date}/${dateinfo.id}`, 
                         suffix: `${dateinfo.date}/${dateinfo.id}`}}>{dateinfo.date}</Link>
                    <br /><br />  
                </div>
            </div>
        </div>
    )
}

export default PreviousLink;