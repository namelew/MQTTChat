import React, { useContext, useState } from 'react';
import { Button, TextField, Container, Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from 'network/rest';
import { IUser } from 'interfaces/IUser';
import { SocketAdrr } from 'network/socket';
import { IMessageType } from 'interfaces/IMessage';

interface Props {
    context: React.Context<{ socket: WebSocket | undefined; setSocket: React.Dispatch<React.SetStateAction<WebSocket | undefined>>;}>,
}

const Auth = ( { context } : Props ) => {
    const [ClientID, setClientID] = useState('');
    const { setSocket } = useContext(context);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await api.get<IUser>(`users/${ClientID}`)

            if (response.status !== 200) {
                alert('Unable to validate user credentials');
                console.log(response.status, response.statusText);
            } else {
                const socket = new WebSocket(SocketAdrr);

                socket.onopen = () => {
                    socket.send(JSON.stringify({
                        id: Date.now(),
                        type: IMessageType.Login,
                        sender: response.data,
                        chat: {
                            id: "",
                            name: "",
                            type: 0,
                            participants: null,
                            messages: null,
                        },
                        timestamp: new Date().toISOString(),
                        payload:""
                    }));
                };

                socket.onmessage = (msg) => {
                    console.log(msg);
                }

                setSocket(socket);
                navigate(`/chat`, { state: { user: response.data } });
            }
        } catch (error) {
            alert('Failed on validation request to server');
            console.log(error);
        }
    };

    const handleRegister = () => {
        navigate('/register');
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
                <Button variant="contained" color="secondary" onClick={handleRegister}>
                    Register
                </Button>
            </Box>
        </Paper>
        </Container>
    );
};

export default Auth;