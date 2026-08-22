import { useState } from "react";
import "../styles/cadastro.css";

function Cadastro({onLogin}) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const handleCadastro = (e) => {
    e.preventDefault();

    console.log("Cadastro enviado");
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-card">

        {/* Cabeçalho */}
        <div className="cadastro-header">
          <h1>Criar sua Conta</h1>

          <p>
            Cadastre-se rapidamente no ecossistema ConectaTech
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleCadastro} className="cadastro-form">

          <div className="cadastro-fields">

            {/* Nome */}
            <div className="cadastro-field">
              <label htmlFor="nome">
                Nome completo
              </label>

              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Fulano de Tal"
              />
            </div>

            {/* E-mail */}
            <div className="cadastro-field">
              <label htmlFor="email">
                E-mail
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="fulano@exemplo.com"
              />
            </div>

            {/* Telefone */}
            <div className="cadastro-field">
              <label htmlFor="telefone">
                Telefone
              </label>

              <input
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="(11) 99999-9999"
              />
            </div>

            {/* CPF */}
            <div className="cadastro-field">
              <label htmlFor="cpf">
                CPF
              </label>

              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="000.000.000-00"
                maxLength="14"
              />
            </div>

            {/* Senha */}
            <div className="cadastro-field">
              <label htmlFor="senha">
                Senha
              </label>

              <div className="cadastro-password">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="senha"
                  name="senha"
                  placeholder="Mínimo 8 caracteres"
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="password-button"
                >
                  ◉
                </button>
              </div>
            </div>

            {/* Confirmar senha */}
            <div className="cadastro-field">
              <label htmlFor="confirmarSenha">
                Confirmar Senha
              </label>

              <div className="cadastro-password">
                <input
                  type={mostrarConfirmacao ? "text" : "password"}
                  id="confirmarSenha"
                  name="confirmarSenha"
                  placeholder="Repita a senha"
                />

                <button
                  type="button"
                  onClick={() =>
                    setMostrarConfirmacao(!mostrarConfirmacao)
                  }
                  className="password-button"
                >
                  ◉
                </button>
              </div>
            </div>

          </div>

          {/* Ações */}
          <div className="cadastro-actions">

            <button
              type="submit"
              className="cadastrar-button"
            >
              Cadastrar
            </button>

            <p>
              Já tem registro?{" "}
              <button
                type="button"
                className="voltar-login"
                onClick={onLogin}
              >
                Voltar para o Login
              </button>
            </p>

          </div>

        </form>

      </div>
    </div>
  );
}

export default Cadastro;