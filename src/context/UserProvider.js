import { UserContext } from "./UserContext";
import { useContext, useState } from "react";

export const UserProvider = ({ children }) => {
	//hardcoded logged in user
	const [users, setUsers] = useState([
		{
			username: "Victor",
			userId: crypto.randomUUID(),
			count: 1
		}
	]);

	const addUser = (username) => {
		const newUser = {
			username: username,
			userId: crypto.randomUUID(),
			count: 1
		};
		setUsers([
			...users,
			newUser

		]);
		return true;
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
				removeUser
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
