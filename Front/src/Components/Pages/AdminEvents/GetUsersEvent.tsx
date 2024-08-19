import Button from "../../Utils/Button";
import UserTable from "../../Utils/UserTable";
import api from "../../../axiosUtils";
import { useEffect, useState } from "react";

export default function GetUsersEvent() {

    const [users, setUsers] = useState([]);

    async function getUsers() {
        await api.get("/admin/users")
            .then(function (response: any) {
                setUsers(response.data.users);
            })
            .catch(function (error) {

            });
    }

    useEffect(() => {
        getUsers();
    }, []);



    return (
        <>
            <Button type="button" classes="btn btn-blue" method={getUsers} text="Refresh" />

            <UserTable users={users} />
        </>
    )
}