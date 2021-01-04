import React from "react"

function UpdateItem(props) {
    return (
        <div className="updateitem">
            <p>{props.time} {props.water} {props.sugar} {props.sodium}test</p>
        </div>
    )
}

export default UpdateItem