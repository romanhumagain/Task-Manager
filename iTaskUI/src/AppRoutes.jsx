import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './components/todos/Todo';
import NotePage from './pages/notes/NotePage';
import AddNote from './pages/notes/AddNote';
import NotesListPage from './pages/notes/NotesListPage';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRouter from './utils/PrivateRouter'
import { useAuth } from './contexts/AuthContext';
import ExpenseTracker from './pages/expenses/ExpenseTracker';
import { BudgetContextProvider } from './contexts/BudgetContext'

const AppRoutes = () => {

  const { user } = useAuth()

  return (
    <Routes>
      {
        user ?
          <Route path="/" element={<PrivateRouter element={<Todo />} />} />
          :
          <Route path="/" element={<Login />} />
      }
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/todo" element={<PrivateRouter element={<Todo />} />} />
      <Route path="/notes/" element={<PrivateRouter element={<NotesListPage />} />} />
      <Route path="/note/:slug" element={<PrivateRouter element={<NotePage />} />} />
      <Route path="/note/new/" element={<PrivateRouter element={<AddNote />} />} />

      <Route path='expense/' element={
        <BudgetContextProvider>
          <ExpenseTracker />
        </BudgetContextProvider>
      } />

    </Routes>
  );
};

export default AppRoutes;
