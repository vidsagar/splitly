import { useReceipt } from "context/ReceiptProvider";
import Button from "./Button";
import './AddItemButton.scss';

export const AddItemButton = () => {
	const { onAddClick } = useReceipt();
	return (
		<div className='add-item-button'>
			<Button
				label="+"
				onClick={onAddClick}
				variant="add"
			/>
		</div>
	)
}
