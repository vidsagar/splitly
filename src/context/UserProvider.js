import { UserContext } from "./UserContext";
import { useContext, useState } from "react";

export const UserProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
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
	const removeUser = () => { };

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
