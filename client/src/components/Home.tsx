import React from 'react';
import UploadSong from './UploadSong';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to the Music App</h1>
    <Link to={'/uploadSong'}>
    <div>upload song</div>
    </Link>
  </div>
);

export default Home;
