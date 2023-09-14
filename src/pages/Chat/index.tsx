import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import Conversation from './Conversation';
import ConversationsList from './List';
import { useNavigate, useParams } from 'react-router-dom';

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [clientID, setClientID] = useState('');
  const [currentConversation, setCurrentConversation] = useState<string>();
  const parameters = useParams();

  useEffect(() => {
    if (parameters.id) {
      setClientID(parameters.id);
    } else {
      alert('Informe seu usuário para começar a enviar mensagens');
      navigate('/auth');
    }
  }, [parameters]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <ConversationsList selectConversation={setCurrentConversation}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <Conversation clientID={clientID} current={currentConversation}/>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chat;