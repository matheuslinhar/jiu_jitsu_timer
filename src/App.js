import React, { useState } from 'react';
import Intro from './components/Intro';
import Timer from './components/Timer';
import Brackets from './components/Brackets';
import Login from './components/Login';
import './styles.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('intro'); // Iniciando com a página 'intro'

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'intro' && <Intro onNavigate={handleNavigate} />}
      {currentPage === 'timer' && <Timer />}
      {currentPage === 'brackets' && <Brackets />}
      {currentPage === 'login' && <Login />}
    </div>
  );
};

export default App;
