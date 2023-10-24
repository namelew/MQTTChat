import Auth from 'pages/Auth';
import Chat from 'pages/Chat';
import Register from 'pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

const AppRouter = () => {
    const [socket, setSocket] = useState<WebSocket>();
    const SocketContext = React.createContext({ socket, setSocket });

    return (
        <SocketContext.Provider value={{ socket, setSocket}}>
            <Router>
                <Routes>
                    <Route index element={<Auth context={SocketContext}/>}/>
                    <Route path='auth' element={<Auth context={SocketContext}/>}/>
                    <Route path='register' element={<Register />}/>
                    <Route path='chat' element={<Chat context={SocketContext}/>}/>
                </Routes>
            </Router>
        </SocketContext.Provider>
    );
};

export default AppRouter;