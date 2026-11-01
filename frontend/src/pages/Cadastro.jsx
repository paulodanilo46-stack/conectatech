import { useState } from "react";
import { apiRequest } from "../services/api.js";
import "../styles/cadastro.css";

function formatarTelefone(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);

  if (numeros.length <= 2) {
    return numeros.length ? `(${numeros}` : "";
  }

  if (numeros.length <= 6) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }

  if (numeros.length <= 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }

  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

function formatarCPF(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);

  return numeros
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function Cadastro({ onLogin }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();

    setErro("");
    setSucesso("");

    if (senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    const telefoneNumeros = telefone.replace(/\D/g, "");
    const cpfNumeros = cpf.replace(/\D/g, "");

    if (
      telefoneNumeros.length > 0 &&
      ![10, 11].includes(telefoneNumeros.length)
    ) {
      setErro(
        "Informe um telefone com DDD e 10 ou 11 números."
      );
      return;
    }

    if (
      cpfNumeros.length > 0 &&
      cpfNumeros.length !== 11
    ) {
      setErro("O CPF deve conter exatamente 11 números.");
      return;
    }
    setCarregando(true);

    try {
      const dados = await apiRequest("/auth/cadastro", {
        method: "POST",
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          telefone: telefone.replace(/\D/g, ""),
          cpf: cpf.replace(/\D/g, ""),
          senha,
        }),
      });

      setSucesso(
        dados.mensagem || "Cadastro realizado com sucesso!"
      );
      
      setTimeout(() => {
        onLogin();
      }, 2500);

      setNome("");
      setEmail("");
      setTelefone("");
      setCpf("");
      setSenha("");
      setConfirmarSenha("");

    } catch (error) {
      setErro(
        error.message || "Não foi possível realizar o cadastro."
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-card">

        <div className="cadastro-header">
          <h1>Criar sua Conta</h1>

          <p>
            Cadastre-se rapidamente no ecossistema ConectaTech
          </p>
        </div>

        <form onSubmit={handleCadastro} className="cadastro-form">

          <div className="cadastro-fields">

            <div className="cadastro-field">
              <label htmlFor="nome">
                Nome completo
              </label>

              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Fulano de Tal"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <div className="cadastro-field">
              <label htmlFor="email">
                E-mail
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="fulano@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="cadastro-field">
              <label htmlFor="telefone">
                Telefone
              </label>

              <input
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="(11) 99999-9999"
                maxLength={15}
                value={telefone}
                onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                autoComplete="tel"
              />
            </div>

            <div className="cadastro-field">
              <label htmlFor="cpf">
                CPF
              </label>

              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="000.000.000-00"
                maxLength={14}
                value={cpf}
                onChange={(e) => setCpf(formatarCPF(e.target.value))}
                autoComplete="off"
              />
            </div>

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
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="password-button"
                  aria-label={
                    mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                  }
                >
                  ◉
                </button>
              </div>
            </div>

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
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setMostrarConfirmacao(!mostrarConfirmacao)
                  }
                  className="password-button"
                  aria-label={
                    mostrarConfirmacao
                      ? "Ocultar confirmação da senha"
                      : "Mostrar confirmação da senha"
                  }
                >
                  ◉
                </button>
              </div>
            </div>

          </div>

          {erro && (
            <p className="cadastro-error" role="alert">
              {erro}
            </p>
          )}

          {sucesso && (
            <div className="cadastro-success" role="status">
              <p>{sucesso}</p>

              <button
                type="button"
                className="voltar-login"
                onClick={onLogin}
              >
                Ir para o Login
              </button>
            </div>
          )}

          <div className="cadastro-actions">

            <button
              type="submit"
              className="cadastrar-button"
              disabled={carregando || Boolean(sucesso)}
            >
              {carregando ? "Cadastrando..." : "Cadastrar"}
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