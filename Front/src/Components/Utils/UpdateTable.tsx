

interface Update {
    sender: string;
    reciever: string;
    amount: number;
    createdAt: String;
}


export default function UpdateTable({ updates }: { updates: any }) {
    let id = 0;

    let email = sessionStorage.getItem("email");

    function formatDate(date : string) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    return (
        updates.map(({ sender, reciever, amount, createdAt }: Update) => {

            return (
                <tr key={++id}>
                    <th>{formatDate(createdAt.toString())}</th>
                    {email === sender ? <th>{reciever}</th> : <th>{sender}</th>}
                    {email === sender ? <th className="!text-red-500">- {amount}$</th> : <th className="!text-green-500">+ {amount}$</th>}
                </tr>
            )
        })
    )

}
