// src/App.js

import React, { useState } from 'react';
import Intro from './components/Intro';
import Timer from './components/Timer';
import Brackets from './components/Brackets';

import './styles.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('intro');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'intro' && <Intro onNavigate={handleNavigate} />}
      {currentPage === 'timer' && <Timer />}
      {currentPage === 'brackets' && <Brackets />}
      {/* Outras páginas podem ser adicionadas aqui */}
    </div>
  );
};

export default App;
