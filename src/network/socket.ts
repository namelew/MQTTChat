import { IMessageType } from 'interfaces/IMessage';
import { useLocation } from 'react-router-dom';
import { WebSocket } from 'ws';

const socket = new WebSocket('ws://localhost:8000');

socket.on('open', () => {
    const { state } = useLocation();

    if (state.clientID) {
        socket.send(`{
            id: ${Date.now()},
            type: ${IMessageType.Request},
            sender: {
                id: ${state.clientID},
                name: ${state.clientID},
            },
            timestamp: ${new Date()},
            payload: open,
        }`);
    }
});

export default socket;