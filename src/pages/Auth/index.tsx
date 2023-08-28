import Button from '@mui/material/Button';
import styles from './Auth.module.scss';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface Props {
    setClientID: React.Dispatch<React.SetStateAction<string>>;
}

const Auth = ( { setClientID } : Props) => {
    const navigate = useNavigate();

    return (
        <Container>
            <form className={styles.newSession} onSubmit={() => { navigate('/chat') }}>
                <h2>Informa as informações necessárias para autenticação</h2>
                <TextField
                    required
                    id="clientID"
                    label="Insira o ID do Usuário"
                    variant="outlined"
                    onChange={event => setClientID(event.target.value)}
                />
                <Button type='submit' variant="contained">Iniciar</Button>
            </form>
        </Container>
    )
};

export default Auth;