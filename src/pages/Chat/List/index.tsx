import React, { useState } from 'react';
import { Box, TextField, List, ListItem, ListItemText } from '@mui/material';
import { IConversation } from 'interfaces/IConversation';
import CreateModal from './CreateModal';

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