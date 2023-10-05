import React, { useState } from 'react';
import { Box, TextField, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, FormLabel, Input, Select, SelectChangeEvent } from '@mui/material';
import { IConversation, IConversationType } from 'interfaces/IConversation';

interface Props {
  selectConversation: React.Dispatch<React.SetStateAction<IConversation | undefined>>
}

const ConversationsList: React.FC<Props> = ( { selectConversation } : Props ) => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newConversation, setNewConversation] = useState<IConversation>(
    {
      id: '',
      name: '',
      type: IConversationType.OneToOne,
    }
  );
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

  const handleIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewConversation({
        ...newConversation,
        id: e.target.value,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewConversation({
        ...newConversation,
        name: e.target.value,
    });
  };

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setNewConversation({
        ...newConversation,
        type: Number(e.target.value) as IConversationType,
    });
  };

  const CreateConversation = () => {
    console.log("Criando nova conversa", newConversation);
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
          <Box component='form'>
              <FormControl id="id">
                  <FormLabel>Destino</FormLabel>
                  <Input name="id" value={newConversation.id} onChange={handleIDChange} />
              </FormControl>

              <FormControl id="name">
                  <FormLabel>Nome</FormLabel>
                  <Input name="name" value={newConversation.name} onChange={handleNameChange} />
              </FormControl>

              <FormControl id="type">
                  <FormLabel>Tipo</FormLabel>
                  <Select name="type" value={newConversation.type.toString()} onChange={handleTypeChange}>
                      <option value={IConversationType.Group.toString()}>Grupo</option>
                      <option value={IConversationType.OneToOne.toString()}>Conversa</option>
                  </Select>
              </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={CloseModal}>Cancel</Button>
          <Button type='submit' onClick={CreateConversation}>Create</Button>
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