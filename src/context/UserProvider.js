import { UserContext } from "./UserContext";
import { useContext, useState } from "react";

export const UserProvider = ({ children }) => {
<<<<<<< Updated upstream
	const [users, setUsers] = useState([]);
=======
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

>>>>>>> Stashed changes
	const addUser = (username) => {
		const newUser = {
			username: username,
			userId: crypto.randomUUID()
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
