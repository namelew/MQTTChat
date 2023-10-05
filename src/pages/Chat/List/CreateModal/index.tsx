import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, FormLabel, Input, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { IConversation, IConversationType } from 'interfaces/IConversation';

interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const CreateModal = ({ open, setOpen } : Props) => {
    const [newConversation, setNewConversation] = useState<IConversation>(
        {
          id: '',
          name: '',
          type: IConversationType.OneToOne,
        }
    );

    const [type, setType] = useState(IConversationType.OneToOne.toString());

    const OpenModal = () => {
        setOpen(true);
    };
    
    const CloseModal = () => {
        setOpen(false);
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
        setType(e.target.value);
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
        <>
            <Button onClick={OpenModal}>Nova conversa</Button>
            <Dialog open={open} onClose={CloseModal}>
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
                            <Select name="type" value={type} onChange={handleTypeChange}>
                                <MenuItem value={IConversationType.Group.toString()}>Grupo</MenuItem>
                                <MenuItem value={IConversationType.OneToOne.toString()}>Conversa</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={CloseModal}>Cancel</Button>
                    <Button type='submit' onClick={CreateConversation}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CreateModal;