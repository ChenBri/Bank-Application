import Button from "../../Utils/Button";
import UserTable from "../../Utils/UserTable";
import api from "../../../axiosUtils";
import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { formatString } from "../../../formattingUtils";

interface GetOneProps {
    type: string;
}

interface Data {
    [key: string]: string | number | Date;
}

export default function GetOne({ type }: GetOneProps) {
    const [data, setData] = useState<Data[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    async function getData() {
        if (!inputRef.current || inputRef.current.value === "") return;

        try {
            const response = await api.get(`/admin/${type}/${inputRef.current.value}`);
            const userResponse = response.data.data;

            const formattedData = Array.isArray(userResponse) ? userResponse : [userResponse];
            setData(formattedData);
        } catch (error) {
            setData([]);
        }
    }

    return (
        <>
            <div className="flex flex-row gap-12 mb-4">
                <TextField
                    className="w-full"
                    label={`${formatString(type)} ID:`}
                    variant="outlined"
                    inputRef={inputRef}
                    onChange={getData}
                />
                <Button type="button" classes="btn btn-blue" method={getData} text="Refresh" />
            </div>

            <UserTable data={data} />
        </>
    );
}
