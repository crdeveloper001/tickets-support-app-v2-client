'use client';
import React from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Divider } from '@mui/material';
import useLoginPage from './hooks/useLoginPage'; // Import the custom hook

const Page = () => {
    const { credentials, handleEmailChange, handlePasswordChange, resetFields,authenticateUser } = useLoginPage();

    const handleSubmit = (e) => {
        
        e.preventDefault();
        console.log('Submitted credentials:', credentials);
        //resetFields(); // Reset the form fields after submission

        authenticateUser()
    };

    return (
        <Box 
            sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '95%', sm: '80%', md: 1000 },
                maxWidth: '100%',
                zIndex: 10,
            }}
        >
            <Card
                elevation={6}
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    borderRadius: 3,
                    overflow: 'hidden',
                }}
            >
                {/* Sección de imagen + texto */}
                <Box
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        flex: 1,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                        Bienvenido a Nuestra App
                        <br />
                        Tu solución para tickets de soporte y gestion de incidencias en un solo lugar.
                    </Typography>
                    <Box
                        component="img"
                        src="/images/wallpaperLogin.avif"
                        alt="Info App"
                        sx={{
                            width: '100%',
                            maxWidth: 340,
                            borderRadius: 2,
                            boxShadow: 1,
                        }}
                    />
                </Box>

                {/* Sección de login */}
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        Iniciar sesión
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Correo electrónico"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={credentials.email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={credentials.password}
                            onChange={handlePasswordChange}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Page;
