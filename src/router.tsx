import Auth from 'pages/Auth';
import Chat from 'pages/Chat';
import Register from 'pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route index element={<Auth />}/>
                <Route path='auth' element={<Auth />}/>
                <Route path='register' element={<Register />}/>
                <Route path='chat' element={<Chat />}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;