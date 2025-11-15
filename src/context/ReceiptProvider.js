import { ReceiptContext } from "./ReceiptContext";
import { useContext, useState, useEffect } from "react";
import { isValidInput, getBuyersPortion } from "utils/Utils";
import { useUser } from "./UserProvider";

export const ReceiptProvider = ({ children }) => {
	const { users } = useUser();
	const [items, setItems] = useState([]);
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

	const onItemUserClick = (userId, itemId) => {
		let modifiedItemIndex = items.findIndex(item => item.itemId === itemId);
		let itemUsers = items[modifiedItemIndex].users;


		//loop through item users
		//if userId == itemUser.userId, then set count to 1 if 0 or 0 if 1
		//if no match found, then add the userId and set count to 1.

		let isNewUser = true;
		let currentUsers = itemUsers
			.map(currentuser => {
				if (currentuser.userId === userId) {
					isNewUser = false;
					return {
						...currentuser,
						'count': currentuser.count > 0 ? 0 : 1
					};
				}
				else {
					return currentuser;
				}
			});

		if (isNewUser) {
			currentUsers = [...currentUsers, { 'userId': userId, 'count': 1 }];
		}

		const tempItems = [...items];
		tempItems[modifiedItemIndex] = {
			...tempItems[modifiedItemIndex],
			users: currentUsers
		}
		setItems(tempItems);
	}

	const handleFocus = (indexFocused) => {
		setFocused(indexFocused);
	}

	const onAddClick = () => {
		const thisitemUsers = users.map(user => ({ userId: user.userId, count: 1 }));
		const newItem = { 'isEvenSplit': true, itemId: crypto.randomUUID(), itemCount: 1, 'users': thisitemUsers };
		if (items) {
			setItems([...items, newItem]);
		}
		else {
			setItems([newItem])
		}
		setFocused(items ? items.length : 0);
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
			onItemUserClick,
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
