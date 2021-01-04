import React from "react"
import { BrowserRouter, Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';

function PreviousLink(props) {
    const date = props.item;
    return (
        <div className="updateitem">
            <Link to={{pathname: `/previousdays/${date}`, suffix: date}}>{date}</Link>
        </div>
    )
}

export default PreviousLink;