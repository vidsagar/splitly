import { ItemList } from "components/ItemList";
import { AddItemButton } from "components/AddItemButton";
import { SubmitReceiptButton } from "components/SubmitReceiptButton";
import { ReceiptProvider } from "context/ReceiptProvider";
import "styles/Home.css";


export const Receipt = () => {

	return (
		<>
			<ItemList />
			<AddItemButton />
			<SubmitReceiptButton />
		</>
	)
}
