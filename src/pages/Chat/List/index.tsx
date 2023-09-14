import React, { useState } from 'react';
import { Box, TextField, List, ListItem, ListItemText } from '@mui/material';

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
}

interface Props {
  selectConversation: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ConversationsList: React.FC<Props> = ( { selectConversation } : Props ) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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
        placeholder="Search"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List
        sx={{
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        {filteredConversations.map((conversation) => (
          <ListItem button key={conversation.id}>
            <ListItemText primary={conversation.name} secondary={conversation.lastMessage} onClick={() => selectConversation(conversation.name)}/>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConversationsList;
