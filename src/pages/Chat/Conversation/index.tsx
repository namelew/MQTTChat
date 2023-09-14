import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

interface Message {
  id: number;
  name: string;
  text: string;
  time: string;
}

interface Props {
  clientID: string
  current?: string
}

const Conversation: React.FC<Props> = ({ clientID, current } : Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    const time = new Date().toLocaleTimeString();
    setMessages([...messages, { id: Date.now(), name: clientID, text: newMessage, time }]);
    setNewMessage('');
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
        <Typography variant="h6">{current ? current : 'Vazio'}</Typography>
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
              <ListItemText primary={message.text} secondary={`${message.name}, ${message.time}`} />
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