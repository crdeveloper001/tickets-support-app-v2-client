'use client';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Paper,
} from '@mui/material';

const mockProfile = {
    username: 'johndoe',
    email: 'johndoe@email.com',
    phoneNumber: '123-456-7890',
    address: {
        street: '123 Main St',
        city: 'Metropolis',
        state: 'NY',
        zipCode: '10001',
    },
    dateOfBirth: '1990-01-01',
    role: 'user',
    isActive: true,
    createdAt: '2023-01-01',
    updatedAt: '2024-01-01',
};

export default function Profile() {
    const [profile, setProfile] = useState(mockProfile);
    const [editMode, setEditMode] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [form, setForm] = useState(profile);

    const handleEdit = () => {
        setEditMode(true);
        setForm(profile);
    };

    const handleSave = () => {
        setProfile(form);
        setEditMode(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const key = name.split('.')[1];
            setForm((prev) => ({
                ...prev,
                address: { ...prev.address, [key]: value },
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDelete = () => {
        setDeleteDialog(false);
        // Add delete logic here
    };

    return (
        <Box
            sx={{
                position: 'initial',
                top: { xs: 0, md: 40 },
                left: 0,
                width: '100%',
                minHeight: { xs: '100vh', md: 'auto' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: { xs: 'flex-start', md: 'center' },
                bgcolor: 'background.default',
                zIndex: 1200,
                p: { xs: 2, md: 4 },
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    width: { xs: '100%', sm: 650, md: 800 },
                    maxWidth: '98vw',
                    borderRadius: { xs: 0, sm: 6 },
                    p: { xs: 3, md: 6 },
                    boxShadow: 12,
                }}
            >
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={8}>
                        <Typography variant="h4" fontWeight="bold" sx={{ letterSpacing: 1 }}>
                            Profile
                        </Typography>
                    </Grid>
                    <Grid item xs={4} container justifyContent="flex-end" spacing={2}>
                        <Grid item>
                            <IconButton
                                color="primary"
                                onClick={handleEdit}
                                aria-label="Edit Profile"
                                sx={{
                                    bgcolor: 'primary.50',
                                    '&:hover': { bgcolor: 'primary.100' },
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                color="error"
                                onClick={() => setDeleteDialog(true)}
                                aria-label="Delete Account"
                                sx={{
                                    bgcolor: 'error.50',
                                    '&:hover': { bgcolor: 'error.100' },
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

                <Box mt={5}>
                    <Grid container spacing={3} component="form">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Username"
                                value={profile.username}
                                fullWidth
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                value={profile.email}
                                fullWidth
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Phone Number"
                                value={profile.phoneNumber || '-'}
                                fullWidth
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Date of Birth"
                                value={
                                    profile.dateOfBirth
                                        ? new Date(profile.dateOfBirth).toLocaleDateString()
                                        : '-'
                                }
                                fullWidth
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Street"
                                value={profile.address.street}
                                fullWidth
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="City"
                                value={profile.address.city}
                                fullWidth
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="State"
                                value={profile.address.state}
                                fullWidth
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Zip Code"
                                value={profile.address.zipCode}
                                fullWidth
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Role"
                                value={profile.role}
                                fullWidth
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Status"
                                value={profile.isActive ? 'Active' : 'Inactive'}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <Box
                                            component="span"
                                            sx={{
                                                display: 'inline-block',
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                bgcolor: profile.isActive ? 'success.main' : 'grey.400',
                                                mr: 1,
                                            }}
                                        />
                                    ),
                                }}
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {/* Edit Dialog */}
            <Dialog
                open={editMode}
                onClose={() => setEditMode(false)}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: { borderRadius: 3, p: 1 },
                }}
            >
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Phone Number"
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                value={form.dateOfBirth}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Street"
                                name="address.street"
                                value={form.address.street}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="City"
                                name="address.city"
                                value={form.address.city}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="State"
                                name="address.state"
                                value={form.address.state}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Zip Code"
                                name="address.zipCode"
                                value={form.address.zipCode}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditMode(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
                PaperProps={{
                    sx: { borderRadius: 3, p: 1 },
                }}
            >
                <DialogTitle>Delete Account</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete your account? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}