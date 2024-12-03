import React from 'react';
import "../styles/InputField.css";

function InputField({id, placeholder, value, onFocus, onChange, className}){
    return(
        <input
            id={id}
            name={id}
            value={value}
            placeholder={placeholder}
            onClick={onFocus}
            onChange={onChange}
            className={className}
        />
    );
}

export default InputField;