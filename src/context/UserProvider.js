import { UserContext } from "./UserContext";
import { useContext, useState, useEffect } from "react";

export const UserProvider = ({children}) => {
	const [users, setUsers] = useState([]);
	const addUser = (user) => {
        setUsers([...users, user]);
        return true;
    };
	const removeUser = () => {};

	return (
		<UserContext.Provider 
			value = {{
				users,
				addUser,
				removeUser
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
