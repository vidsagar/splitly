import { ItemList } from "components/itemList/ItemList";
import { AddItemButton } from "components/button/AddItemButton";
import { SubmitReceiptButton } from "components/button/SubmitReceiptButton";


export const Receipt = () => {

	return (
		<>
			<ItemList />
			<AddItemButton />
			<SubmitReceiptButton />
		</>
	)
}
