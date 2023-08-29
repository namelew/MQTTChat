import { useEffect, useState } from 'react';
import styles from './Chat.module.scss';
import { Client } from 'paho-mqtt';

interface Props {
    clientID: string
}

const Chat = ( { clientID }: Props ) => {
    const [client, setClient] = useState<Client>();
    const [messages, setMessages] = useState<any[]>();
    const [conversations, setConversations] = useState<any[]>();


    useEffect(() => {
        setClient(new Client('localhost', 1883, clientID));

        if (client) {
            console.log('cliente criado com sucesso');
        }
    }, [clientID]);


    return (
        <div>
            <aside className={styles.control}>
                <header className={styles.moderation}>
                    Cabeçalho de controle
                </header>
                <div className={styles.conversations}>
                    {conversations?.map( (item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </div>
            </aside>
            <div className={styles.chat}>
                {messages?.map( (item, index) => (
                    <span key={index}>{item}</span>
                ))}
            </div>
        </div>
    )
};

export default Chat;