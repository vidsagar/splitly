import { UserContext } from "./UserContext";
import { useContext, useState } from "react";

export const UserProvider = ({ children }) => {
	const [users, setUsers] = useState([
		{
			username: "Victor",
			userId: crypto.randomUUID(),
		}
	]);

	const onUsernameChange = (e, userId) => {
		const indexToUpdate = users.findIndex(user => user.userId === userId);
		const tempUsers = [...users];
		tempUsers[indexToUpdate] = {
			...tempUsers[indexToUpdate],
			username: e.target.value,
		};
		setUsers(tempUsers);
	};

	const addUser = () => {
		const newUser = {
			username: "",
			userId: crypto.randomUUID()
		};
		setUsers([
			...users,
			newUser
		]);
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
