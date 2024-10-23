import React, { useState, useEffect } from 'react';
import '../styles/Intro.css';

const Intro = ({ onNavigate }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Animação de carregamento dura 3 segundos

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
          <h1>App de Jiu-Jitsu</h1>
          <button onClick={() => onNavigate('timer')}>Entrar no Timer</button>
          <button onClick={() => onNavigate('brackets')}>Montar Chaves de Luta</button>
          <button onClick={() => onNavigate('login')}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Intro;
