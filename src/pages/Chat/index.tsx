import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import Conversation from './Conversation';
import ConversationsList from './List';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IConversation } from 'interfaces/IConversation';
import { ISession } from 'interfaces/ISession';

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<ISession>();
  const [currentConversation, setCurrentConversation] = useState<IConversation>();
  const { state } = useLocation();

  useEffect(() => {
    if (state.user) {
      setSession(state);
    } else {
      alert('Informe seu usuário para começar a enviar mensagens');
      navigate('/auth');
    }
  }, [state, navigate]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <ConversationsList selectConversation={setCurrentConversation}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <Conversation clientID={session ? session.user.id : ''} current={currentConversation}/>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chat;