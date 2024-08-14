import { forwardRef } from 'react';
import React from "react";

type InputProps = {
    text: String,
    type: "text" | "password" | "phone" |  undefined,
    id: string,
}

export const Input = forwardRef(function Input(props : InputProps, ref : any) {
    const { text, type, id } = props;
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{text}:</label>
            <input type={type} className="form-control" id={id} ref={ref} />
        </div>
    )

});

export default Input;