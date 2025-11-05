import { TotalsDisplay } from "components/TotalsDisplay";
import { ItemList } from "components/ItemList";
import { AddItemButton } from "components/AddItemButton";
import { SubmitReceiptButton } from "components/SubmitReceiptButton";
import { ReceiptProvider } from "context/ReceiptProvider";
import { UserProvider } from "context/UserProvider";
import "styles/Home.css";
import {UserManager} from "components/UserManager";


export const FairShare = () => {
    
    return (
        <UserProvider>
            <ReceiptProvider>
                <UserManager/>
                <ItemList/>
                <AddItemButton />
                <SubmitReceiptButton />
                <TotalsDisplay/>
            </ReceiptProvider>
        </UserProvider>
    )
}
