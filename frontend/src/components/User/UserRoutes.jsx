import Login from './Login/Login'
import Signup from './Signup/Signup'
import SetProfile from './Signup/SetProfile';
import Home from './Home/Home';
import { Route, Routes } from 'react-router-dom';

const UserRoutes = () => {
    return(
        <Routes>
            <Route path='login' element={<Login/>} />
            <Route path='signup' element={<Signup/>} />
            <Route path='setProfile' element={<SetProfile/>} />
            <Route path='home' element={<Home/>} />
        </Routes>
    )
};

export default UserRoutes;