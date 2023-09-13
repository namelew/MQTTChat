import Auth from 'pages/Auth';
import Chat from 'pages/Chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='auth' element={<Auth />}/>
                <Route path='chat' element={<Chat />}/>
                <Route path='chat/:id' element={<Chat />}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;