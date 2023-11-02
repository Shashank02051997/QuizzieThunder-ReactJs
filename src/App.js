import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import MainLayout from './components/main_layout';
import AdminList from './pages/admin_list';
import UserList from './pages/user_list';
import AddUser from './pages/add_user';
import ShowUserDetails from './pages/show_user_details';
import UpdateUserDetails from './pages/update_user_details';
import QuizCategoryList from './pages/quiz_category_list';
import AddQuizCategory from './pages/add_quiz_category';
import UpdateQuizCategory from './pages/update_quiz_category';
import ShowQuizCategoryDetails from './pages/show_quiz_category_details';
import QuizList from './pages/quiz_list';
import AddQuiz from './pages/add_quiz';
import ShowQuizDetails from './pages/show_quiz_details';

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
          <Route path='update-user-details' element={<UpdateUserDetails />} />
          <Route path='quiz-category' element={<QuizCategoryList />} />
          <Route path='add-quiz-category' element={<AddQuizCategory />} />
          <Route path='update-quiz-category' element={<UpdateQuizCategory />} />
          <Route path='show-quiz-category-details' element={<ShowQuizCategoryDetails />} />
          <Route path='quiz' element={<QuizList />} />
          <Route path='add-quiz' element={<AddQuiz />} />
          <Route path='show-quiz-details' element={<ShowQuizDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
