import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRoutes from './components/User/UserRoutes';
import AdminRoutes from './components/Admin/AdminRoutes';
import './App.css'

function App() {

  return (
    <>
    <Router>
        <Routes>
            <Route path='/user/*' element={<UserRoutes/>} />
            <Route path='/admin/*' element={<AdminRoutes/>} />
        </Routes>
    </Router>
    </>
  )
}

// in the signup and login form the design pattern is same 
// so can i make the form and image part seperate component 
// and pass the elemets as props 

export default App
