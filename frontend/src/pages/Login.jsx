import { useState } from "react";
import "../styles/login.css";

function Login({onCadastro, onVoltar, onLoginSucesso}) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    onLoginSucesso();
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Marca */}
        <div className="login-brand">
          <div className="logo-badge-login">
            C
          </div>

          <h1>
            <span>Conecta</span>
            <span className="logo-green">Tech</span>
          </h1>

          <p>Entre na sua conta para continuar</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="login-form">

          <div className="inputs-group">

            {/* E-mail / CPF */}
            <div className="input-wrapper">
              <label htmlFor="email">
                E-mail ou CPF
              </label>

              <input
                type="text"
                id="email"
                name="email"
                placeholder="nome@exemplo.com"
              />
            </div>

            {/* Senha */}
            <div className="input-wrapper">
              <label htmlFor="senha">
                Senha
              </label>

              <div className="password-container">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="senha"
                  name="senha"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  aria-label={
                    mostrarSenha
                      ? "Ocultar senha"
                      : "Mostrar senha"
                  }
                >
                  {mostrarSenha ? "◉" : "◉"}
                </button>
              </div>
            </div>

          </div>

          {/* Entrar */}
          <button type="submit" className="entrar-button">
            Entrar
          </button>

        </form>

        {/* Links */}
        <div className="auxiliary-links">

          <button type="button" className="forgot-password">
            Esqueci minha senha
          </button>

          <p>
            Não tem uma conta?{" "}
            <button 
            type="button" 
            className="create-account"
            onClick={onCadastro}
            >
              Criar Conta
            </button>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;