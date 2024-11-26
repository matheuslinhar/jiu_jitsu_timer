// src/components/Intro.js

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material'; // Importa o componente Button do MUI
import '../styles/Intro.css';

const Intro = ({ onNavigate }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Finaliza o carregamento após 3 segundos
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="intro-container">
      {loading ? (
        <div className="loading-screen">
          <div className="logo-container">
            <img src="/images/logo.png" alt="Academia Logo" className="logo" />
            <div className="loading-bar-container">
              <div className="loading-bar"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="menu-container">
          <h1>Bem-vindo</h1>
          <div className="menu-buttons">
            {/* Botões usando MUI Button */}
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => onNavigate('timer')}
              className="menu-button"
            >
               Timer
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => onNavigate('brackets')}
              className="menu-button"
            >
              Montar Chaves
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => onNavigate('login')}
              className="menu-button"
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Intro;
