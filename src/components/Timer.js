import React, { useState, useEffect, useRef } from 'react';
import '../styles/Timer.css';

const Timer = () => {
  const [time, setTime] = useState(0); // Tempo em segundos
  const [initialTime, setInitialTime] = useState(0); // Tempo inicial escolhido
  const [isRunning, setIsRunning] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(5); // Contagem regressiva de 5 segundos
  const [isPaused, setIsPaused] = useState(false); // Controle de pausa
  const [isStarting, setIsStarting] = useState(false); // Animação de início
  const [informativeText, setInformativeText] = useState(''); // Texto informativo baseado no tempo
  const [showTransition, setShowTransition] = useState(false); // Controle da exibição da transição

  // Referências para os sons
  const countdownSound = useRef(new Audio('/sounds/countdown.mp3')); // Adicione o caminho correto
  const endSound = useRef(new Audio('/sounds/end-time.mp3')); // Adicione o caminho correto

  useEffect(() => {
    let timer;

    if (isCountingDown) {
      countdownSound.current.play();
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCountingDown(false);
            setIsRunning(true);
            setTime(initialTime);
            countdownSound.current.pause();
            countdownSound.current.currentTime = 0;
            setIsStarting(true); // Ativa animação de início
            setShowTransition(true); // Mostra a frase de transição
            setTimeout(() => {
              setIsStarting(false);
              setShowTransition(false); // Oculta a frase de transição
            }, 4000); // Exibe as frases por 4 segundos
            return 0;
          }
          countdownSound.current.play();
          return prev - 1;
        });
      }, 1000);
    } else if (isRunning) {
      if (!isPaused) {
        timer = setInterval(() => {
          setTime((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setIsRunning(false);
              endSound.current.play().catch((error) => {
                console.error("Erro ao reproduzir o som de fim do tempo: ", error);
              });
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
      countdownSound.current.pause();
      countdownSound.current.currentTime = 0;
      endSound.current.pause();
      endSound.current.currentTime = 0;
    };
  }, [isRunning, isCountingDown, time, initialTime, isPaused]);

  const handleStart = (minutes) => {
    setInitialTime(minutes * 60); // Converter minutos para segundos
    setCountdown(5); // Iniciar contagem regressiva
    setIsCountingDown(true);
    setIsPaused(false); // Garantir que o timer não esteja pausado

    // Definir o texto informativo com base no tempo selecionado
    switch (minutes) {
      case 2:
      case 3:
      case 4:
        setInformativeText('Tempo Infantil');
        break;
      case 5:
        setInformativeText(' Branca e Azul (Adulto) ou Todas as Faixas (Master e Juvenil)');
        break;
      case 6:
        setInformativeText(' Faixa Azul (Adulto)');
        break;
      case 7:
        setInformativeText(' Faixa Roxa (Adulto)');
        break;
      case 8:
        setInformativeText(' Faixa Marrom (Adulto)');
        break;
      case 10:
        setInformativeText(' Faixa Preta (Adulto)');
        break;
      default:
        setInformativeText('');
        break;
    }
  };

  const handlePause = () => {
    setIsPaused((prev) => !prev); // Alternar estado de pausa
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCountingDown(false);
    setIsPaused(false);
    setCountdown(5);
    setTime(0);
    setInformativeText(''); // Limpar o texto informativo
    setShowTransition(false); // Ocultar qualquer texto de transição
    countdownSound.current.pause();
    countdownSound.current.currentTime = 0;
    endSound.current.pause();
    endSound.current.currentTime = 0;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className={`timer ${isStarting ? 'timer-start' : ''}`}>
      {showTransition && !isRunning && (
        <div className="transition-text">
          Lutadores ao meio
        </div>
      )}
      {showTransition && !isRunning && (
        <div className="transition-text transition-second">
          Comprometimento
        </div>
      )}
      {isCountingDown ? (
        <div className="timer-display countdown">{countdown}</div>
      ) : (
        <div className={`timer-display ${time <= 10 && !isCountingDown ? 'warning' : ''}`}>
          {formatTime(time)}
        </div>
      )}
      {!isRunning && !isCountingDown && (
        <div className="timer-controls timer-option">
          <button onClick={() => handleStart(2)}>2 min</button>
          <button onClick={() => handleStart(3)}>3 min</button>
          <button onClick={() => handleStart(4)}>4 min</button>
          <button onClick={() => handleStart(5)}>5 min</button>
          <button onClick={() => handleStart(6)}>6 min</button>
          <button onClick={() => handleStart(7)}>7 min</button>
          <button onClick={() => handleStart(8)}>8 min</button>
          <button onClick={() => handleStart(10)}>10 min</button>
        </div>
      )}
      {informativeText && (
        <div className="informative-text">
          <p>{informativeText}</p>
        </div>
      )}
      {isRunning && !isCountingDown && (
        <div className="timer-controls">
          <button onClick={handlePause}>{isPaused ? 'Resume' : 'Pause'}</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default Timer;
