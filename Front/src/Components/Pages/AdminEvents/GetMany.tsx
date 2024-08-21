import Button from "../../Utils/Button";
import UserTable from "../../Utils/UserTable";
import api from "../../../axiosUtils";
import { useEffect, useState } from "react";

interface GetManyProps {
    type: string;
}

interface Data {
    [key: string]: string | number | Date;
}

export default function GetMany({ type }: GetManyProps) {
    const [data, setData] = useState<Data[]>([]);

    async function getData() {
        console.log("type: ", type);
        try {
            const response = await api.get(`/admin/${type}`);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Button type="button" classes="btn btn-blue" method={getData} text="Refresh" />

            {data.length > 0 && <UserTable data={data} />}
        </>
    );
}
