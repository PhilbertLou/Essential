import React from "react"
import '../../App.css';

function UpdateItem(props) {
    return (
        <div className="centerdiv centertext">
            {(props.item.water||props.item.sugar)?<div className="card border-secondary mb-3 updatecard">
                <div className="card-header">{props.item.time} </div>
                <div className="card-body">
                    {props.item.water?<h5 className="card-title"><i className="fas fa-water"></i>  Water Change: <span className="card-text inlinevalue">{props.item.water>0? '+': null}{props.item.water} mL</span></h5>:null}
                    {props.item.sugar?<h5 className="card-title"><i className="fas fa-cookie-bite"></i>  Sugar Change: <span className="card-text inlinevalue">{props.item.sugar>0? '+': null}{props.item.sugar} g</span></h5>: null }
                </div>
            </div>:null}
        </div>
    )
}

export default UpdateItem