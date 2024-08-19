import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function UserTable({users} : any) {
    return (
        <TableContainer component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Updated At</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell >Phone</TableCell>
                        <TableCell >Active</TableCell>
                        <TableCell >Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(({createdAt, email, is_activated, phone, role, updatedAt, _id} : any) => (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{_id}</TableCell>
                            <TableCell>{createdAt}</TableCell>
                            <TableCell>{updatedAt}</TableCell>
                            <TableCell>{email}</TableCell>
                            <TableCell>{phone}</TableCell>
                            <TableCell>{is_activated ? "True" : "False"}</TableCell>
                            <TableCell>{role}</TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
