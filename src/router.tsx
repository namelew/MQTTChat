import Auth from 'pages/Auth';
import Chat from 'pages/Chat';
import Default from 'pages/Default';
import NotFound from 'pages/NotFound';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    const [clientID, setClientID] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Default isAuth={isAuth}></Default>}>
                    <Route path='auth' element={<Auth setClientID={setClientID} setIsAuth={setIsAuth}/>}/>
                    <Route path='chat' element={<Chat />}/>
                </Route>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;