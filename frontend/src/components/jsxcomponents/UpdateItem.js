import React from "react"
import '../../App.css';

function UpdateItem(props) {
    return (
        <div className="centerdiv centertext">
            <div className="card border-secondary mb-3 updatecard">
                <div classsName="card-header">{props.item.time} </div>
                <div classsName="card-body text-success">
                    <h5 classsName="card-title"><i class="fas fa-water"></i>  Water Change: <span className="card-text inlinevalue">{props.item.water>0? '+': null}{props.item.water}mL</span></h5>
                    <h5 classsName="card-title"><i class="fas fa-cookie-bite"></i>  Sugar Change: <span className="card-text inlinevalue">{props.item.sugar>0? '+': null}{props.item.sugar}g</span></h5> 
                </div>
            </div>
        </div>
    )
}

export default UpdateItem