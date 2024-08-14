import { Pagination } from "@mui/material"
import UpdateTable from "./UpdateTable"
import api from '../../axiosUtils';
import { AxiosError, AxiosResponse } from "axios";


export default function Table({ updates, setUpdates }: { updates: any, setUpdates: any }) {

    return updates.data && updates.data.length > 0 ? <ValidTable updates={updates} setUpdates={setUpdates} /> : <NotValidTable />

}

function NotValidTable() {
    return (
        <div className="text-center display-6">No Data</div>
    )
}

function ValidTable({ updates, setUpdates }: { updates: any, setUpdates: any }) {

    async function handleChange(event: any, value: any) {
        
        await api.get("/transactions", {
            params: {
                offset: (value - 1) * 10,
                limit: 10,
            },
        })
            .then(function (response : AxiosResponse<any, any>) {
                setUpdates(response.data);
            })
            .catch(function (error : Error | AxiosError) {
                console.log(error);
            });
    }

    return (
        <>
            <table id="update-table" className="table table-striped ">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Recipient</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <UpdateTable updates={updates.data} />
                </tbody>
            </table>
            <div className="flex justify-center items-center">
                <Pagination count={updates.totalPages} onChange={handleChange} variant="outlined" className="my-2"/>
            </div>
        </>
    )
}