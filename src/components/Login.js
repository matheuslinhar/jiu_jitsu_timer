import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [showMessage, setShowMessage] = useState(false);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      window.location.href = "/recuperar-senha"; // Redireciona para a página de recuperação
    }, 5000); // Mostra a mensagem por 2 segundos
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form">
        <div className="input-group">
          <label htmlFor="username">Email ou Nome do usuario</label>
          <input type="text" id="username" placeholder="Digite seu login" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="Digite sua senha" />
        </div>
        <div className="button-group">
          <button type="submit" className="login-btn">
            Entrar
          </button>
          <button type="button" className="register-btn">
            Cadastre-se
          </button>
        </div>
        <a href="#" className="forgot-password" onClick={handleForgotPassword}>
          Esqueceu a senha?
        </a>
      </form>
      {showMessage && <p className="faixa-branca-msg">Mas só podia ser faixa branca mesmo...</p>}
    </div>
  );
}

export default Login;
