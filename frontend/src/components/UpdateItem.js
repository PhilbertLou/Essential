import React from "react"

function UpdateItem(props) {
    return (
        <div className="updateitem">
            <p>{props.item.time} {props.item.water} {props.item.sugar}</p>
        </div>
    )
}

export default UpdateItem