import React from "react"
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';

function PreviousLink(props) {
    const dateinfo = props.item;
    return (
        <div className="updateitem">
            <Link to={{pathname: `/previousdays/${dateinfo.date}/${dateinfo.id}`, 
                suffix: `${dateinfo.date}/${dateinfo.id}`}}>{dateinfo.date}</Link>
        </div>
    )
}

export default PreviousLink;