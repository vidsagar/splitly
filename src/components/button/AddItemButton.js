import { useReceipt } from "context/ReceiptProvider";
import Button from "./Button";

export const AddItemButton = () => {
    const {onAddClick} = useReceipt();
    return (
        <div>
            <Button 
            label="✚"
            onClick = {onAddClick}
            variant = "add"
            />
        </div>
    )
}