import { useReceipt } from "context/ReceiptProvider";
import ItemRow from "./ItemRow";
import PortionManager from "./PortionManager";


export const ItemList = () => {
    const {items} = useReceipt();
    const {focused} = useReceipt();

    const {onItemChange} = useReceipt();
    const {onTaxClick} = useReceipt();
    const {onUserClick} = useReceipt();
    const {handleFocus} = useReceipt();
    const {onDeleteClick} = useReceipt();
    return (
        <>
            {items.map( 
            (inputItem, index) => (
                    <div 
                    className = "item-input-form-row"
                    key = {index}
                    >
                    <ItemRow 
                        key={index}
                        item = {inputItem}
                        onFocus = {() => handleFocus(index)}
                        onItemChange = {(e) => onItemChange(e, index)}
                        onDeleteClick = {() => onDeleteClick(index)}
                    />
                    {
                        (index===focused)?
                        <PortionManager
                            index = {index} 
                            onTaxClick = {(e) => {return onTaxClick(e, index)}}
                            onUserClick = {(e) => {return onUserClick(e, index)}}
                            inputItem = {inputItem}
                            users = {inputItem.users}
                        />
                        :<></>
                    }
                    </div>
                )
            )}
        </>
    )
}