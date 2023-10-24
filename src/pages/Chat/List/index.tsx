import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, TextField, List, ListItem, ListItemText, AppBar, Toolbar, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IConversation } from 'interfaces/IConversation';
import CreateModal from './CreateModal';
import { IMessageType } from 'interfaces/IMessage';

interface Props {
  socket?: WebSocket,
  selectConversation: React.Dispatch<React.SetStateAction<IConversation | undefined>>
}

const ConversationsList: React.FC<Props> = ( { selectConversation, socket } : Props ) => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { state } = useLocation();

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClose = () => {
    socket?.send(JSON.stringify({
      id: Date.now(),
      type: IMessageType.Logout,
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
    navigate('/auth');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Stack spacing={1}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <TextField
          variant="outlined"
          placeholder="Pesquisar"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Stack>
      <CreateModal open={openModal} setOpen={setOpenModal}/>
      <List
        sx={{
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        {filteredConversations.map((conversation) => (
          <ListItem button key={conversation.id}>
            <ListItemText primary={conversation.name} secondary={conversation.messages?.at(-1)?.payload} onClick={() => selectConversation(conversation)}/>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConversationsList;