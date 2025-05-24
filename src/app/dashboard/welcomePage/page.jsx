import React from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const WelcomePage = () => (
    <Box
        sx={{
            minHeight: '10vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            p: 2,
        }}
    >
        <Paper elevation={3} sx={{ maxWidth: 'auto', width: '100%', p: 4 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <SupportAgentIcon color="primary" sx={{ fontSize: 60 }} />
                </Grid>
                <Grid item xs>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome to Ticket Support App
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Manage your support tickets efficiently and stay updated with real-time notifications. Our ticketing system helps you:
            </Typography>
            <ul>
                <li>
                    <Typography variant="body2">
                        Submit and track support requests easily.
                    </Typography>
                </li>
                <li>
                    <Typography variant="body2">
                        Communicate with support agents in one place.
                    </Typography>
                </li>
                <li>
                    <Typography variant="body2">
                        Get timely updates on ticket status and resolutions.
                    </Typography>
                </li>
                <li>
                    <Typography variant="body2">
                        Access your ticket history anytime.
                    </Typography>
                </li>
            </ul>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button variant="contained" color="primary" size="large">
                    Create New Ticket
                </Button>
            </Box>
        </Paper>
    </Box>
);

export default WelcomePage;