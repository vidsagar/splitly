import React from "react";
import Button from "./Button";
import "./EntryModifier.css"

function EntryModifier({inputItem, users, index, onTaxClick, onUserClick}) {
    return(
        <div className = "entry-modifier">
            <div className = "split-tax-row">
                <Button 
                    label = "Split Evenly" 
                    className = "split-tax-button"
                    name="isEvenSplit"
                    value={inputItem?.isEvenSplit}
                    onClick={onTaxClick}
                    variant = {inputItem?.isEvenSplit?"primary":"inactive"}
                />
                <Button 
                    name="isTax"
                    value={inputItem?.isTax}
                    onClick = {onTaxClick} 
                    variant={inputItem?.isTax?"primary":"inactive"} 
                    label = "Taxable" 
                    className = "split-tax-button"
                />
            </div>
           
            <div className="users-count-row">
                {
                    users.map(
                        (user) => 
                            {
                                return(
                                    <div className="user-count-update">
                                        <Button 
                                            name={user?.name}
                                            onClick = {onUserClick} 
                                            variant={user?.count>0?"primary":"inactive"} 
                                            label = {user?.name} 
                                            className = "user-button"
                                        />
                                        {inputItem?.isEvenSplit?
                                        <></>:
                                        <div className = "count-update-row">
                                            <span className="count-text">1</span>
                                            <Button label = "+"/>
                                        </div>}
                                        
                                    </div>
                                )
                            }
                    )
                }
            </div>
        </div>
    )
}

export default EntryModifier;