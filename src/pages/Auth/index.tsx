import React, { useState } from 'react';
import { Button, TextField, Container, Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [ClientID, setClientID] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log(`Client ID: ${ClientID}`);
        navigate(`/chat/${ClientID}`);
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
        <Paper
            sx={{
            p: 2,
            height:'60%',
            width:'50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Typography component='h2' variant='h4'>Login</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '20%',
                    width: '80%',
                    gap: 2,
                }}
                component="form"
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Client ID"
                    variant="outlined"
                    value={ClientID}
                    required
                    fullWidth
                    onChange={(e) => setClientID(e.target.value)}
                />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </Box>
        </Paper>
        </Container>
    );
};

export default Auth;