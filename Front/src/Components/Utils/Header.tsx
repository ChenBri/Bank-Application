/* import { Link } from "react-router-dom"; */

import { Card } from "@mui/material";





export default function Header({ children } : {children: string}) {

    return (
        <Card className="text-center text-3xl text-[#4085df] align-middle p-4 w-auto">
            {children}
            </Card>
    )
}
