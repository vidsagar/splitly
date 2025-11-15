import { UserContext } from "./UserContext";
import { useContext } from "react";
import { ItemContext } from "./ItemContext";

export const ItemProvider = ({ children }) => {
	return (
		<ItemContext.Provider value={{}}>
			{children}
		</ItemContext.Provider>
	);
};

export const useItem = () => useContext(UserContext);
