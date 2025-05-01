'use client';
import React from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    Divider,
    Button,
    FormHelperText,
} from '@mui/material';
import useRegistrationForm from './hooks/useRegistrationForm';

export default function Page() {
    const { formState, errors, handleChange, resetForm, validateForm, registerUser } = useRegistrationForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formState);
            registerUser()
            resetForm(); // Reset the form after successful submission
        } else {
            console.log('Validation errors:', errors);
        }
    };

    return (
        <Container maxWidth="100%" suppressHydrationWarning={true}
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9,
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Account Registration
                </Typography>

                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    {/* Basic Info */}
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Basic Info
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={formState.username}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formState.dateOfBirth}
                                    onChange={handleChange}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.dateOfBirth}
                                    helperText={errors.dateOfBirth}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Contact Info */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Contact Info
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={formState.phoneNumber}
                                    onChange={handleChange}
                                    fullWidth
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Address */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Address
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Street"
                                    name="address.street"
                                    value={formState.address.street}
                                    onChange={handleChange}
                                    fullWidth
                                    error={!!errors.address}
                                    helperText={errors.address && 'Complete address is required'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="City"
                                    name="address.city"
                                    value={formState.address.city}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="State"
                                    name="address.state"
                                    value={formState.address.state}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="ZIP Code"
                                    name="address.zipCode"
                                    value={formState.address.zipCode}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Box>


                    <Box sx={{ mt: 4 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Account Info
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                    fullWidth
                                    error={!!errors.password}
                                    helperText={errors.password}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Role"
                                    name="role"
                                    value={formState.role}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                        </Grid>
                    </Box>


                    <Button sx={{ mt: 5 }} variant="contained" color="primary" type="submit" >
                        CREATE MY ACCOUNT
                    </Button>
                    <Button sx={{ mt: 5, ml: 2 }} variant="outlined" color="secondary" onClick={resetForm}>
                        RESET
                    </Button>
                    <Divider sx={{ my: 2 }} />
                </Box>
                <FormHelperText sx={{ mt: 2 }}>
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                </FormHelperText>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="textSecondary" align="center">
                    Already have an account? <a href="/login">Login here</a>
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="textSecondary" align="center">
                    <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
                </Typography>
                <Divider sx={{ my: 2 }} />
            </Paper>
        </Container>
    );
}
