import { ReceiptContext } from "./ReceiptContext";
import { useContext, useState, useEffect } from "react";
import { isValidInput, getBuyersPortion } from "utils/Utils";
import { useUser } from "./UserProvider";

export const ReceiptProvider = ({ children }) => {
	const { users } = useUser();
	const [items, setItems] = useState([{ 'isEvenSplit': true, 'isTax': false, itemCount: 1, 'users': [...users] }]);
	const [focused, setFocused] = useState();
	const [result, setResult] = useState("");

	const onItemChange = (e, indexToModify) => {
		if (!isValidInput(e)) return;

		const tempItems = [...items];
		tempItems[indexToModify] = {
			...tempItems[indexToModify],
			[e.target.name]: e.target.value
		}
		setItems(tempItems);
	};

	const onTaxClick = (e, indexToModify) => {
		const tempItems = [...items];
		let isSelected = e.target.getAttribute('value');
		isSelected = isSelected && isSelected === 'true';
		tempItems[indexToModify] = {
			...tempItems[indexToModify],
			[e.target.getAttribute('name')]: !isSelected
		}
		setItems(tempItems);
	}

	const onUserClick = (e, indexToModify) => {
		let modifiedUserName = e.target.getAttribute('name');
		let currentUsers = (items[indexToModify].users)
			.map(currentuser =>
				(currentuser.name === modifiedUserName) ? { ...currentuser, 'count': currentuser.count > 0 ? 0 : 1 } : currentuser
			)
		const tempItems = [...items];
		tempItems[indexToModify] = {
			...tempItems[indexToModify],
			users: currentUsers
		}
		setItems(tempItems);
	}

	useEffect(() => {
		onSubmitClick();
	}, [items])

	const handleFocus = (indexFocused) => {
		setFocused(indexFocused);
	}

	const onAddClick = () => {
		setItems([...items, { 'isEvenSplit': true, itemCount: 1, 'users': [...users] }]);
		setFocused(items.length);
	}

	const onDeleteClick = (indexToDelete) => {
		setItems((prevItems) => prevItems.filter((_, index) => index !== indexToDelete));
	}

	const onSubmitClick = () => {
		const personToPriceMap = new Map();
		let total = 0.0;
		items.forEach(
			item => {
				if ((!item.itemName || !item.itemCount || !item.itemPrice)) return;
				item.users.forEach(
					user => {
						let buyersPortion = getBuyersPortion(item, user);
						personToPriceMap.set(
							user.name,
							personToPriceMap.has(user.name) ? personToPriceMap.get(user.name) + buyersPortion : buyersPortion
						);
					}
				)
			}
		)
		for (const [key, value] of personToPriceMap.entries()) {
			total += value;
		}
		personToPriceMap.set('total', total);
		let res = JSON.stringify(Array.from(personToPriceMap));
		setResult(res);
	}

	return (
		<ReceiptContext.Provider value={{
			users,
			items,
			setItems,
			focused,
			setFocused,
			result,
			setResult,
			onItemChange,
			onTaxClick,
			onUserClick,
			handleFocus,
			onAddClick,
			onDeleteClick,
			onSubmitClick
		}}>
			{children}
		</ReceiptContext.Provider>
	)
}

export const useReceipt = () => useContext(ReceiptContext);
