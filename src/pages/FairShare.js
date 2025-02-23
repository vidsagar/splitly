import { TotalsDisplay } from "components/TotalsDisplay";
import { ItemList } from "components/ItemList";
import { AddItemButton } from "components/AddItemButton";
import { SubmitReceiptButton } from "components/SubmitReceiptButton";
import { ReceiptProvider } from "context/ReceiptProvider";
import "styles/Home.css";


export const FairShare = () => {
    
    return (
        <ReceiptProvider>
            <ItemList/>
            <AddItemButton />
            <SubmitReceiptButton />
            <TotalsDisplay/>
        </ReceiptProvider>
    )
}
