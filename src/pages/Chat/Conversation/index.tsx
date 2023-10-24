import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { IMessage, IMessageType } from 'interfaces/IMessage';
import { IConversation} from 'interfaces/IConversation';

interface Props {
  clientID: string
  current?: IConversation
  socket?:WebSocket
}

const Conversation: React.FC<Props> = ({ clientID, current, socket } : Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (current && current.messages) {
      setMessages(current.messages);
    }
  },[current]);

  const handleSend = () => {
    const time = new Date();
    if (current) {
      setMessages([...messages, { 
          id: Date.now(), 
          type: IMessageType.Conversation,
          sender: 
            {
              id: clientID,
              name: clientID
            },
              chat: current,
              payload: newMessage, 
              timestamp: time.toString(), 
          }]);
        setNewMessage('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid gray',
        }}
      >
        <Typography variant="h6">{current ? current.name : 'Vazio'}</Typography>
      </Box>
      <List
        sx={{
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        {messages.map((message) => (
          <ListItem key={message.id}>
            <Paper
              sx={{
                p: 1,
                maxWidth: '70%',
                bgcolor: 'primary.main',
                color: 'white',
              }}
            >
              <ListItemText primary={message.payload} secondary={`${message.sender.name}, ${message.timestamp}`} />
            </Paper>
          </ListItem>
        ))}
      </List>
      <Box
        component="form"
        sx={{
          display: 'flex',
          padding: '10px',
          borderTop: '1px solid gray',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Type a message"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" disabled={!newMessage || !current}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Conversation;