import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Login = lazy(() => import("./Login/Login"));
const Signup = lazy(() => import("./Signup/Signup"));
const SetProfile = lazy(() => import("./Signup/SetProfile"));
const Profile = lazy(() => import("./Profile/Profile"));
const Home = lazy(() => import("./Home/Home"))

const UserRoutes = () => {

    const loadingSymbol =  (
        <div className="absolute top-0 left-0 h-full w-full opacity-50 z-20 bg-black flex justify-center items-center">
            <iframe src="https://giphy.com/embed/3o7bu3XilJ5BOiSGic" width="50" height="50" frameBorder="10" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/youtube-loading-gif-3o7bu3XilJ5BOiSGic"></a> plase wait loggin in</p>
        </div>)
    return(
        <Suspense fallback={loadingSymbol}>
            <Routes>
                <Route path='login' element={<Login/>} />
                <Route path='signup' element={<Signup/>} />
                <Route path='setProfile' element={<SetProfile/>} />
                <Route path='home' element={<Home/>} />
                <Route path='profile' element={<Profile/>} />
            </Routes>
        </Suspense>
    )
};

export default UserRoutes;