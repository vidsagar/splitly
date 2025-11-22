import { useReceipt } from "context/ReceiptProvider";
import "styles/UserManager.css";
import React, { useState } from "react";

import Button from "./Button";
import AutoGrowInput from "./AutoGrowInput";

export const UserManager = () => {
	const { users, onUsernameChange, addUser, removeUser } = useReceipt();

	const [newUser, setNewUser] = useState("");

	const updateUsername = (value) => {
		setNewUser(value);
	}

	const addNewUser = (newUsername) => {
		if (!newUsername) return;
		addUser(newUsername);
		deleteNewUser();
	}

	const deleteNewUser = () => {
		setNewUser("");
	}


	return (
		<div className="user-manager-container">
			<p className="editable-paragraph">
				Split receipt with&nbsp;
				{
					users.map((user, index) => {
						const isLast = index === users.length - 1;
						let punctuation = users.length > 1 ? ", " : "";

						return (
							<React.Fragment key={user.userId}>
								<span className="token">
									<AutoGrowInput
										className="input-wrap"
										value={user.username}
										onChange={(username) => onUsernameChange(username, user.userId)}
									/>
									<button
										type="button"
										className="delete-btn"
										onClick={() => removeUser(user.userId)}
									>
										×
									</button>
								</span>
								{!isLast && punctuation}
							</React.Fragment>
						)
					})
				}
				{users.length >= 1 ? " and " : ""}

				<span className="token">
					<AutoGrowInput
						value={newUser}
						onChange={updateUsername}
						onBlur={addNewUser}
					/>
					<button
						type="button"
						className="delete-btn"
						onClick={deleteNewUser}
					>
						×
					</button>
				</span>
			</p>
			<Button
				label="Add user"
				onClick={() => addUser("")}
				variant="add-user"
			/>
		</div>
	)
}
