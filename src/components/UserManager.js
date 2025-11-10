import { useUser } from "context/UserProvider";

import { useState } from 'react';
import InputField from "./Input";
import Button from "./Button";

export const UserManager = () => {
	const [username, setUsername] = useState("");
	const onNameChange = (e) => {
		setUsername(e.target.value);
	};

	const { users, addUser, removeUser } = useUser();
	return (
		<div>
			<InputField
				id="username"
				value={username}
				placeholder="Enter user name"
				onChange={onNameChange}
				className="input-field-user-name"
			/>
			<Button
				label="Add user"
				onClick={() =>
					addUser(username) && setUsername("")
				}
			/>
			<div>
				<ul>{users.map(user =>
					<li key={user.userId}>
						{user.username}
					</li>
				)}
				</ul>
			</div>
		</div>
	)
};
