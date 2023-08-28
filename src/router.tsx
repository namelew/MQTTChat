import Auth from 'pages/Auth';
import Chat from 'pages/Chat';
import Default from 'pages/Default';
import NotFound from 'pages/NotFound';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    const [clientID, setClientID] = useState('');

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Default></Default>}>
                    <Route path='auth' element={<Auth setClientID={setClientID}/>}/>
                    <Route path='chat' element={<Chat />}/>
                </Route>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;