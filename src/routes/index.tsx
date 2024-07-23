import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../components/Home';

const AppRoutes: React.FC = () => (
    
<    BrowserRouter>
      <Route  path="/" element={<Home/>} />
    </BrowserRouter>
);

export default AppRoutes;

