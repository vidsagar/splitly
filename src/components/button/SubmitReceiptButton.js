import { useReceipt } from "context/ReceiptProvider";
import Button from "./Button";

export const SubmitReceiptButton = () => {
    const {onSubmitClick} = useReceipt();
    return (
        <div>
            <Button 
                label="Submit"
                onClick = {onSubmitClick}
                variant = "submit"
            />
        </div>
    )
}