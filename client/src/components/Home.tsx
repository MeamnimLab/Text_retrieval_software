import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => (
  <div className="home">
    <h1 className="title">Welcome to the Music App</h1>
    <p className="subtitle" style={{fontFamily: 'Pacifico, cursive'}}>Enjoy your music experience with us!</p>
    <div className="animations">
      <div className="note-animation">♪</div>
      <div className="note-animation">♫</div>
      <div className="note-animation">♬</div>
      <div className="note-animation">♪</div>
      <div className="note-animation">♫</div>
  
    </div>
  </div>
);

export default Home;
