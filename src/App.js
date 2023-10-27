import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import MainLayout from './components/main_layout';
import AdminList from './pages/admin_list';
import UserList from './pages/user_list';
import AddUser from './pages/add_user';
import ShowUserDetails from './pages/show_user_details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<MainLayout />} >
          <Route index element={<AdminList />} />
          <Route path='user' element={<UserList />} />
          <Route path='add-user' element={<AddUser />} />
          <Route path='show-user-details' element={<ShowUserDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
