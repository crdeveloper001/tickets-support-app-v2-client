import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, Paper, Typography, useMediaQuery 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Example ticket data (replace with your data source)
const tickets = [
    {
        _id: '1',
        title: 'Login issue',
        description: 'Cannot login to the system',
        priority: 'High',
        status: 'Open',
        createdBy: { name: 'Alice' },
        assignedTo: { name: 'Bob' },
        createdAt: new Date('2024-06-01T10:00:00Z'),
        updatedAt: new Date('2024-06-02T12:00:00Z'),
        comments: [],
    },
    {
        _id: '2',
        title: 'Page not loading',
        description: 'Dashboard page is blank',
        priority: 'Medium',
        status: 'In Progress',
        createdBy: { name: 'Charlie' },
        assignedTo: { name: 'Diana' },
        createdAt: new Date('2024-06-03T09:30:00Z'),
        updatedAt: new Date('2024-06-03T15:45:00Z'),
        comments: [],
    },
    {
        _id: '3',
        title: 'Feature request: Dark mode',
        description: 'Add dark mode to the app',
        priority: 'Low',
        status: 'Open',
        createdBy: { name: 'Eve' },
        assignedTo: { name: 'Frank' },
        createdAt: new Date('2024-06-04T14:20:00Z'),
        updatedAt: new Date('2024-06-04T14:20:00Z'),
        comments: [],
    },
    {
        _id: '4',
        title: 'Error 500 on save',
        description: 'Saving a ticket returns error 500',
        priority: 'High',
        status: 'Resolved',
        createdBy: { name: 'Grace' },
        assignedTo: { name: 'Heidi' },
        createdAt: new Date('2024-06-05T11:10:00Z'),
        updatedAt: new Date('2024-06-06T08:00:00Z'),
        comments: [],
    },
    {
        _id: '5',
        title: 'Notification emails not sent',
        description: 'Users do not receive notification emails',
        priority: 'Medium',
        status: 'Open',
        createdBy: { name: 'Ivan' },
        assignedTo: { name: 'Judy' },
        createdAt: new Date('2024-06-06T16:00:00Z'),
        updatedAt: new Date('2024-06-06T16:00:00Z'),
        comments: [],
    },
    {
        _id: '6',
        title: 'UI glitch on mobile',
        description: 'Buttons overlap on mobile view',
        priority: 'Low',
        status: 'In Progress',
        createdBy: { name: 'Mallory' },
        assignedTo: { name: 'Oscar' },
        createdAt: new Date('2024-06-07T13:45:00Z'),
        updatedAt: new Date('2024-06-07T14:10:00Z'),
        comments: [],
    },
    {
        _id: '7',
        title: 'Password reset not working',
        description: 'Reset link does not arrive',
        priority: 'High',
        status: 'Open',
        createdBy: { name: 'Peggy' },
        assignedTo: { name: 'Trent' },
        createdAt: new Date('2024-06-08T07:30:00Z'),
        updatedAt: new Date('2024-06-08T09:00:00Z'),
        comments: [],
    },
];

const headCells = [
{ id: 'title', label: 'Title' },
{ id: 'priority', label: 'Priority' },
{ id: 'status', label: 'Status' },
{ id: 'createdBy', label: 'Created By' },
{ id: 'assignedTo', label: 'Assigned To' },
{ id: 'createdAt', label: 'Created At' },
{ id: 'updatedAt', label: 'Updated At' },
];

function descendingComparator(a, b, orderBy) {
if (orderBy === 'createdBy' || orderBy === 'assignedTo') {
    const aName = a[orderBy]?.name || '';
    const bName = b[orderBy]?.name || '';
    return bName.localeCompare(aName);
}
if (a[orderBy] < b[orderBy]) return 1;
if (a[orderBy] > b[orderBy]) return -1;
return 0;
}

function getComparator(order, orderBy) {
return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
const stabilized = array.map((el, idx) => [el, idx]);
stabilized.sort((a, b) => {
    const cmp = comparator(a[0], b[0]);
    if (cmp !== 0) return cmp;
    return a[1] - b[1];
});
return stabilized.map(el => el[0]);
}

export default function View({ data = tickets }) {
const [order, setOrder] = useState('asc');
const [orderBy, setOrderBy] = useState('createdAt');
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
};

return (
    <Paper sx={{ width: '100%', overflow: 'auto' }}>
        <Typography variant="h6" sx={{ m: 2 }}>
            Tickets
        </Typography>
        <TableContainer>
            <Table size={isMobile ? 'small' : 'medium'}>
                <TableHead>
                    <TableRow>
                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                sortDirection={orderBy === headCell.id ? order : false}
                                sx={{ minWidth: 100 }}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={() => handleRequestSort(headCell.id)}
                                >
                                    {headCell.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(data, getComparator(order, orderBy)).map((ticket) => (
                        <TableRow key={ticket._id} hover>
                            <TableCell>{ticket.title}</TableCell>
                            <TableCell>{ticket.priority}</TableCell>
                            <TableCell>{ticket.status}</TableCell>
                            <TableCell>{ticket.createdBy?.name || '-'}</TableCell>
                            <TableCell>{ticket.assignedTo?.name || '-'}</TableCell>
                            <TableCell>
                                {new Date(ticket.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                {new Date(ticket.updatedAt).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                    {data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={headCells.length} align="center">
                                No tickets found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
);
}