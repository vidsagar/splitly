import { UserContext } from "./UserContext";
import { useContext, useState } from "react";

export const UserProvider = ({ children }) => {
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

	const addUser = () => {
		const userId = crypto.randomUUID();
		setUsers([
			...users,
			{
				username: "",
				userId: userId
			}
		]);
		return userId;
	};

	const removeUser = (idToRemove) => {
		const newUsers = users.filter(user => user.userId !== idToRemove);
		setUsers(newUsers);
	};

	return (
		<UserContext.Provider
			value={{
				users,
				addUser,
				removeUser,
				onUsernameChange
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
