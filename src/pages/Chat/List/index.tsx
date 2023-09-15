import React, { useState } from 'react';
import { Box, TextField, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { IConversation } from 'interfaces/IConversation';

interface Props {
  selectConversation: React.Dispatch<React.SetStateAction<IConversation | undefined>>
}

const ConversationsList: React.FC<Props> = ( { selectConversation } : Props ) => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const OpenModal = () => {
    setOpenModal(true);
  };

  const CloseModal = () => {
    setOpenModal(false);
  };

  const CreateConversation = () => {
    console.log("Criando nova conversa")
    CloseModal();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Pesquisar"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={OpenModal}>Nova conversa</Button>
      <Dialog open={openModal} onClose={CloseModal}>
        <DialogTitle>Informe as informações do canal</DialogTitle>
        <DialogContent>
          {/* Add your form for creating a new conversation here */}
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={CloseModal}>Cancel</Button>
          <Button onClick={CreateConversation}>Create</Button>
        </DialogActions>
      </Dialog>
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