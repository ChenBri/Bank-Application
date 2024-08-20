import Button from "../../Utils/Button";
import UserTable from "../../Utils/UserTable";
import api from "../../../axiosUtils";
import { useEffect, useState } from "react";

export default function GetMany({type} : any) {

    const [data, setData] = useState([]);

    async function getData() {
        console.log("type: ", type);
        await api.get(`/admin/${type}`)
            .then(function (response: any) {
                setData(response.data.data);
            })
            .catch(function (error) {

            });
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        
        <>
            <Button type="button" classes="btn btn-blue" method={getData} text="Refresh" />

            { data !== undefined && <UserTable data={data} />}
        </>
    )
}