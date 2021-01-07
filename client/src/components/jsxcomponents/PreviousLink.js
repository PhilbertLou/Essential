import React from "react"
import { Link } from 'react-router-dom';
import '../../App.css';

function PreviousLink(props) {
    const dateinfo = props.item;
    return (
        <div className="centerdiv centertext googlefont">
            <div className="card border-secondary mb-3 updatecard">
                <div className="card-body text-success">
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