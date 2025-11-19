import { useReceipt } from "context/ReceiptProvider";
import "styles/UserManager.css";
import React from "react";

import Button from "./Button";

export const UserManager = () => {
	const { users, onUsernameChange, addUser, removeUser } = useReceipt();

	return (
		<div className="user-manager-container">
			<p className="editable-paragraph">
				Split receipt with&nbsp;
				{
					users.map((user, index) => {
						const isLast = index === users.length - 1;
						const isSecondLast = index === users.length - 2;

						let punctuation = "";

						if (users.length > 1) {
							if (!isLast && !isSecondLast) punctuation = ", ";
							else if (isSecondLast) punctuation = " and ";
						}

						return (
							<React.Fragment key={user.userId}>
								<span className="token">
									<span
										className="input-wrap"
										role="textbox"
										contentEditable
										onBlur={(e) => onUsernameChange(e.currentTarget.textContent, user.userId)}
									>
										{user.username}
									</span>
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
			</p>
			<Button
				label="Add user"
				onClick={addUser}
				variant="add-user"
			/>
		</div>
	)
};
