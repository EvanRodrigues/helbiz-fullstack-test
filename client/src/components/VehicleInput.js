import React, { useRef } from "react";

export const VehicleInput = (props) => {
    /*
     * Set a reference to the input for access on submit.
     */
    const inputRef = useRef();

    return (
        <div className="inputContainer">
            <input type="text" ref={inputRef}></input>
            <button
                onClick={() => {
                    props.handleSubmit(
                        inputRef.current ? inputRef.current.value : ""
                    );
                }}
            >
                Submit
            </button>
        </div>
    );
};
