import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatDate } from '../../formattingUtils';

interface UserTableProps {
    data: Array<{ [key: string]: any }>;
}

export default function UserTable({ data }: UserTableProps) {
    if (data.length === 0) {
        return <div>No data available</div>;
    }

    // Get the keys from the first user object for table headers
    const headers = Object.keys(data[0]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="dynamic table">
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell key={header}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((user, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {headers.map((header) => (
                                <TableCell key={header}>
                                    {header === 'createdAt' || header === 'updatedAt' 
                                        ?  formatDate(user[header])
                                        : String(user[header]).substring(0, 25)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
