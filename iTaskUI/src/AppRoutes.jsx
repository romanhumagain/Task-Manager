import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './components/todos/Todo';
import NotePage from './pages/notes/NotePage';
import AddNote from './pages/notes/AddNote';
import NotesListPage from './pages/notes/NotesListPage';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRouter from './utils/PrivateRouter'

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<PrivateRouter element={<Todo />}/> } />
        <Route path="/notes/" element={<NotesListPage />} />
        <Route path="/note/:slug" element={<NotePage />} />
        <Route path="/note/new/" element={<AddNote />} />
      </Routes>
  );
};

export default AppRoutes;
