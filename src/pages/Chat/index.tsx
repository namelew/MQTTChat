import { useEffect, useState } from 'react';
import styles from './Chat.module.scss';
import { Client } from 'paho-mqtt';
import { IMessage } from 'interfaces/IMessage';
import { IConversation, IConversationType } from 'interfaces/IConversation';

interface Props {
    clientID: string
}

const Chat = ( { clientID }: Props ) => {
    const [client, setClient] = useState<Client>();
    const [messages, setMessages] = useState<IMessage[]>();
    const [conversations, setConversations] = useState<IConversation[]>();


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
                        <span key={index} onClick={ () => setMessages(item.messages)}>{item.type === IConversationType.OneToOne ? item.participants[1].name : item.name}</span>
                    ))}
                </div>
            </aside>
            <div className={styles.chat}>
                {messages?.map( (item, index) => (
                    <span key={index}>{item.timestamp.toUTCString()} {item.payload}</span>
                ))}
            </div>
        </div>
    )
};

export default Chat;