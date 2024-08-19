import Button from "../../Utils/Button";
import UserTable from "../../Utils/UserTable";
import api from "../../../axiosUtils";
import { useRef, useState } from "react";
import { TextField } from "@mui/material";

// Define the user type
interface User {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    phone: string;
    is_activated: boolean;
    role: string;
}

export default function GetUserEvent() {
    const [users, setUsers] = useState<User[]>([]);
    let inputRef = useRef<HTMLInputElement>(null);

    async function getUser() {
        if (!inputRef.current) return;

        await api
            .get(`/admin/users/${inputRef.current.value}`)
            .then(function (response: any) {
                const userResponse = response.data.user;
                setUsers(userResponse ? userResponse : []);

            })
            .catch(function (error) {
                setUsers([]);
            });
    }

    return (
        <>
            <TextField
                className="w-full mb-4"
                label="User ID:"
                variant="outlined"
                inputRef={inputRef}
                onChange={getUser}
            />

            <UserTable users={users} />
        </>
    );
}
