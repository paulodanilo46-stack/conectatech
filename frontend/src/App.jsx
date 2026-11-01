import { useState, useEffect, useCallback } from "react";
import { apiRequest } from "./services/api.js";

import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import TelaInicial from "./pages/TelaInicial.jsx";
import Perfil from "./pages/Perfil.jsx";
import Carrinho from "./pages/Carrinho.jsx";
import Produtos from "./pages/Produtos.jsx";
import FinalizarCompra from "./pages/FinalizarCompra.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import Admin from "./pages/Admin.jsx";
import Sobre from "./pages/Sobre.jsx";
import Suporte from "./pages/Suporte.jsx";

import "./App.css";

function App() {
  const [screen, setScreen] = useState("inicio");
  const [estaLogado, setEstaLogado] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
  const [categoriaInicial, setCategoriaInicial] = useState("");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [screen]);
  const atualizarQuantidadeCarrinho = useCallback(async (tokenAtual = token) => {
    if (!tokenAtual) {
      setQuantidadeCarrinho(0);
      return;
    }

    try {
      const resposta = await apiRequest("/carrinho", {
        token: tokenAtual,
      });

      setQuantidadeCarrinho(
        Number(resposta.carrinho?.quantidade_itens || 0)
      );
    } catch (erro) {
      console.error("Erro ao atualizar a quantidade do carrinho:", erro);
    }
  }, [token]);
  useEffect(() => {
    atualizarQuantidadeCarrinho();
  }, [atualizarQuantidadeCarrinho]);

  const handleLoginSucesso = (dadosUsuario, tokenRecebido) => {
    setUsuario(dadosUsuario);
    setToken(tokenRecebido);
    setEstaLogado(true);

    localStorage.setItem("conectaTechToken", tokenRecebido);
    localStorage.setItem(
      "conectaTechUsuario",
      JSON.stringify(dadosUsuario)
    );

    setMostrarPopup(true);

    if (dadosUsuario.tipo === "administrador") {
      setScreen("admin");
    } else {
      setScreen("inicio");
    }

    setTimeout(() => {
      setMostrarPopup(false);
    }, 3000);
  };

  const handleLogout = () => {
    setEstaLogado(false);
    setUsuario(null);
    setToken(null);
    setQuantidadeCarrinho(0);

    localStorage.removeItem("conectaTechToken");
    localStorage.removeItem("conectaTechUsuario");

    setScreen("inicio");
  };

  const handleCarrinho = () => {
    if (estaLogado) {
      setScreen("carrinho");
    } else {
      setScreen("login");
    }
  };
  const handleFinalizarCompra = () => {
    setScreen("finalizarCompra");
  };
  const handlePerfil = () => {
    setScreen("perfil");
  };

  const handlePedidos = () => {
    if (estaLogado) {
      setScreen("pedidos");
    } else {
      setScreen("login");
    }
  };
  const handleSobre = () => {
    setScreen("sobre");
  };

  const handleSuporte = () => {
    setScreen("suporte");
  };
  const handleCategoria = (nomeCategoria) => {
    console.log("Categoria recebida no App:", nomeCategoria);

    setCategoriaInicial(nomeCategoria);
    setScreen("produtos");
  };
  const handleAdmin = () => {
    setScreen("admin");
  };

  if (screen === "login") {
    return (
      <Login
        onCadastro={() => setScreen("cadastro")}
        onVoltar={() => setScreen("inicio")}
        onLoginSucesso={handleLoginSucesso}
      />
    );
  }

  if (screen === "cadastro") {
    return (
      <Cadastro
        onLogin={() => setScreen("login")}
      />
    );
  }
  if (screen === "carrinho") {
    return (
      <Carrinho
        estaLogado={estaLogado}
        token={token}
        onCategoria={handleCategoria}
        quantidadeCarrinho={quantidadeCarrinho}
        atualizarQuantidadeCarrinho={atualizarQuantidadeCarrinho}
        onLogin={() => setScreen("login")}
        onPerfil={handlePerfil}
        onLogout={handleLogout}
        onCarrinho={() => setScreen("carrinho")}
        onProdutos={() => setScreen("produtos")}
        onHome={() => setScreen("inicio")}
        onFinalizarCompra={handleFinalizarCompra}
        onSobre={handleSobre}
        onSuporte={handleSuporte}
      />
    );
  }
  if (screen === "produtos") {
    return (
      <Produtos
        estaLogado={estaLogado}
        token={token}
        categoriaInicial={categoriaInicial}
        onCategoriaAplicada={() => setCategoriaInicial("")}
        onCategoria={handleCategoria}
        onLogin={() => setScreen("login")}
        onPerfil={handlePerfil}
        onLogout={handleLogout}
        onCarrinho={() => setScreen("carrinho")}
        quantidadeCarrinho={quantidadeCarrinho}
        atualizarQuantidadeCarrinho={atualizarQuantidadeCarrinho}
        onProdutos={() => setScreen("produtos")}
        onHome={() => setScreen("inicio")}
        onPedidos={handlePedidos}
        onSobre={handleSobre}
        onSuporte={handleSuporte}
      />
    );
  }
  if (screen === "perfil") {
    return (
      <Perfil
        estaLogado={estaLogado}
        usuario={usuario}
        token={token}
        onCategoria={handleCategoria}
        quantidadeCarrinho={quantidadeCarrinho}
        atualizarQuantidadeCarrinho={atualizarQuantidadeCarrinho}
        onLogin={() => setScreen("login")}
        onPerfil={handlePerfil}
        onLogout={handleLogout}
        onCarrinho={handleCarrinho}
        onProdutos={() => setScreen("produtos")}
        onHome={() => setScreen("inicio")}
        onPedidos={handlePedidos}
        onSobre={handleSobre}
        onSuporte={handleSuporte}
      />
    );
  }
  if (screen === "finalizarCompra") {
    return (
      <FinalizarCompra
        estaLogado={estaLogado}
        token={token}
        quantidadeCarrinho={quantidadeCarrinho}
        atualizarQuantidadeCarrinho={atualizarQuantidadeCarrinho}
        onLogin={() => setScreen("login")}
        onPerfil={handlePerfil}
        onLogout={handleLogout}
        onCarrinho={handleCarrinho}
        onProdutos={() => setScreen("produtos")}
        onHome={() => setScreen("inicio")}
        onPedidos={handlePedidos}
        onSobre={handleSobre}
        onSuporte={handleSuporte}
      />
    );
  }
  if (screen === "pedidos") {
    return (
      <Pedidos
        estaLogado={estaLogado}
        token={token}
        onCategoria={handleCategoria}
        quantidadeCarrinho={quantidadeCarrinho}
        onHome={() => setScreen("inicio")}
        onPerfil={handlePerfil}
        onCarrinho={handleCarrinho}
        onProdutos={() => setScreen("produtos")}
        onLogout={handleLogout}
        onSobre={handleSobre}
        onSuporte={handleSuporte}
        onPedidos={handlePedidos}
      />
    );
  }

  if (screen === "admin") {
    return (
      <Admin
        estaLogado={estaLogado}
        token={token}
        onLogin={() => setScreen("Login")}
        onPerfil={handlePerfil}
        onLogout={handleLogout}
        onCarrinho={handleCarrinho}
        onProdutos={() => setScreen("produtos")}
        onHome={handleAdmin}
        onPedidos={handlePedidos}
        onSobre={handleSobre}
        onSuporte={handleSuporte}
      />
    );
  }
  if (screen === "sobre") {
    return (
      <Sobre
        estaLogado={estaLogado}
        onLogin={() => setScreen("login")}
        onPerfil={handlePerfil}
        onLogout={handleLogout}
        onCarrinho={handleCarrinho}
        onProdutos={() => setScreen("produtos")}
        onHome={() => setScreen("inicio")}
        onPedidos={handlePedidos}
        onSobre={handleSobre}
        onCategoria={handleCategoria}
        onSuporte={handleSuporte}
      />
    );
  }

  if (screen === "suporte") {
    return (
      <Suporte
        estaLogado={estaLogado}
        onLogin={() => setScreen("login")}
        onPerfil={handlePerfil}
        onLogout={handleLogout}
        onCarrinho={handleCarrinho}
        onProdutos={() => setScreen("produtos")}
        onHome={() => setScreen("inicio")}
        onPedidos={handlePedidos}
        onSobre={handleSobre}
        onSuporte={handleSuporte}
      />
    );
  }
  return (
    <TelaInicial
      estaLogado={estaLogado}
      quantidadeCarrinho={quantidadeCarrinho}
      onLogin={() => setScreen("login")}
      onPerfil={handlePerfil}
      onLogout={handleLogout}
      onCarrinho={handleCarrinho}
      onCategoria={handleCategoria}
      mostrarPopup={mostrarPopup}
      onProdutos={() => setScreen("produtos")}
      onPedidos={handlePedidos}
      onAdmin={handleAdmin}
      onHome={() => setScreen("inicio")}
      onSobre={handleSobre}
      onSuporte={handleSuporte}
    />
  );
}

export default App;