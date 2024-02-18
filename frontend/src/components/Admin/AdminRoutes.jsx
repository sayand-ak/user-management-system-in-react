import {Routes, Route} from "react-router-dom";
import Home from "./Home/AdminHome";
import Login from "./Login/Login";

const AdminRoutes = () => {
    return(
        <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path="home" element={<Home/>}/>
        </Routes>
    )
}

export default AdminRoutes;