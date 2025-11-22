import { ReceiptContext } from "./ReceiptContext";
import { useContext, useState } from "react";
import { isValidInput, getBuyersPortion } from "utils/Utils";

export const ReceiptProvider = ({ children }) => {
	/***** USER STORE START *****/
	const [users, setUsers] = useState([
		{
			username: "Victor",
			userId: crypto.randomUUID(),
		}
	]);

	const onUsernameChange = (newUsername, userId) => {
		const indexToUpdate = users.findIndex(user => user.userId === userId);
		const tempUsers = [...users];
		tempUsers[indexToUpdate] = {
			...tempUsers[indexToUpdate],
			username: newUsername,
		};
		setUsers(tempUsers);
	};

	const addUser = (username) => {
		const userId = crypto.randomUUID();
		setUsers([
			...users,
			{
				username: username,
				userId: userId
			}
		]);
		return userId;
	};

	const removeUser = (idToRemove) => {
		setUsers(prev => prev.filter(user => user.userId !== idToRemove));
		setItems(prev => prev.map(item => {
			return {
				...item,
				users: item.users.filter(user => user.userId !== idToRemove),
			}
		}));
	};

	/***** USER STORE END *****/

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
		if (items) { //if there are existing items
			setItems([...items, newItem]);
		}
		else { //if this is the first item in the receipt
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
							user.userId,
							{
								username: users.find(globalUser => globalUser.userId === user.userId).username,
								portion: personToPriceMap.has(user.userId) ? personToPriceMap.get(user.userId) + buyersPortion : buyersPortion,
							}
						);
					}
				)
			}
		)
		for (const [key, value] of personToPriceMap.entries()) {
			total += value.portion;
		}
		personToPriceMap.set('total', total);
		let res = JSON.stringify(Array.from(personToPriceMap));
		setResult(res);
	}

	return (
		<ReceiptContext.Provider value={{
			users,
			addUser,
			removeUser,
			onUsernameChange,

			items,
			setItems,
			onItemChange,
			onTaxClick,
			onItemUserClick,
			onAddClick,
			onDeleteClick,
			onSubmitClick,

			focused,
			setFocused,
			handleFocus,

			result,
			setResult,
		}}>
			{children}
		</ReceiptContext.Provider>
	)
}

export const useReceipt = () => useContext(ReceiptContext);
