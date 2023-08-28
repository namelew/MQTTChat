import Auth from 'pages/Auth';
import Default from 'pages/Default';
import NotFound from 'pages/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/auth' element={<Auth />}/>
                <Route path='/' element={<Default />}>
                </Route>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;