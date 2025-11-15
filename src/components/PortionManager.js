import React from "react";
import Button from "./Button";
import "../styles/EntryModifier.css"
import Input from "./Input.js";
import { useUser } from "context/UserProvider";

function PortionManager({ inputItem, itemUsers = [], onTaxClick, onItemUserClick }) {
	const { users } = useUser();

	const tempUsers = users.map(
		user => {
			let itemUser = itemUsers.find(itemUser => itemUser.userId === user.userId);
			if (itemUser) {
				return { 'username': user.username, 'userId': itemUser.userId, 'count': itemUser.count };
			}
			else {
				return { 'username': user.username, 'userId': user.userId, 'count': 0 };
			}
		}
	)

	return (
		<div className="entry-modifier">
			<div className="split-tax-row">
				<Button
					label="Split Evenly"
					className="split-tax-button"
					name="isEvenSplit"
					value={inputItem?.isEvenSplit}
					onClick={onTaxClick}
					variant={inputItem?.isEvenSplit ? "primary" : "inactive"}
				/>
				<Button
					name="isTax"
					value={inputItem?.isTax}
					onClick={onTaxClick}
					variant={inputItem?.isTax ? "primary" : "inactive"}
					label="Taxable"
					className="split-tax-button"
				/>
			</div>

			<div className="users-count-row">
				{
					tempUsers.map(
						(user) => {
							return (
								<div className="user-count-update" key={user.userId}>
									<Button
										name={user.username}
										onClick={() => onItemUserClick(user.userId, inputItem.itemId)}
										variant={user?.count > 0 ? "primary" : "inactive"}
										label={user?.username}
										className="user-button"
									/>
									{inputItem?.isEvenSplit ?
										<></> :
										<Input className="count-text" />
									}
								</div>
							)
						}
					)
				}
			</div>
		</div>
	)
}

export default PortionManager;
