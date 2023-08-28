import { useEffect, useState } from 'react';
import styles from './Chat.module.scss';
import { Client } from 'paho-mqtt';

interface Props {
    clientID: string
}

const Chat = ( { clientID }: Props ) => {
    const [client, setClient] = useState<Client>();


    useEffect(() => {
        setClient(new Client('localhost', 1883, clientID));

        if (client) {
            console.log('cliente criado com sucesso');
        }
    }, [clientID]);


    return (
        <div>
            Chat
        </div>
    )
};

export default Chat;