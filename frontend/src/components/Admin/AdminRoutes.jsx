import {Routes, Route} from "react-router-dom";
import Home from "./Home/AdminHome";
import Login from "./Login/Login";
import NotFound from "../Error/NotFound"

const AdminRoutes = () => {
    return(
        <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default AdminRoutes;