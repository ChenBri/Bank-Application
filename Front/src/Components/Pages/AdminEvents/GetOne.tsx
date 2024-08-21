import Button from "../../Utils/Button";
import UserTable from "../../Utils/UserTable";
import api from "../../../axiosUtils";
import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { formatString } from "../../../formattingUtils";


export default function GetOne({type} : any) {
    const [data, setData] = useState<any[]>([]);
    let inputRef = useRef<HTMLInputElement>(null);

    async function getData() {
        if (!inputRef.current || inputRef.current.value === "") return;
    
        await api
            .get(`/admin/${type}/${inputRef.current.value}`)
            .then(function (response: any) {
                const userResponse = response.data.data;
    
                // Check if userResponse is an object, if so, wrap it in an array
                const formattedData = Array.isArray(userResponse) ? userResponse : [userResponse];
                setData(formattedData);
            })
            .catch(function (error) {
                setData([]);
            });
    }

    return (
        <>
            <div className="flex flex-row gap-12  mb-4">
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
