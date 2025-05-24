"use client";
import React, { useState, useMemo } from "react";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    Switch,
} from "@mui/material";

// Mock data for demonstration
const mockAccounts = [
    {
        username: "john_doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
        address: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
        },
        dateOfBirth: "1990-01-01",
        role: "user",
        isActive: true,
        createdAt: "2023-01-01",
        updatedAt: "2023-06-01",
    },
    {
        username: "admin_user",
        email: "admin@example.com",
        phoneNumber: "0987654321",
        address: {
            street: "456 Admin Rd",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90001",
        },
        dateOfBirth: "1985-05-15",
        role: "admin",
        isActive: false,
        createdAt: "2022-05-10",
        updatedAt: "2023-05-10",
    },
    {
        username: "jane_smith",
        email: "jane.smith@example.com",
        phoneNumber: "5551234567",
        address: {
            street: "789 Oak Ave",
            city: "Chicago",
            state: "IL",
            zipCode: "60601",
        },
        dateOfBirth: "1992-03-22",
        role: "user",
        isActive: true,
        createdAt: "2023-02-15",
        updatedAt: "2023-07-01",
    },
    {
        username: "michael_brown",
        email: "michael.brown@example.com",
        phoneNumber: "2223334444",
        address: {
            street: "321 Pine St",
            city: "Houston",
            state: "TX",
            zipCode: "77001",
        },
        dateOfBirth: "1988-11-30",
        role: "admin",
        isActive: true,
        createdAt: "2021-12-20",
        updatedAt: "2023-03-15",
    },
    {
        username: "lucy_liu",
        email: "lucy.liu@example.com",
        phoneNumber: "7778889999",
        address: {
            street: "654 Maple Dr",
            city: "San Francisco",
            state: "CA",
            zipCode: "94101",
        },
        dateOfBirth: "1995-07-10",
        role: "user",
        isActive: false,
        createdAt: "2022-08-05",
        updatedAt: "2023-01-20",
    },
    {
        username: "peter_parker",
        email: "peter.parker@example.com",
        phoneNumber: "1112223333",
        address: {
            street: "987 Spider Ln",
            city: "Queens",
            state: "NY",
            zipCode: "11365",
        },
        dateOfBirth: "1998-08-10",
        role: "user",
        isActive: true,
        createdAt: "2023-04-12",
        updatedAt: "2023-06-30",
    },
    {
        username: "susan_clark",
        email: "susan.clark@example.com",
        phoneNumber: "4445556666",
        address: {
            street: "159 Cedar Ct",
            city: "Miami",
            state: "FL",
            zipCode: "33101",
        },
        dateOfBirth: "1991-12-05",
        role: "admin",
        isActive: false,
        createdAt: "2022-11-11",
        updatedAt: "2023-02-28",
    },
];

const columns = [
    { id: "username", label: "Username" },
    { id: "email", label: "Email" },
    { id: "phoneNumber", label: "Phone" },
    { id: "address", label: "Address" },
    { id: "dateOfBirth", label: "Date of Birth" },
    { id: "role", label: "Role" },
    { id: "isActive", label: "Active" },
    { id: "createdAt", label: "Created At" },
    { id: "updatedAt", label: "Updated At" },
    { id: "actions", label: "Actions" },
];

function descendingComparator(a, b, orderBy) {
    if (orderBy === "address") {
        const aAddr = `${a.address.street}, ${a.address.city}, ${a.address.state}, ${a.address.zipCode}`;
        const bAddr = `${b.address.street}, ${b.address.city}, ${b.address.state}, ${b.address.zipCode}`;
        return bAddr.localeCompare(aAddr);
    }
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
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
    return stabilized.map((el) => el[0]);
}

export default function AccountManagementPage() {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("username");
    const [filter, setFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [activeFilter, setActiveFilter] = useState("");

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const filteredAccounts = useMemo(() => {
        return mockAccounts.filter((account) => {
            const matchesFilter =
                account.username.toLowerCase().includes(filter.toLowerCase()) ||
                account.email.toLowerCase().includes(filter.toLowerCase()) ||
                (account.phoneNumber && account.phoneNumber.includes(filter)) ||
                (account.address &&
                    `${account.address.street} ${account.address.city} ${account.address.state} ${account.address.zipCode}`
                        .toLowerCase()
                        .includes(filter.toLowerCase()));
            const matchesRole = roleFilter ? account.role === roleFilter : true;
            const matchesActive =
                activeFilter === ""
                    ? true
                    : activeFilter === "active"
                    ? account.isActive
                    : !account.isActive;
            return matchesFilter && matchesRole && matchesActive;
        });
    }, [filter, roleFilter, activeFilter]);

    const sortedAccounts = useMemo(
        () => stableSort(filteredAccounts, getComparator(order, orderBy)),
        [filteredAccounts, order, orderBy]
    );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Account Management
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={roleFilter}
                        label="Role"
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={activeFilter}
                        label="Status"
                        onChange={(e) => setActiveFilter(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.id} sortDirection={orderBy === col.id ? order : false}>
                                    <TableSortLabel
                                        active={orderBy === col.id}
                                        direction={orderBy === col.id ? order : "asc"}
                                        onClick={() => handleRequestSort(col.id)}
                                    >
                                        {col.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedAccounts.map((account, idx) => (
                            <TableRow key={account.username + idx}>
                                <TableCell>{account.username}</TableCell>
                                <TableCell>{account.email}</TableCell>
                                <TableCell>{account.phoneNumber}</TableCell>
                                <TableCell>
                                    {account.address
                                        ? `${account.address.street}, ${account.address.city}, ${account.address.state}, ${account.address.zipCode}`
                                        : ""}
                                </TableCell>
                                <TableCell>
                                    {account.dateOfBirth
                                        ? new Date(account.dateOfBirth).toLocaleDateString()
                                        : ""}
                                </TableCell>
                                <TableCell>{account.role}</TableCell>
                                <TableCell>
                                    <Switch checked={account.isActive} disabled />
                                </TableCell>
                                <TableCell>
                                    {account.createdAt
                                        ? new Date(account.createdAt).toLocaleDateString()
                                        : ""}
                                </TableCell>
                                <TableCell>
                                    {account.updatedAt
                                        ? new Date(account.updatedAt).toLocaleDateString()
                                        : ""}
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        {sortedAccounts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No accounts found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}