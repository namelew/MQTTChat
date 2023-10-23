import React, { useState } from 'react';
import { Button, TextField, Container, Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IUser } from 'interfaces/IUser';
import { api } from 'network/rest';

const Register = () => {
    const [ClientID, setClientID] = useState('');
    const [Name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData:IUser = {
            id: ClientID,
            name: Name,
        };

        try {
            const response = await api.post('users/create', formData);

            if (response.status !== 200) {
                alert('Unable to register user in the database');
                console.log(response.statusText);
            } else {
                navigate(`/auth`);
            }
        } catch (error) {
            alert('Unable to send create user request to server');
            console.log(error);
        }
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
            <Typography component='h2' variant='h4'>Register</Typography>
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
                <TextField
                    label="Username"
                    variant="outlined"
                    value={Name}
                    required
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </Box>
        </Paper>
        </Container>
    );
};

export default Register;
