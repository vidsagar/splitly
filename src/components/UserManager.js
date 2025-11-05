import { useUser } from "context/UserProvider";

import {useState} from 'react';
import InputField from "./Input";
import Button from "./Button";

export const UserManager = () => {
    const [name, setName] = useState("");
    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const {users, addUser, removeUser} = useUser();
    return (
        <div>
            <InputField
                id="userName"
                value={name}
                placeholder="Enter user name"
                onChange={onNameChange}
                className="input-field-user-name"
            />
            <Button
                label = "Add user"
                onClick = {() => 
                    addUser(name) && setName("")
                }
            />
            <div>{users.join(', ')}</div>
        </div>
    )
};
