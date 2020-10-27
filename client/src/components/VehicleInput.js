import React from "react";

export const VehicleInput = (props) => {
    const updateInput = (event) => {
        props.setter(event.target.value);
    };

    return (
        <div className="inputContainer">
            <input type="text" onChange={updateInput}></input>
            <button onClick={props.handleSubmit}>Submit</button>
        </div>
    );
};
