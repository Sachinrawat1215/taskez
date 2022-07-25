import { useEffect } from 'react';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

const App = () => {
    useEffect(() => {

    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/' element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;