import React from 'react';
import InputField from "../components/InputField";
import Button from "../components/Button";
import "../styles/InputRow.css";

function InputRow({item, onFocus, onItemChange, onDeleteClick}){
    return(
        <div className="item-input-row">
            <InputField
                id="itemName"
                value={item.itemName}
                placeholder="Enter item name"
                onFocus = {onFocus}
                onChange={onItemChange}
                className="input-field-item-name"
            />
            <InputField
                id="itemPrice"
                value={item.itemPrice}
                placeholder="Price"
                onFocus = {onFocus}
                onChange={onItemChange}
                className="input-field-item-price"
            />
            <InputField
                id="itemCount"
                value={item.itemCount}
                placeholder="Count"
                onFocus = {onFocus}
                onChange={onItemChange}
                className="input-field-item-count"
            />
            <Button 
                label = "✖"
                onClick = {onDeleteClick}
                variant = "delete"
            />
        </div>
    );
}

export default InputRow;