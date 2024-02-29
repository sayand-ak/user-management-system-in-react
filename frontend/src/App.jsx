import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRoutes from './components/User/UserRoutes';
import AdminRoutes from './components/Admin/AdminRoutes';
import { useSelector } from 'react-redux';
import ErrorComponent from './components/Error/ErrorPage';

function App() {

  const {user, status, error} = useSelector((state) => state.api);

  console.log(user, status, error);

  return (
    <>
    { status != "failed" &&
    <Router>
        <Routes>
            <Route path='/user/*' element={<UserRoutes/>} />
            <Route path='/admin/*' element={<AdminRoutes/>} />
        </Routes>
    </Router>
  }
  {
    status=="failed" &&
    <ErrorComponent/>
  }
    </>
  )
}

export default App
