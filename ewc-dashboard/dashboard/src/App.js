// ewc-dashboard/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Queue from './components/Queue';
import Rigs from './components/Rigs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/rigs" element={<Rigs />} />
      </Routes>
    </Router>
  );
};

export default App;
