import { useUser } from "context/UserProvider";

import Button from "./Button";
import "styles/UserManager.css";
import { IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"

export const UserManager = () => {
	const { users, onUsernameChange, addUser, removeUser } = useUser();

	return (
		<div className="user-manager-container">
			<div className="users-row">
				<span className="split-with-text">Split with:&nbsp;</span>
				{
					users.map(user =>
						<div key={user.userId} >
							<TextField
								size="small"
								variant="outlined"
								value={user.username}
								placeholder={user.username}
								onChange={(e) => onUsernameChange(e, user.userId)}
								inputProps={{ size: 'sizeChars' }}
								sx={{
									backgroundColor: 'gray',
									borderRadius: '6px',
									color: 'white',
									width: `${Math.max(Math.min(user.username.length, 30), 8)}ch`,
									'& input': {
										color: 'white',
										padding: '4px 8px',
									},
								}}
							/>
							<IconButton
								onClick={() => removeUser(user.userId)}
								size='small'
								sx={{ color: 'white' }}
							>
								<CloseIcon
									color="inherit"
									fontSize="small"
								/>
							</IconButton>
						</div>
					)
				}
			</div>
			<Button
				label="Add user"
				onClick={() =>
					addUser("")
				}
			/>
		</div >
	)
};
