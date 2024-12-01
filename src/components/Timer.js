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

  // Array de mensagens informativas sobre Jiu-Jitsu
  const jiuJitsuInfo = [
    'Sempre mantenha a calma e conserve energia no rola.',
    'Respeite o ritmo do aprendizado: dominar uma posição básica vale mais do que tentar algo avançado sem entender o fundamento.',
    'O Jiu-Jitsu é um esporte de técnica, não de força bruta.',
    'Mentalidade de faixa preta: perseverança e paciência são fundamentais.',
    'A confiança no Jiu-Jitsu vem da prática e da experiência.',
    'O Jiu-Jitsu não é só sobre vencer, é sobre evolução pessoal.',
    'Cada treino é uma oportunidade de aprender algo novo.',
    'O Jiu-Jitsu é uma arte que não tem fim, sempre há algo a melhorar.',
    'Respeite seus parceiros de treino e sempre ajude quem está aprendendo.'
  ];

  useEffect(() => {
    let timer;
    let infoInterval;

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

        // Atualizar a informação de Jiu-Jitsu a cada 5 segundos
        infoInterval = setInterval(() => {
          const randomInfo = jiuJitsuInfo[Math.floor(Math.random() * jiuJitsuInfo.length)];
          setInformativeText(randomInfo);
        }, 5000);
      }
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
      clearInterval(infoInterval); // Limpar o intervalo de mensagens de Jiu-Jitsu
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
    setInformativeText(''); // Limpar texto informativo ao começar

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
