import React, { useState, useEffect, useContext } from 'react';
import { Grid, Paper } from '@mui/material';
import Conversation from './Conversation';
import ConversationsList from './List';
import { useLocation, useNavigate} from 'react-router-dom';
import { IConversation } from 'interfaces/IConversation';
import { ISession } from 'interfaces/ISession';
import { IMessageType } from 'interfaces/IMessage';

interface Props {
  context: React.Context<{ socket: WebSocket | undefined; setSocket: React.Dispatch<React.SetStateAction<WebSocket | undefined>>;}>,
}

const Chat: React.FC<Props> = ( { context } : Props) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<ISession>();
  const { socket } = useContext(context);
  const [currentConversation, setCurrentConversation] = useState<IConversation>();
  const [heartbeatInterval] = useState(1000); // 1 second
  const { state } = useLocation();

  const heartbeat = () => {
    socket?.send(JSON.stringify({
        id: Date.now(),
        type: IMessageType.Heartbeat,
        sender: state.user,
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

  useEffect(() => {
    if (state.user) {
      setSession(state);
    } else {
      alert('Informe seu usuário para começar a enviar mensagens');
      navigate('/auth');
    }

    const interval = setInterval(heartbeat, heartbeatInterval);

    return () => clearInterval(interval);
  }, [state, navigate]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <ConversationsList selectConversation={setCurrentConversation} socket={socket}/>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <Conversation clientID={session ? session.user.id : ''} current={currentConversation} socket={socket}/>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chat;