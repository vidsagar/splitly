import { useUser } from "context/UserProvider";

import { useState } from 'react';
import InputField from "./Input";
import Button from "./Button";
import "styles/UserManager.css";

export const UserManager = () => {
	const [username, setUsername] = useState();
	const onNameChange = (e) => {
		setUsername(e.target.value);
	};

	const { users, addUser, removeUser } = useUser();
	return (
		<div className="user-manager-container">
			<span>Split with:</span>
			{
				users.map(user =>
					<div key={user.userId} >
						<InputField
							id="username"
							value={user.username}
							placeholder={user.username}
							onChange={onNameChange}
							className="input-field-user-name"
						/>
						<Button
							label="✖"
							onClick={() => removeUser(user.userId)}
							variant="delete"
						/>
					</div>
				)
			}
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
		</div >
	)
};
