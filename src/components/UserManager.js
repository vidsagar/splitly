import { useUser } from "context/UserProvider";

import { useState } from 'react';
import InputField from "./Input";
import Button from "./Button";

export const UserManager = () => {
	const [username, setUsername] = useState("");

	const { users, onUsernameChange, addUser, removeUser } = useUser();
	return (
		<div>
			{
				users.map(user =>
					<div>
						<InputField
							value={user.username}
							placeholder={user.username}
							onChange={(e) => onUsernameChange(e, user.userId)}
							className="input-field-user-name"
						/>
						<Button
							label="X"
							onClick={removeUser}
						/>
					</div>
				)
			}
			<Button
				label="Add user"
				onClick={addUser}
			/>
		</div>
	)
};
