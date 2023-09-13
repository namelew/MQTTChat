import { useEffect, useState } from 'react';
import styles from './Chat.module.scss';
import { Client } from 'paho-mqtt';
import { IMessage } from 'interfaces/IMessage';
import { IConversation, IConversationType } from 'interfaces/IConversation';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
}

const Chat = ( { }: Props ) => {
    const [client, setClient] = useState<Client>();
    const [messages, setMessages] = useState<IMessage[]>();
    const parameters = useParams();
    const navigate = useNavigate();
    const [conversations, setConversations] = useState<IConversation[]>();


    useEffect(() => {
        if (parameters.id) {
            setClient(new Client('localhost', 1883, parameters.id));
        } else {
            alert('Informe o seu usuário para acessar o chat');
            navigate('/auth');
        }

        if (client) {
            console.log('cliente criado com sucesso');
        }
    }, [parameters]);


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