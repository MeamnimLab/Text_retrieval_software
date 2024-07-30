import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import'./App.css'
import UploadSong from './components/UploadSong';
import SongList from './components/SongList';
import CreateGroup from './components/CreateGroup';
import AddWordToGroup from './components/AddWordToGroup';
import CreateExpression from './components/CreateExpression';
import Header from './components/Header';
import GroupList from './components/GroupList';
import WordIndicesReport from './components/WordIndicesReport';


const App: React.FC = () => (
  <BrowserRouter>
    <div>
      <Header />
      <div style={{ paddingTop: '10px' }}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploadSong" element={<UploadSong />} />
          <Route path="/songList" element={<SongList />} />
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/addWords" element={<AddWordToGroup />} />
          <Route path="/CreateExpression" element={<CreateExpression />} />
          <Route path="/groupList" element={<GroupList />} />
          <Route path="/index" element={<WordIndicesReport />} />


        </Routes>
      </div>
    </div>
  </BrowserRouter>

);

export default App;
