import { useState } from "react";
import { apiRequest } from "../services/api.js";
import "../styles/login.css";

function Login({ onCadastro, onVoltar, onLoginSucesso }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    try {

      const dados = await apiRequest("/auth/login", {
        method: "POST",
        body: {
          email: email.trim(),
          senha,
        },
      });

      if (!dados.token || !dados.usuario) {
        throw new Error("A resposta do servidor está incompleta.");
      }

      onLoginSucesso(dados.usuario, dados.token);
    } catch (error) {
      setErro(error.message || "Não foi possível realizar o login.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

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

        <form onSubmit={handleLogin} className="login-form">

          <div className="inputs-group">

            <div className="input-wrapper">
              <label htmlFor="email">
                E-mail
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="senha">
                Senha
              </label>

              <div className="password-container">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="senha"
                  name="senha"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  autoComplete="current-password"
                  required
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
                  ◉
                </button>
              </div>
            </div>

          </div>

          {erro && (
            <p className="login-error" role="alert">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="entrar-button"
            disabled={carregando}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>

        </form>

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

          {onVoltar && (
            <button
              type="button"
              className="create-account"
              onClick={onVoltar}
            >
              Voltar ao início
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default Login;