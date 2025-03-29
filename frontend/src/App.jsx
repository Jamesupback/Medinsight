import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Api from '../pages/Api';
import Chat from '../pages/Chat';
import Login from '../pages/login';
import Register from '../pages/Register';
import Upload from '../pages/Upload';
import Extract from '../pages/extract';

const App = () => (
  <Router>
    <Routes>
      <Route path="/api" element={<Api />} />
      <Route path="/" element={<Home />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/upload' element={<Upload/>} />
      <Route path='/extract' element={<Extract/>} />
    </Routes>
  </Router>
);

export default App;

