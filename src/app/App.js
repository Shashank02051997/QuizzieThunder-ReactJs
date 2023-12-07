import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import MainLayout from '../components/main_layout';
import AdminList from '../pages/admin_list';
import UserList from '../pages/user_list';
import AddUser from '../pages/add_user';
import ShowUserDetails from '../pages/show_user_details';
import UpdateUserDetails from '../pages/update_user_details';
import QuizCategoryList from '../pages/quiz_category_list';
import AddQuizCategory from '../pages/add_quiz_category';
import UpdateQuizCategory from '../pages/update_quiz_category';
import ShowQuizCategoryDetails from '../pages/show_quiz_category_details';
import QuizList from '../pages/quiz_list';
import AddQuiz from '../pages/add_quiz';
import ShowQuizDetails from '../pages/show_quiz_details';
import UpdateQuiz from '../pages/update_quiz';
import QuestionList from '../pages/question_list';
import AddQuestion from '../pages/add_question';
import ShowQuestionDetails from '../pages/show_question_details';
import UpdateQuestion from '../pages/update_question';
import QuizResultList from '../pages/quiz_result_list';
import ShowQuizResultDetails from '../pages/show_quiz_result_details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<MainLayout />} >
          <Route index element={<AdminList />} />
          <Route path='users' element={<UserList />} />
          <Route path='add-user' element={<AddUser />} />
          <Route path='show-user-details/:id' element={<ShowUserDetails />} />
          <Route path='update-user-details/:id' element={<UpdateUserDetails />} />
          <Route path='quiz-categories' element={<QuizCategoryList />} />
          <Route path='add-quiz-category' element={<AddQuizCategory />} />
          <Route path='update-quiz-category/:id' element={<UpdateQuizCategory />} />
          <Route path='show-quiz-category-details/:id' element={<ShowQuizCategoryDetails />} />
          <Route path='quizzes' element={<QuizList />} />
          <Route path='add-quiz' element={<AddQuiz />} />
          <Route path='show-quiz-details/:id' element={<ShowQuizDetails />} />
          <Route path='update-quiz/:id' element={<UpdateQuiz />} />
          <Route path='questions/:id' element={<QuestionList />} />
          <Route path='add-question/:id' element={<AddQuestion />} />
          <Route path='show-question-details/:id' element={<ShowQuestionDetails />} />
          <Route path='update-question/:id' element={<UpdateQuestion />} />
          <Route path='quiz-results' element={<QuizResultList />} />
          <Route path='show-quiz-result-details/:id' element={<ShowQuizResultDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
