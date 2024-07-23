import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import'./App.css'
import UploadSong from './components/UploadSong';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/uploadSong" element={<UploadSong/>} />
    </Routes>
  </BrowserRouter>
);

export default App;
