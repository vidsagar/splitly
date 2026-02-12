import { useReceipt } from "context/ReceiptProvider";
import ItemRow from "components/inputRow/ItemRow";
import PortionManager from "components/portionManager/PortionManager";
import "./ItemList.scss"


export const ItemList = () => {
	const { items } = useReceipt();
	const { focused } = useReceipt();

	const { onItemChange } = useReceipt();
	const { onTaxClick } = useReceipt();
	const { onItemUserClick } = useReceipt();
	const { handleFocus } = useReceipt();
	const { onDeleteClick } = useReceipt();
	return (
		<>
			{items?.map(
				(inputItem, index) => (
					<div
						className="item-input-form-row"
						key={index}
					>
						<ItemRow
							key={index}
							item={inputItem}
							onFocus={() => handleFocus(index)}
							onItemChange={(e) => onItemChange(e, index)}
							onDeleteClick={() => onDeleteClick(index)}
						/>
						{
							(index === focused) &&
							<PortionManager
								index={index}
								onTaxClick={(e) => onTaxClick(e, index)}
								onItemUserClick={onItemUserClick}
								inputItem={inputItem}
								itemUsers={inputItem.users}
							/>
						}
					</div>
				)
			)}
		</>
	)
}
